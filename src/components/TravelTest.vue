<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { saveTbtiRecord } from './api/tbti'

const router = useRouter()

const questions = [
  { text: '到新城市，我更喜欢主动和当地人聊天。', dimension: 'energy', reverse: false },
  { text: '我很容易在旅途中认识新朋友。', dimension: 'energy', reverse: false },
  { text: '旅行结束后，我喜欢分享照片和故事给他人。', dimension: 'energy', reverse: false },
  { text: '我会带上亲友一起旅行。', dimension: 'energy', reverse: false },
  { text: '旅途中遇到节日庆典，我会立刻被欢笑声和音乐吸引，想要加入其中。', dimension: 'energy', reverse: false },
  { text: '在酒店的公共区域，我会主动和其他旅行者搭话。', dimension: 'energy', reverse: false },
  { text: '我认为旅行的意义之一就是结识来自不同地方的人。', dimension: 'energy', reverse: false },
  { text: '我喜欢在旅行中当朋友/家人的“向导”和“组织者”。', dimension: 'energy', reverse: false },
  { text: '旅行中，我更享受一个人的安静时光，而不是和别人聊天。', dimension: 'energy', reverse: true },
  { text: '对我来说，旅途中与陌生人社交是一件消耗精力的事。', dimension: 'energy', reverse: true },
  { text: '在社交平台上分享旅行动态让我感到压力或不自在。', dimension: 'energy', reverse: true },
  { text: '如果可以选择，我更愿意独自完成整个旅行，不与他人交流。', dimension: 'energy', reverse: true },
  { text: '旅行中即使遇到有趣的人，我通常不会主动留联系方式。', dimension: 'energy', reverse: true },
  { text: '团队旅行（如跟团游、集体活动）让我觉得拘束，不如一个人自由。', dimension: 'energy', reverse: true },
  { text: '在旅游大巴或拼车途中，我宁愿睡觉或看风景，也不愿和邻座聊天。', dimension: 'energy', reverse: true },

  { text: '我喜欢刺激的项目（如过山车、蹦极、跳伞等）。', dimension: 'behavior', reverse: false },
  { text: '我愿意为了看到震撼风景而接受较大的体力消耗（如长时间徒步、爬山）。', dimension: 'behavior', reverse: false },
  { text: '相比较没去过的城市，我更想去我熟悉的地方游玩，这让我更安心。', dimension: 'behavior', reverse: true },
  { text: '旅行中，我更倾向于选择设施完善、有明确指引的成熟路线。', dimension: 'behavior', reverse: true },
  { text: '对我来说，旅行的核心是“松弛感”，我讨厌行程太满或太折腾。', dimension: 'behavior', reverse: true },
  { text: '我会为了体验不一样的风景，选择未经开发的小众目的地。', dimension: 'behavior', reverse: false },
  { text: '我喜欢尝试旅行中的新鲜活动，即使没有太多把握也没关系。', dimension: 'behavior', reverse: false },
  { text: '出门旅游前，我会把交通、住宿、餐饮等行程费用提前规划好。', dimension: 'behavior', reverse: true },
  { text: '在外旅游时，我更喜欢选择去过的、评价好的餐厅用餐。', dimension: 'behavior', reverse: true },
  { text: '相比去异国文化差异大的地方，我更愿意在国内或文化接近的地方旅游。', dimension: 'behavior', reverse: true },
  { text: '旅途中的意外和突发状况（如交通延误、天气突变）对我来说也是有趣体验。', dimension: 'behavior', reverse: false },
  { text: '我会选择在旺季去热门景区，即使人多拥挤也没关系。', dimension: 'behavior', reverse: false },
  { text: '对我来说，旅途中“按计划行事”比“自由发挥”更重要。', dimension: 'behavior', reverse: true },
  { text: '出行前我会把每个景点的开放时间、门票价格都查清楚再出门。', dimension: 'behavior', reverse: true },
  { text: '我更愿意选择熟悉的航空公司，即使票价稍贵。', dimension: 'behavior', reverse: true },

  { text: '我旅行时不在意“有没有文化内涵”。', dimension: 'thirst', reverse: true },
  { text: '相比感受大自然，我更重视知识获取。', dimension: 'thirst', reverse: false },
  { text: '我喜欢去亲近自然的地方旅游。', dimension: 'thirst', reverse: true },
  { text: '我乐意去有讲解服务的文化圣地旅游。', dimension: 'thirst', reverse: false },
  { text: '相比逛博物馆，在大自然中散步更让我放松。', dimension: 'thirst', reverse: true },
  { text: '我会提前了解景区历史背景。', dimension: 'thirst', reverse: false },
  { text: '我喜欢在旅行中学习当地的历史和文化知识。', dimension: 'thirst', reverse: false },
  { text: '旅行中，比起逛古建筑，我更喜欢欣赏自然风光。', dimension: 'thirst', reverse: true },
  { text: '我觉得文化类景点（如博物馆、寺庙、遗址）比较枯燥。', dimension: 'thirst', reverse: true },
  { text: '我会为了参观某处世界文化遗产而特意安排行程。', dimension: 'thirst', reverse: false },
  { text: '阅读景区介绍牌或导览手册让我觉得麻烦。', dimension: 'thirst', reverse: true },
  { text: '我喜欢在旅行中品尝当地特色美食、体验传统手工艺等文化活动。', dimension: 'thirst', reverse: false },
  { text: '相比自然景区，有深厚历史背景的城市更吸引我。', dimension: 'thirst', reverse: false },
  { text: '比起把大量时间留给自然风光，我更愿意把行程安排给博物馆、古城、遗址等人文景点。', dimension: 'thirst', reverse: false },
  { text: '主题乐园比自然保护区的吸引力更大。', dimension: 'thirst', reverse: true },

  { text: '旅游时看到喜欢的东西，我会毫不犹豫地买下。', dimension: 'indulgence', reverse: false },
  { text: '在能够承受的范围内，我愿意花钱换取更好的旅行体验（如升级酒店房型、预订私人包车等）。', dimension: 'indulgence', reverse: false },
  { text: '旅行前我会规划每日开销，避免超出预算。', dimension: 'indulgence', reverse: true },
  { text: '即使是几块钱的差价，我也会比较几家店铺再决定购买。', dimension: 'indulgence', reverse: true },
  { text: '旅游纪念品我会量力而行，不会因为“来都来了”就购买。', dimension: 'indulgence', reverse: true },
  { text: '我会为了省钱而选择早出晚归的廉价航空。', dimension: 'indulgence', reverse: true },
  { text: '在旅行中品尝当地高级餐厅的美食是值得的。', dimension: 'indulgence', reverse: false },
  { text: '出行前我会把交通、住宿、餐饮等费用全部做一个预算表。', dimension: 'indulgence', reverse: true },
  { text: '如果能节省时间，我愿意多花钱体验VIP免排队等服务。', dimension: 'indulgence', reverse: false },
  { text: '在旅行中，能走路或坐公交就不会打车。', dimension: 'indulgence', reverse: true },
  { text: '我会因为“价格太贵”而放弃体验某个旅行项目。', dimension: 'indulgence', reverse: true },
  { text: '旅行期间我更喜欢自己做饭或带干粮，减少下馆子的花销。', dimension: 'indulgence', reverse: true },
  { text: '为了在朋友圈晒出更精美的图片，我乐意付费入住高颜值酒店。', dimension: 'indulgence', reverse: false },
  { text: '付款前我会仔细核对购物小票，防止多算钱。', dimension: 'indulgence', reverse: true },
  { text: '我会选择价格低而非舒适度高的酒店。', dimension: 'indulgence', reverse: true }
]

