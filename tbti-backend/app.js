const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001; // Render会自动分配端口

// 🔴 这里替换成你刚才复制的 Supabase 信息 🔴
const supabaseUrl = 'https://zkwdnyziqikzuasdtykj.supabase.co';
const supabaseKey = 'sb_publishable_3ZPYfSicXAmHHppFl__mNw_faIS_IJV';
const supabase = createClient(supabaseUrl, supabaseKey);

// 中间件：解决跨域 + 解析JSON
app.use(cors());
app.use(express.json());

// 保存数据接口（保持前端调用的路径不变）
app.post('/api/save-tbti-record', async (req, res) => {
  try {
    const { answers, personalityType } = req.body;

    if (!answers || !personalityType) {
      return res.status(400).json({ success: false, msg: '参数缺失' });
    }

    // 写入 Supabase
    const { data, error } = await supabase
      .from('user_results') // 表名要和SQL里的一致
      .insert([{ 
        answers: answers, 
        personality: personalityType 
      }]);

    if (error) throw error;

    res.status(200).json({ success: true, recordId: data[0]?.id });
  } catch (err) {
    console.error('保存失败:', err);
    res.status(500).json({ success: false, msg: err.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口: ${PORT}`);
});