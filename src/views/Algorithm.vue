<template>
  <div class="maxBox">
    <div class="titleBox">
      <img class="titleImg" src="../assets/img/header.png" />
    </div>
    <div class="subject">
      <div class="leftBox">
        <img class="leftImg" src="../assets/img/outlineLeft.png" />
        <div class="leftContent">
          <div v-for="(item, index) in trackData" :key="item">
            <div class="track">
              <img class="trackIcon" src="../assets/img/trackIcon.png" />
              <div class="trackContent">
                <div class="introduceBox">
                  <!-- 项目名称：<span>{{ item.name }}</span>-->
                  <div>项目名称：</div>
                  <div>{{ item.name }}</div>
                </div>
                <div>
                  项目金额：<span>{{ item.money }}</span>
                </div>
                <div>
                  中标日期：<span>{{ item.biddingDate }}</span>
                </div>
                <div>
                  计划完成日期：<span>{{ item.finishDate }}</span>
                </div>
              </div>
            </div>
            <div class="tieku" v-if="index != 4"></div>
          </div>
        </div>
      </div>
      <div class="centreBox">
        <div class="statisticsBox">
          <div class="statistics">
            <div>
              <img class="totalImg" src="../assets/img/jiedianshuliang.png" />
            </div>
            <p class="total">3092</p>
            <p class="totalTitle">项目总数</p>
          </div>
          <div class="statistics">
            <div>
              <img class="totalImg" src="../assets/img/qukuaigaodu.png" />
            </div>
            <p class="total">3016</p>
            <p class="totalTitle">中标数量</p>
          </div>
          <div class="statistics">
            <div>
              <img
                class="totalImg"
                src="../assets/img/qukuailiantongdaoshu.png"
              />
            </div>
            <p class="total">586200</p>
            <p class="totalTitle">发标总额（万元）</p>
          </div>
          <div class="statistics">
            <div>
              <img class="totalImg" src="../assets/img/lianshangjigoushu.png" />
            </div>
            <p class="total">571500</p>
            <p class="totalTitle">中标总额（万元）</p>
          </div>
          <div class="statistics">
            <div>
              <img
                class="totalImg"
                src="../assets/img/shanglianshujuliang.png"
              />
            </div>
            <p class="total">3689</p>
            <p class="totalTitle">企业数量</p>
          </div>
        </div>
        <div class="map">
          <my-map></my-map>
        </div>
      </div>
      <div class="rightBox">
        <img class="rightImg" src="../assets/img/outlineRight.png" />
        <div class="rightContent">
          <div class="warning" v-for="(item, index) in warningData" :key="item">
            <div>
              <div class="title">
                <img
                  class="warningImg"
                  src="../assets/img/top1.png"
                  v-if="index == 0"
                />
                <img
                  class="warningImg"
                  src="../assets/img/top2.png"
                  v-else-if="index == 1"
                />
                <img
                  class="warningImg"
                  src="../assets/img/top3.png"
                  v-else-if="index == 2"
                />
                <img
                  class="warningImg"
                  src="../assets/img/top4.png"
                  v-else-if="index == 3"
                />
                <img
                  class="warningImg"
                  src="../assets/img/top5.png"
                  v-else-if="index == 4"
                />
                <span class="titleContent">{{ item.title }}</span>
              </div>
              <div class="contentBox">
                <div class="warningContent">
                  <div>
                    标段编号:<span>{{ item.number }}</span>
                  </div>
                  <div>
                    中标金额：<span>{{ item.money }}</span>
                  </div>
                  <div>
                    开标时间：<span>{{ item.amount }}</span>
                  </div>
                  <div>
                    中标单位：<span>{{ item.unit }}</span>
                  </div>
                </div>
                <div class="smoking">
                  <p class="smokingNum">{{ item.smoking }}</p>
                  <div class="smokingBox">
                    <img
                      class="smokingImg"
                      src="../assets/img/smoking.png"
                    /><samp class="exponent">冒烟指数</samp>
                  </div>
                </div>
              </div>
              <div class="tieku" v-if="index != 4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myMap from "../components/map";