const options = [
  { label: '非常不同意', score: -2, color: '#F26363' },
  { label: '比较不同意', score: -1, color: '#F2994A' },
  { label: '比较同意', score: 1, color: '#6FCF97' },
  { label: '非常同意', score: 2, color: '#219653' }
]

const personalities = {
  EAHP: {
    name: '活力全开·多元探索型',
    desc: '外向、爱冒险、求知欲强且消费大方。追求极致丰富性与品质体验，既要热闹社交又要文化沉淀，也要冒险征服和享乐度假。',
    destination: '新加坡（滨海湾、环球影城、圣淘沙）；北京（长城、故宫、国贸天际线）'
  },
  EAHR: {
    name: '精打细算·自主猎奇型',
    desc: '热爱社交、冒险与文化探索，但消费克制。以“穷游”思维创造独特玩法，把有限经费集中在核心体验上。',
    destination: '成都（宽窄巷子、青城山徒步、茶馆社交）'
  },
  EANP: {
    name: '极致享乐·冒险家',
    desc: '外向、追求极端刺激与户外挑战。消费优先选择高端冒险装备与奢华野外体验。',
    destination: '皇后镇（新西兰）高空跳伞、喷射艇；瑞士阿尔卑斯山直升机滑雪'
  },
  EANR: {
    name: '坚韧背包侠',
    desc: '重视冒险体验本身，社交开朗但消费极度克制。享受“省钱”方式去冒险的成功感。',
    destination: '四姑娘山（川西徒步露营）；菲律宾科隆（低成本跳岛潜水）'
  },
  EDHP: {
    name: '高能社交·精控者',
    desc: '擅长社交，注重文化内涵与历史探索。愿意为舒适交通、高级住宿、精致餐饮买单。',
    destination: '京都（日本）古寺、日式民宿、怀石料理'
  },
  EDHR: {
    name: '社交省钱规划师',
    desc: '外向且善于照顾大家，文化求知欲强但预算理性。妙招连连，让团队旅行既省钱又快乐。',
    destination: '台北（公共交通便利、故宫、夜市社交、平价住宿）'
  },
  EDNP: {
    name: '稳中带奢·节奏大师',
    desc: '热情外向却拒绝过度劳累，喜欢在社交氛围中享受自然美景，追求高端综合度假体验。',
    destination: '马尔代夫（沙滩、水上别墅）；西双版纳（热带雨林、高端酒店）'
  },
  EDNR: {
    name: '从容度假派',
    desc: '外向但不喜欢自虐式旅游。在成熟自然景观中休闲，追求低成本但高质量的共同时光。',
    destination: '海南三亚（平价公寓、公共沙滩）；朱家角古镇（水乡低成本休闲）'
  },
  IAHP: {
    name: '独行鉴赏家',
    desc: '内向喜独处，追求文化深度与冒险挑战，同时愿意为独一无二的定制体验花大价钱。',
    destination: '乌兹别克斯坦（撒马尔罕、布哈拉）；敦煌（莫高窟、鸣沙山）'
  },
  IAHR: {
    name: '知识苦行僧',
    desc: '不爱社交，但对历史人文狂热。消费极俭，只为获得精神上的巨大满足感。',
    destination: '黔东南（未商业化的侗寨苗寨，非遗文化）'
  },
  IANP: {
    name: '纯粹高阶挑战者',
    desc: '厌弃主流通用路线，追求隐秘自然秘境。将极限冒险视为精神修行，坚持高端户外品质。',
    destination: '哥斯达黎加（私人自然保护区、雨林探险）；西藏墨脱（莲花秘境）'
  },
  IANR: {
    name: '极限独行者',
    desc: '极度内敛独立，几乎不花钱也能在险境中获得乐趣。风餐露宿，只为无人区美景。',
    destination: '丙中洛-察瓦龙徒步线（进藏第八条路，低成本极致挑战）'
  },
  IDHP: {
    name: '悠然鉴赏家',
    desc: '内向的独行文化客，享受古寺禅修、传统文化，但追求安逸幽雅环境和品质住宿。',
    destination: '成都青城山六善酒店（道家文化、高品质疗愈）'
  },
  IDHR: {
    name: '知识背包客',
    desc: '内向、踏实，用极低成本专注自学文史知识，实地考察古迹。带着笔记本在博物馆待一整天。',
    destination: '山西南禅寺、佛光寺（低成本高密度古建研学）'
  },
  IDNP: {
    name: '安静疗愈派',
    desc: '沉静、避免冲突，在绝美安静的自然中“精神排毒”，选择高品质避世住宿。',
    destination: '青城山坐忘森林酒店；松阳云端觅境（古村落高品质独处）'
  },
  IDNR: {
    name: '极简独行隐士',
    desc: '寡言、不善交际、消费极简。旅行只是换个便宜且宁静的地方继续生活。',
    destination: '江浙沪免费郊野公园；洱海边平价客栈（自带茶饮干粮）'
  }
}

