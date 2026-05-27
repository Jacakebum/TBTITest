const path = require('path')
const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const ExcelJS = require('exceljs')

const app = express()

app.use(express.static(path.join(__dirname)))
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())

require('dotenv').config()

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  connectionLimit: 10,
  acquireTimeout: 60000,
  timeout: 60000,
})

db.getConnection()
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('数据库连接失败', err))

app.post('/api/save-tbti-record', async (req, res) => {
  const { answers, personalityType } = req.body
  const sql = 'INSERT INTO tbti_records (answers, personality_type) VALUES (?, ?)'

  try {
    await db.execute(sql, [JSON.stringify(answers), personalityType])
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: '数据库错误' })
  }
})

app.get('/api/records', async (req, res) => {
  try {
    const sql = 'SELECT * FROM tbti_records ORDER BY created_at DESC LIMIT 100'
    const [rows] = await db.execute(sql)

    const processedRows = rows.map(row => ({
      ...row,
      answers: typeof row.answers === 'string'
        ? JSON.parse(row.answers)
        : row.answers
    }))

    res.json({
      success: true,
      data: processedRows
    })
  } catch (error) {
    console.error('获取记录失败:', error)
    res.status(500).json({ success: false, message: '服务器内部错误: ' + error.message })
  }
})

app.get('/api/export-excel', async (req, res) => {
  try {
    const sql = 'SELECT id, answers, personality_type, created_at FROM tbti_records ORDER BY created_at DESC'
    const [rows] = await db.execute(sql)

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('测试结果')
    const answerColumns = Array.from({ length: 60 }, (_, index) => ({
      header: `Q${index + 1}`,
      key: `q${index + 1}`,
      width: 10
    }))

    worksheet.columns = [
      { header: '序号', key: 'id', width: 10 },
      { header: '测试时间', key: 'created_at', width: 20 },
      { header: '人格类型', key: 'personality_type', width: 15 },
      ...answerColumns
    ]

    rows.forEach((row) => {
      const answersArray = typeof row.answers === 'string'
        ? JSON.parse(row.answers)
        : row.answers
      const answerValues = Object.fromEntries(
        Array.from({ length: 60 }, (_, index) => [`q${index + 1}`, answersArray?.[index] ?? ''])
      )

      worksheet.addRow({
        id: row.id,
        created_at: row.created_at,
        personality_type: row.personality_type,
        ...answerValues
      })
    })

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename="tbti_results.xlsx"')
    await workbook.xlsx.write(res)
    res.end()
  } catch (error) {
    console.error('导出 Excel 失败:', error)
    res.status(500).json({ success: false, message: '导出失败: ' + error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`服务器运行在 http://0.0.0.0:${PORT}`)
})
