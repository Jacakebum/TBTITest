<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

function parseResultQuery(value) {
  if (!value) return {}
  const rawValue = Array.isArray(value) ? value[0] : value

  try {
    return JSON.parse(rawValue)
  } catch (e) {
    try {
      return JSON.parse(decodeURIComponent(rawValue))
    } catch (decodeError) {
      console.error('结果页解析失败', decodeError)
      return {}
    }
  }
}

const result = computed(() => {
  return parseResultQuery(route.query.result)
})
</script>

<template>
  <div class="result-card">
    <div class="result-header">
      <h1>你的旅行人格是</h1>
    </div>

    <div class="code-badge">{{ result.code || result.type || '--' }}</div>
    <h2 class="personality-name">{{ result.name || '结果生成中' }}</h2>

    <section class="feature-box">
      <h3>旅行行为特征</h3>
      <p>{{ result.desc || '暂时没有读取到结果，请返回重试。' }}</p>
    </section>

    <section class="destination-box">
      <h3>目的地推荐</h3>
      <p>{{ result.destination || '暂无推荐目的地。' }}</p>
    </section>

    <div class="tag">#TBTI旅行人格</div>
  </div>
</template>

<style scoped>
:global(body) {
  background: #f7f7f7;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif;
}

.result-card {
  max-width: 420px;
  margin: 20px auto;
  background: white;
  padding: 35px 25px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.result-header h1 {
  font-size: 16px;
  color: #666;
  margin: 0 0 15px;
  font-weight: 400;
}

.code-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 78px;
  height: 36px;
  padding: 0 16px;
  border-radius: 999px;
  background: #ffebf0;
  color: #ff4d6d;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 1px;
}

.personality-name {
  font-size: 28px;
  margin: 14px 0 22px;
  color: #ff4d6d;
  font-weight: 700;
  letter-spacing: 1px;
}

.feature-box,
.destination-box {
  text-align: left;
  border-radius: 16px;
  padding: 16px 18px;
  margin: 14px 0;
}

.feature-box {
  border: 1px solid #d1d5db;
  background: #fafafa;
}

.destination-box {
  border: 1px solid #ffd6df;
  background: #fff7f9;
}

.feature-box h3,
.destination-box h3 {
  font-size: 15px;
  color: #666;
  margin: 0 0 8px;
  font-weight: 700;
}

.feature-box p,
.destination-box p {
  font-size: 16px;
  color: #333;
  line-height: 1.7;
  margin: 0;
}

.tag {
  background: #ffebf0;
  color: #ff4d6d;
  display: inline-block;
  padding: 6px 18px;
  border-radius: 20px;
  margin: 18px 0 0;
  font-size: 14px;
}

@media (max-width: 480px) {
  .result-card {
    margin: 16px auto;
    padding: 28px 20px;
    border-radius: 22px;
  }

  .personality-name {
    font-size: 24px;
  }

  .feature-box p,
  .destination-box p {
    font-size: 15px;
  }
}
</style>