const currentIndex = ref(0)
const answers = reactive(Array(questions.length).fill(null))
const isSubmitting = ref(false)

const progress = computed(() => ((currentIndex.value + 1) / questions.length) * 100)

function prevQuestion() {
  if (currentIndex.value > 0) currentIndex.value--
}

function selectAnswer(score) {
  if (isSubmitting.value) return
  answers[currentIndex.value] = score

  setTimeout(() => {
    if (currentIndex.value < questions.length - 1) {
      currentIndex.value++
    } else {
      calculate()
    }
  }, 300)
}

function getScoredAnswer(answer, question) {
  return question.reverse ? -answer : answer
}

function sumDimension(scoredAnswers, dimension) {
  return scoredAnswers.reduce((total, score, index) => {
    return questions[index].dimension === dimension ? total + score : total
  }, 0)
}

async function calculate() {
  if (isSubmitting.value) return
  if (answers.some(a => a === null)) return

  isSubmitting.value = true

  const rawAnswers = [...answers]
  const scoredAnswers = rawAnswers.map((answer, index) => getScoredAnswer(answer, questions[index]))
  const energy = sumDimension(scoredAnswers, 'energy')
  const behavior = sumDimension(scoredAnswers, 'behavior')
  const thirst = sumDimension(scoredAnswers, 'thirst')
  const indulgence = sumDimension(scoredAnswers, 'indulgence')

  const e_i = energy > 0 ? 'E' : 'I'
  const a_d = behavior > 0 ? 'A' : 'D'
  const h_n = thirst > 0 ? 'H' : 'N'
  const p_r = indulgence > 0 ? 'P' : 'R'
  const personalityType = e_i + a_d + h_n + p_r
  const personality = personalities[personalityType] || {
    name: '旅行人格生成中',
    desc: '本次结果暂时没有匹配到完整说明，请返回重新测试。',
    destination: '暂无推荐目的地。'
  }

  const result = {
    code: personalityType,
    type: personalityType,
    ...personality
  }

  const submitData = {
    answers: rawAnswers,
    scoredAnswers,
    personalityType,
    result,
    meta: { energy, behavior, thirst, indulgence }
  }

  try {
    await saveTbtiRecord(submitData)
  } catch (e) {
    console.error('保存失败', e)
  }

  router.push({
    name: 'LoadingPage',
    query: { result: JSON.stringify(result) }
  })
}
</script>

