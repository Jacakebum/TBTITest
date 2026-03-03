<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 点击“开始测试”跳转到答题页
function startTest() {
  router.push({ name: 'TravelTest' })
}
</script>

<template>
  <div class="start-card">
    <div class="start-header">
      <h1>✨ TBTI旅行人格测试 ✨</h1>
      <p class="sub-title">免费TBTI测试,3分钟发现你的16型旅行者人格,
        获取详细性格分析, 生成专属人格旅行攻略。
        开启你的旅行探索之旅吧~</p>
    </div>

    <div class="start-img">
      <!-- 小红书风格占位图，可替换为实际旅行插画 -->
      <div class="img-placeholder">
        <span>🌍</span>
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
  color: #888;
  margin: 0 0 25px;
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
