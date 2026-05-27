<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
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
      console.error('解析结果失败', decodeError)
      return {}
    }
  }
}

let resultData = {}
resultData = parseResultQuery(route.query.result)

onMounted(() => {
  setTimeout(() => {
    router.push({
      name: 'ResultPage',
      query: { result: JSON.stringify(resultData) }
    })
  }, 2000)
})
</script>

<template>
  <div class="loading-container">
    <div class="confetti"></div>
    <div class="loading-card">
      <div class="celebration-icon">🎉</div>
      <h2>🎉 恭喜你完成测试！</h2>
      <p class="loading-text">正在生成专属旅行人格...</p>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background: #f5f6f8;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif;
  color: #111827;
}

.loading-container {
  min-height: calc(100vh - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.loading-card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border-radius: 24px;
  padding: 34px 24px 30px;
  text-align: center;
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.1);
  position: relative;
  z-index: 1;
}

.celebration-icon {
  width: 76px;
  height: 76px;
  margin: 0 auto 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff0f4;
  font-size: 40px;
}

.loading-card h2 {
  margin: 0 0 10px;
  color: #ff4d6d;
  font-size: 24px;
  line-height: 1.35;
}

.loading-text {
  margin: 0 0 24px;
  color: #6b7280;
  font-size: 15px;
}

.loader {
  width: 42px;
  height: 42px;
  margin: 0 auto;
  border: 4px solid #ffe1e8;
  border-top-color: #ff4d6d;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.confetti::before,
.confetti::after {
  content: "";
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background:
    radial-gradient(circle at 30% 30%, #7cc7ff 0 5px, transparent 6px),
    radial-gradient(circle at 70% 35%, #ffd166 0 5px, transparent 6px),
    radial-gradient(circle at 45% 70%, #6fcf97 0 5px, transparent 6px),
    radial-gradient(circle at 75% 75%, #ff4d6d 0 5px, transparent 6px);
  opacity: 0.75;
}

.confetti::before {
  top: 12%;
  left: -60px;
}

.confetti::after {
  right: -60px;
  bottom: 16%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .loading-card {
    max-width: 340px;
    padding: 30px 20px 26px;
    border-radius: 22px;
  }

  .loading-card h2 {
    font-size: 21px;
  }
}
</style>