<template>
  <div>
    <div class="progress-bar">
      <div class="progress-inner" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="progress-text">{{ currentIndex + 1 }} / {{ questions.length }}</p>

    <div class="question-card">
      <h3>{{ questions[currentIndex].text }}</h3>

      <div class="options-container">
        <button
          v-for="option in options"
          :key="option.score"
          :class="{ active: answers[currentIndex] === option.score }"
          :style="{
            borderColor: option.color,
            color: answers[currentIndex] === option.score ? 'white' : option.color,
            backgroundColor: answers[currentIndex] === option.score ? option.color : 'transparent'
          }"
          @click="selectAnswer(option.score)"
          class="option-btn"
          :disabled="isSubmitting"
        >
          <span class="option-label">{{ option.label }}</span>
        </button>
      </div>

      <div class="btn-group">
        <button v-if="currentIndex >= 1" class="prev-btn" @click="prevQuestion" :disabled="isSubmitting">
          上一题
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background: #f5f6f8;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", sans-serif;
  color: #111827;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #e9edf3;
  border-radius: 999px;
  overflow: hidden;
  margin: 12px 0 18px;
}

.progress-inner {
  height: 100%;
  background: linear-gradient(90deg, #7cc7ff, #4a90e2);
  border-radius: 999px;
  transition: width 0.25s ease;
}

.progress-text {
  text-align: right;
  font-size: 15px;
  color: #6b7280;
  margin-bottom: 14px;
}

.question-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px 22px 22px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.question-card h3 {
  font-size: 30px;
  line-height: 1.45;
  font-weight: 800;
  margin-bottom: 28px;
  color: #111827;
}

.options-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.option-btn {
  min-height: 86px;
  border: 4px solid;
  border-radius: 20px;
  background: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0 14px;
}

.option-btn:hover {
  transform: translateY(-1px);
}

.option-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.option-label {
  display: inline-block;
  line-height: 1.3;
}

.btn-group {
  margin-top: 24px;
  display: flex;
  justify-content: flex-start;
}

.prev-btn {
  border: none;
  background: #eef2f7;
  color: #374151;
  border-radius: 14px;
  padding: 12px 18px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.prev-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .question-card {
    border-radius: 18px;
    padding: 20px 16px 18px;
  }

  .question-card h3 {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .options-container {
    gap: 12px;
  }

  .option-btn {
    min-height: 74px;
    font-size: 16px;
    border-width: 3px;
    border-radius: 16px;
  }

  .progress-text {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .options-container {
    grid-template-columns: 1fr 1fr;
  }

  .question-card h3 {
    font-size: 18px;
  }

  .option-btn {
    min-height: 64px;
    font-size: 14px;
    padding: 0 8px;
  }
}
</style>
