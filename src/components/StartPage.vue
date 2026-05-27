<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function startTest() {
  router.push({ name: 'TravelTest' })
}
</script>

<template>
  <div class="start-card">
    <div class="start-header">
      <h1>✨ TBTI旅行人格测试 ✨</h1>
      <p class="sub-title">
        通过60道旅行偏好题，从旅行能量、行为偏好、求知倾向和消费风格四个维度了解你。
        测试会生成16种旅行人格之一，并给出你的旅行行为特征和目的地推荐。
      </p>
    </div>

    <div class="dimension-list">
      <p><strong>旅行能量：</strong>看你更享受热闹社交，还是偏爱安静独处。</p>
      <p><strong>行为偏好：</strong>看你更喜欢冒险探索，还是更重视稳定舒适。</p>
      <p><strong>求知倾向：</strong>看你更被历史文化吸引，还是更亲近自然体验。</p>
      <p><strong>消费风格：</strong>看你愿意为体验投入，还是更习惯理性节制。</p>
    </div>

    <div class="start-img">
      <div class="img-placeholder">
        <span>🧳</span>
      </div>
    </div>

    <button class="start-btn" @click="startTest()">
      立即开始测试 →
    </button>

    <p class="footer-tip">测完记得收藏你的旅行人格哦～</p>
  </div>
</template>

<style scoped>
:deep(body) {
  background: #f7f7f7;
  font-family: -apple-system, BlinkMacSystemFont;
}

.start-card {
  max-width: 420px;
  margin: 20px auto;
  background: white;
  padding: 35px 25px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.start-header h1 {
  font-size: 22px;
  color: #333;
  margin: 10px 0;
}

.sub-title {
  font-size: 14px;
  line-height: 1.7;
  color: #666;
  margin: 0 0 18px;
}

.dimension-list {
  text-align: left;
  background: #fff7f9;
  border: 1px solid #ffebf0;
  border-radius: 18px;
  padding: 14px 16px;
  margin: 0 0 24px;
}

.dimension-list p {
  font-size: 13px;
  line-height: 1.6;
  color: #555;
  margin: 0 0 8px;
}

.dimension-list p:last-child {
  margin-bottom: 0;
}

.dimension-list strong {
  color: #ff4d6d;
}

.img-placeholder {
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
  background: #ffebf0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
}

.start-btn {
  width: 100%;
  padding: 14px 0;
  background: #ff4d6d;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: 0.2s ease;
}

.start-btn:hover {
  background: #ff758f;
  transform: translateY(-2px);
}

.footer-tip {
  font-size: 12px;
  color: #999;
  margin: 20px 0 0;
}
</style>
