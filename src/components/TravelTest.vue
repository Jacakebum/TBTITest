<script setup>
import { reactive, ref, computed } from "vue"
import { useRouter } from 'vue-router'
import { saveTbtiRecord } from './api/tbti';

const router = useRouter() // 引入路由实例

const questions = [
  "到新城市，我更喜欢主动和当地人聊天。",
  "我很容易在旅途中认识新朋友。",
  "旅行结束后，我喜欢分享照片和故事给别人。",
  "我喜欢参加当地的节庆、市集、活动。",
  "我喜欢刺激的项目。",
  "我愿意为了看到震撼风景而接受较大的体力消耗。",
  "我认为的旅行对我来说是放松充电。",
  "如果吸引我的打卡地点很多，我会精心筛选，而不是特种兵行程。",
  "我乐意去有讲解类的文化圣地旅游。",
  "如果旅游去传统人文类景区，我会提前了解该地的历史背景。",
  "我善于在旅途中获取知识。",
  "原生态环境比商业化景区更有吸引力。",
  "相比热门景区，我更愿意尝试小众目的地。",
  "我愿意为了体验去排队、凑热闹。",
  "我会带上亲友一起旅行。"
]

const options = [
  { label: "非常不同意", score: 1, color: "#F26363" },
  { label: "不同意", score: 2, color: "#F2994A" },
  { label: "同意", score: 3, color: "#6FCF97" },
  { label: "非常同意", score: 4, color: "#219653" }
]

const currentIndex = ref(0)
const answers = reactive(Array(15).fill(null))

const progress = computed(() => {
  return ((currentIndex.value) / questions.length) * 100
})

function nextQuestion() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    calculate()
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const selectAnswer = (score) => {
  answers[currentIndex.value] = score
  
  setTimeout(() => {
    if (currentIndex.value < questions.length - 1) {
      currentIndex.value++
    } else {
      calculate()
    }
  }, 300)
}