export default {
  name: "Home",
  components: {
    myMap,
  },
  data() {
    return {
      trackData: [
        {
          name: "娄底市联鑫再生资源综管理",
          money: "1000.12万元",
          biddingDate: "2020-04-03",
          finishDate: "2021-06-12",
        },
        {
          name: "双峰县人民医院异地扩建",
          money: "389.00万元",
          biddingDate: "2020-03-03",
          finishDate: "2021-06-17",
        },
        {
          name: "文田镇中心小学综合楼建设",
          money: "97.85万元",
          biddingDate: "2020-09-03",
          finishDate: "2021-06-21",
        },

        {
          name: "娄底市月塘足球场建设工程",
          money: "54.86万元",
          biddingDate: "2020-12-07",
          finishDate: "2021-06-25",
        },

        {
          name: "娄底市香樟街道路新建工程",
          money: "150.00万元",
          biddingDate: "2021-05-01",
          finishDate: "2021-6-29",
        },
      ],
      warningData: [
        {
          title: "娄底经济技术开发区创业大厦建设",
          number: "WH13GC2017FJ416",
          money: "786.34万元",
          amount: "2021-06-01",
          unit: "****建设工程有限公司",
          smoking: "200.05",
        },

        {
          title: "冷水江市利民煤矿矿井建设",
          number: "WH13GC2017UY841",
          money: "158.56万元",
          amount: "2021-06-03",
          unit: "****矿井建设有限公司",
          smoking: "180.09",
        },
        {
          title: "双峰县第三中学家属院改造",
          number: "WH13GC2017ZK753",
          money: "366.23万元",
          amount: "2021-06-04",
          unit: "****改造管理有限公司",
          smoking: "173.00",
        },
        {
          title: "娄星区公立幼儿园改造",
          number: "WH13GC2017DC125",
          money: "146.76万元",
          amount: "2021-06-09",
          unit: "****建设管理有限公司",
          smoking: "150.16",
        },
        {
          title: "娄底职业技术学院扩建",
          number: "WH13GC2017VB665",
          money: "1,666.31万元",
          amount: "2021-06-15",
          unit: "****建设工程有限公司",
          smoking: "140.09",
        },
      ],
    };
  },
};
</script>
<style>
.introduceBox {
  display: flex;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #000323;
}

.maxBox {
  height: 100vh;
  /* overflow-x:; */
  /* height: 99.7vh; */
  width: 100vw;
  background: no-repeat url(../assets/img/bg.png);
  background-size: cover;
  padding: 0.4% 0 0 0;
  margin: -0.08%;
}

.titleBox {
  position: relative;
  top: 20px;
}

.titleImg {
  width: 100%;
}

.subject {
  width: 100vw;
  position: absolute;
  top: 5vh;
  display: flex;
  justify-content: space-between;
}

.leftBox {
  position: relative;
  width: 27%;
  background-size: cover;
  margin-bottom: 1%;
}

.leftImg {
  position: absolute;
  width: 100%;
  left: 0;
}

.leftContent {
  position: relative;
  top: 12vh;
  left: 4.5vw;
  width: 67%;
}

.track {
  width: 100%;
  display: flex;
  align-items: center;
  margin-left: 3%;
  /* height: 15.5vh; */
  height: 13.5vh;
}

.trackIcon {
  width: 15%;
}

.trackContent {
  color: #54eaff;
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  margin: 25px 5px;
  text-align: left;
}

.tieku {
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(47, 108, 255, 0) 0%,
    #2f6cff 50%,
    rgba(47, 108, 255, 0) 100%
  );
  opacity: 0.6;
}

span {
  color: #fff;
  white-space: normal;
}

.centreBox {
  width: 44%;
  /* flex: 1; */
  position: relative;
  top: 10vh;
}

.statisticsBox {
  display: flex;
}

.statistics {
  width: 100%;
  text-align: center;
}

.totalImg {
  width: 60%;
  height: 60%;
}

.total {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  line-height: 30px;
  text-shadow: 0px 0px 10px #2f6cff;
}

.totalTitle {
  margin-top: 15px;
  font-size: 14px;
  color: #63a1ff;
  line-height: 14px;
}

.map {
  width: 100%;
  /* height: 65vh; */
  height: 60vh;
}

.rightBox {
  position: relative;
  width: 27%;
  background-size: cover;
  margin-bottom: 1rem;
}

.rightImg {
  position: absolute;
  width: 100%;
  right: 0;
}

.rightContent {
  width: 67%;
  position: relative;
  top: 12.5vh;
  left: 4.5vw;
  text-align: left;
}

.warning {
  margin: 15px 5px;
}

.title {
}

.warningImg {
  width: 70%;
  left: 2%;
  height: 20px;
  position: relative;
}

.titleContent {
  position: absolute;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  line-height: 20px;
  left: 18%;
}

.contentBox {
  /* height: 10.5vh; */
  height: 9vh;
  display: flex;
  position: relative;
  left: 2%;
}

.warningContent {
  width: 100%px;
  height: 25%;
  font-size: 12px;
  font-weight: 400;
  color: #54eaff;
  line-height: 18px;
  flex: 3;
}

.smoking {
  flex: 1;
  margin-top: 1vh;
}

.smokingBox {
  display: flex;
  margin-left: -10%;
}

.smokingNum {
  width: 65px;
  font-size: 14px;
  font-weight: 600;
  color: #ff730a;
  line-height: 29px;
  margin: 0;
}

.smokingImg {
  width: 10px;
  height: 16px;
  margin-right: 5px;
}

.exponent {
  font-size: 12px;
  font-weight: 400;
  color: #54eaff;
  line-height: 20px;
}
</style>
