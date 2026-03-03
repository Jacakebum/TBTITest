<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 接收路由传递的结果参数
const props = defineProps({
  result: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

</script>

<template>
  <div class="result-card">
    <div class="result-header">
      <h1>✨ 你的旅行人格是 ✨</h1>
    </div>

    <!-- 人格名称（突出展示） -->
    <h2 class="personality-name">{{ result.name }}</h2>

    <!-- 人格描述 -->
    <p class="desc">{{ result.desc }}</p>

    <div class="tag">#TBTI旅行人格</div>

    <!-- 推荐体验标题 -->
    <h3>💫 推荐体验</h3>
    <div class="spots-card">
      <p class="spots">{{ result.spots }}</p>
    </div>
  </div>
</template>

<style scoped>
:deep(body) {
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
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* 头部标题 */
.result-header h1 {
  font-size: 16px;
  color: #666;
  margin: 0 0 15px;
  font-weight: normal;
}

/* 人格名称（核心视觉） */
.personality-name {
  font-size: 28px;
  margin: 10px 0 20px;
  color: #ff4d6d; /* 小红书标志性粉色 */
  font-weight: bold;
  letter-spacing: 1px;
}

/* 描述文本 */
.desc {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin: 0 0 15px;
  padding: 0 10px;
}

/* 小红书风格标签 */
.tag {
  background: #ffebf0; /* 浅粉底色 */
  color: #ff4d6d;
  display: inline-block;
  padding: 6px 18px;
  border-radius: 20px;
  margin: 15px 0 25px;
  font-size: 14px;
}

/* 推荐体验标题 */
.result-card h3 {
  color: #333;
  margin: 0 0 15px;
  font-size: 16px;
}

/* 推荐地点卡片 */
.spots-card {
  background: #f9f9f9;
  border-radius: 18px;
  padding: 15px;
  margin: 0 0 25px;
}

.spots {
  color: #666;
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
}

</style>