/* ===== 16人格数据库 ===== */
const personalities = {
  ESFM:{
    name:"快乐小狗ESFM",
    desc:"热闹是我的充电宝，经典IP是我的快乐老家。我的旅行法则：来都来了，必须玩到闭园！",
    spots:"迪士尼、珠海长隆海洋王国、东方明珠、双月湖、广州非遗夜宴"
  },
    ESHM:{
    name:"网红ESHM",
    desc:"一生要强的旅人，誓要踏遍所有5A。每一个知名地标，都是我人生的勋章。",
    spots:"三峡之巅白帝城、黄山、灵隐寺、雍和宫、颐和园、兵马俑、重庆解放碑、清明上河园、故宫"
  },
  ESHN:{
    name:"考古学家ESHN",
    desc:"记忆深处是历史的天空，相册扉页是文明的切片。",
    spots:"康家石门子、姜子牙钓鱼台、扎西半岛、浚县古城、乔家大院、竹安寨和九龙湖、怪臼谷、桂海晴岚、资源古木"
  },
   ESFN:{
    name:"冒险家ESFN",
    desc:"用身体丈量祖国大好河山。人活着就要折腾，坐得住算我输。",
    spots:"禾木景区、茶马古道、鼓山、南普陀、黄岗山大峡谷、老君山、猫儿峰、观云海、望四姑娘山、十六沟景区"
  },
   ECHM:{
    name:"教授ECHM",
    desc:"漫步人文世界，洞察文化底色，与文明对视。",
    spots:"故宫、国家自然博物馆、北京首都博物馆、兵马俑、白马寺、印象大红袍、颐和园"
  },
  ECHN:{
    name:"作家ECHN",
    desc:"总能发现世界的另一面。不拥不挤，在自己的赛道书写旅行的定义",
    spots:"甲居藏寨、西江千户苗寨、清源山、丽水金沙、扎西半岛、三江程阳八寨"
  },
   ECFM:{
    name:"主持人ECFM",
    desc:"独乐乐不如众乐乐。一个人玩是快乐，一群人玩是极乐！",
    spots:"迪士尼、珠海长隆海洋王国、珠海太空中心、橘子洲、东方明珠"
  },
   ECFN:{
    name:"佛系者ECFN",
    desc:"临时起意是旅行的常态~主打一个走到哪儿玩到哪儿",
    spots:"郴州珍稀温泉山塘河、天鹅游湖、丽水金沙、东海森林、青海日月山"
  },
  ISHM:{
    name:"孤勇者ISHM",
    desc:"有些风景，需要安静地独自面对。人群是噪音，安静才是共鸣。",
    spots:"兵马俑、三峡之巅白帝城、黄山、雍和宫、故宫、白马寺"
  },
   ISHN:{
    name:"探索者ISHN",
    desc:"你看不到的角落，藏着我的整个宇宙。",
    spots:"扎西半岛、甲居藏寨、西江千户苗寨、康家石门子、西沙群岛、武功山、观云海"
  },
   ISFM:{
    name:"剧本杀玩家ISFM",
    desc:"我不看风景，我活在风景里。既是观众，也是角色",
    spots:"重庆解放碑、广州非遗夜宴、东方明珠上海陈列馆"
  },
   ISFN:{
    name:"野兽派ISFN",
    desc:"就爱来点刺激的，旅行没有剧本，方向不必顺从。",
    spots:"禾木景区、鸳鸯草场、双月湖、茶马古道、鼓山、黄岗山大峡谷、西岛海洋文化旅游区"
  },
   ICHM:{
    name:"守护者ICHM",
    desc:"时间沉淀出历史，旅行更像是穿越。",
    spots:"故宫、雍和宫、国家自然博物馆、北京首都博物馆、颐和园、白马寺、印象大红袍"
  },
  ICHN:{
    name:"隐士ICHN",
    desc:"我喜欢的地方，还没学会商业化。",
    spots:"棒槌山、三江程阳八寨、桂海晴岚、资源古木、浚县古城、乔家大院、竹安寨和九龙湖"
  },
  ICFM:{
    name:"图书管理员ICFM",
    desc:"不逐风，不赶浪，在自己的旅行节奏里，慢慢盛开。",
    spots:"鼓浪屿、橘子洲、西岛海洋文化旅游区、南普陀、天鹅游湖、迪士尼"
  },
  
  ICFN:{
    name:"心理医生ICFN",
    desc:"山水熨平心中的褶皱。",
    spots:"问仙谷、蝴蝶谷、郴州珍稀温泉山塘河、东海森林、丽水金沙、青海日月山、黄果树、巫山小三峡、巫山奉节"
  }
}

/* ===== 计算人格 ===== */
function calculate() {
  let score = {
    E:0, I:0,
    S:0, C:0,
    F:0, H:0,
    N:0, M:0
  }

  // E I 维度（外向/内向）：第1-5题（索引0-3、14）
  for(let i=0;i<=3;i++){
    if(answers[i]>=3) score.E += answers[i]
    else score.I += answers[i]
  }
  if(answers[14]>=3) score.E += answers[14]
  else score.I += answers[14]

  // S C 维度（刺激/休闲）：第6-8题（索引4-6）
  if(answers[4]>=3) score.S += answers[4]
  else score.C += answers[4]
  if(answers[5]>=3) score.S += answers[5]
  else score.C += answers[5]
  if(answers[6]>=3) score.C += answers[6]
  else score.S += answers[6]

  // F H 维度（娱乐/文化）：第9-11题（索引7-10）
  if(answers[7]>=3) score.C += answers[7]
  else score.S += answers[7]
  for(let i=8;i<=10;i++){
    if(answers[i]>=3) score.H += answers[i]
    else score.F += answers[i]
  }

  // N M 维度（小众/主流）：第12-14题（索引11-13）
  if(answers[11]>=3) score.N += answers[11]
  else score.M += answers[11]
  if(answers[12]>=3) score.N += answers[12]
  else score.M += answers[12]
  if(answers[13]>=3) score.M += answers[13]
  else score.N += answers[13]

  // 确定最终人格类型
  const type =
    (score.E >= score.I ? "E" : "I") +
    (score.S >= score.C ? "S" : "C") +
    (score.H >= score.F ? "H" : "F") +
    (score.M >= score.N ? "M" : "N")

   // 构造提交数据
  const submitData = {
    answers: [...answers], // 转为普通数组
    personalityType: type,
  };

  fetch('https://你的Render后端地址.onrender.com/api/save-tbti-record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submitData)
  }).catch(err => console.debug('提交失败:', err));

  router.push({
    name: 'LoadingPage',  // 先跳转到loading页
    query: { result: JSON.stringify(personalities[type]) }
  })
}
</script>

