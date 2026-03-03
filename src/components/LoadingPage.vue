<script setup>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const resultData = route.query.result ? JSON.parse(route.query.result) : {}

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
    <!-- 彩色碎片背景（模拟你参考的效果） -->
    <div class="confetti"></div>

    <!-- 加载弹窗 -->
    <div class="loading-card">
      <!-- 庆祝图标 -->
      <div class="celebration-icon">🎉</div>
      <h2>🎉 恭喜你完成测试！</h2>
      <p class="loading-text">正在生成专属旅行人格...</p>

      <!-- 加载动画 -->
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  min-height: 100vh;
  background: #fff5f7; /* 浅粉色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont;
  position: relative;
  overflow: hidden;
}

/* 彩色碎片背景动画 */
.confetti {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(#ff4d6d 2px, transparent 2px),
    radial-gradient(#ffd166 2px, transparent 2px),
    radial-gradient(#06d6a0 2px, transparent 2px),
    radial-gradient(#118ab2 2px, transparent 2px);
  background-size: 60px 60px;
  background-position: 0 0, 20px 20px, 40px 40px, 60px 60px;
  animation: confetti-fall 8s linear infinite;
  opacity: 0.3;
}

@keyframes confetti-fall {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.loading-card {
  background: white;
  padding: 40px 30px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  z-index: 10;
  min-width: 300px;
}

.celebration-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.loading-card h2 {
  font-size: 20px;
  color: #333;
  margin: 0 0 10px;
}

.loading-text {
  font-size: 14px;
  color: #888;
  margin: 0 0 20px;
}

/* 加载动画 */
.loader {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: 3px solid #ffebf0;
  border-top-color: #ff4d6d;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