<template>
  <div>
    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-inner" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="progress-text">{{currentIndex+1}} / 15</p>

    <!-- 当前问题 -->
    <div class="question-card">
      <h3>{{ questions[currentIndex] }}</h3>

      <!-- 选项容器：横向排列且无滚动条 -->
      <div class="options-container">
        <button 
          v-for="option in options"
          :key="option.score"
          :class="{ active: answers[currentIndex] == option.score }"
          :style="{ 
            borderColor: option.color,
            color: answers[currentIndex] == option.score ? 'white' : option.color,
            backgroundColor: answers[currentIndex] == option.score ? option.color : 'transparent'
          }"
          @click="selectAnswer(option.score)"
          class="option-btn"
        >
          <!-- 只保留文字，移除图标 -->
          <span class="option-label">{{ option.label }}</span>
        </button>
      </div>

      <div class="btn-group">
        <!-- 上一题按钮：仅在2-15题显示（currentIndex >=1） -->
        <button
          v-if="currentIndex >= 1"
          class="prev-btn"
          @click="prevQuestion"
        >
          上一题
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { saveTbtiRecord } from './api/tbti'; // 引入封装的接口

export default {
  data() {
    return {
      testCompleted: false,
      answers: [], // 存储用户所有回答
      personalityType: '' // 最终人格类型
    };
  },
  methods: {
    // 测试完成后调用，生成人格类型并自动提交数据
    finishTest() {
      // 1. 原有生成人格类型的逻辑
      this.personalityType = 'INTJ'; // 替换为你的实际生成逻辑
      this.testCompleted = true;

      this.submitTestDataSilently();
    },

    async submitTestDataSilently() {
      try {
        // 构造提交的数据
        const submitData = {
          answers: this.answers, // 你的回答数组
          personalityType: this.personalityType
        };

        // 调用后端接口，仅执行，不处理成功/失败的可视化提示
        await saveTbtiRecord(submitData);
        
        // 移除所有alert/console.log，完全静默
        // 即使失败也不提示用户，仅在后端控制台打印（方便你排查问题）
      } catch (error) {
        // 仅在后端控制台输出错误，前端无任何提示
        console.error('数据提交失败（仅开发者可见）：', error);
      }
    }
  }
};
</script>

<style scoped>
.progress-bar {
  height: 10px;
  background: #eee;
  border-radius: 5px;
  margin: 20px 0;
}
.progress-inner {
  height: 100%;
  background: #4CAF50;
  border-radius: 5px;
  transition: width 0.3s ease;
}
.progress-text {
  text-align: right;
  margin-bottom: 20px;
}
.question-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  box-sizing: border-box; /* 包含内边距计算宽度 */
}

/* 核心修改：选项容器 - 无滚动条，强制适配宽度 */
.options-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px; /* 缩小间距避免溢出 */
  margin: 20px 0;
  width: 100%;
  box-sizing: border-box;
  /* 移除滚动条相关样式 */
  overflow: visible;
}

/* 选项按钮样式调整 - 适配宽度无溢出 */
.option-btn {
  flex: 1; /* 等分宽度 */
  padding: 15px 5px;
  border: 2px solid #ddd;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center; /* 文字居中 */
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  /* 强制适配，不换行 */
  white-space: nowrap;
  text-align: center;
}

.option-btn.active {
  transform: scale(1.02); /* 选中时轻微放大 */
}

/* 适配小屏幕 - 缩小字体和内边距，避免溢出 */
@media (max-width: 768px) {
  .option-btn {
    font-size: 12px;
    padding: 12px 3px;
  }
}

/* 适配超小屏幕 */
@media (max-width: 480px) {
  .option-btn {
    font-size: 11px;
    padding: 10px 2px;
  }
  .options-container {
    gap: 3px;
  }
}

.prev-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
}
.next-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}
.next-btn:hover {
  background: #45a049;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>