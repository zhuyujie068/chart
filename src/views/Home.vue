<template>
  <div class="maxBox">
    <div class="titleBox">
      <img class="titleImg" src="../assets/imgs/header.png" />
    </div>
    <div class="subject">
      <!-- 左边 -->
      <div class="subject-side leftBox">
        <div class="subject-side-box leftBox-box1">
          <div class="chartsBox">
            <line-bar
              chartName="lineBar"
              v-if="lineBar"
              :xAxisName="knockdownNameList"
              :dataOne="knockdownCountList"
              :dataTwo="knockdownAmountList"
            ></line-bar>
          </div>
        </div>
        <div class="subject-side-box leftBox-box2">
          <div class="chartsBox">
            <pie-one
              :data="creditList"
              chartName="myPie1"
              v-if="myPie1"
            ></pie-one>
          </div>
        </div>
        <div class="subject-side-box leftBox-box3">
          <div class="chartsBox">
            <pie-two
              :data="loanList"
              chartName="myPie2"
              v-if="myPie2"
              :color="myPie2Color"
            ></pie-two>
          </div>
        </div>
      </div>

      <!-- 中间 -->
      <div class="centreBox">
        <div class="centreBox-top">
          <!-- 左边 -->
          <div class="centreBox-total-one">
            <div class="statisticsBox">
              <div class="statistics">
                <div>
                  <img class="totalImg" src="../assets/imgs/nodes.png" />
                </div>
                <p class="total">{{ peerNum }}</p>
                <p class="totalTitle">节点数量</p>
              </div>
              <div class="statistics">
                <div>
                  <img class="totalImg" src="../assets/imgs/blockHeight.png" />
                </div>
                <p class="total">{{ blockNum }}</p>
                <p class="totalTitle">区块高度</p>
              </div>
            </div>
          </div>

          <!-- 中间 -->
          <div class="centreBox-total-two">
            <div class="statisticsBox-centre">
              <div class="statistics-min">
                <div class="biddingData">
                  <span class="biddingData-num">{{
                    projectCountToday.bidding
                  }}</span>
                </div>
                <p class="totalTitle">招标中</p>
              </div>
              <div class="statistics-min">
                <div class="biddingData">
                  <span class="biddingData-num">{{
                    projectCountToday.evaluating
                  }}</span>
                </div>
                <p class="totalTitle">评标中</p>
              </div>
              <div class="statistics-min">
                <div class="biddingData">
                  <span class="biddingData-num">{{
                    projectCountToday.winBidding
                  }}</span>
                </div>
                <p class="totalTitle">中标</p>
              </div>
            </div>
          </div>

          <!-- 右边 -->
          <div class="centreBox-total-three">
            <div class="statisticsBox">
              <div class="statistics">
                <div>
                  <img class="totalImg" src="../assets/imgs/total.png" />
                </div>
                <p class="total">{{ txNum }}</p>
                <p class="totalTitle">总交易量</p>
              </div>
              <div class="statistics">
                <div>
                  <img class="totalImg" src="../assets/imgs/churn.png" />
                </div>
                <p class="total">{{ userNum }}</p>
                <p class="totalTitle">用户数量</p>
              </div>
            </div>
          </div>
        </div>
        <div class="map">
          <my-map></my-map>
        </div>
      </div>

      <!-- 右边 -->
      <div class="subject-side rightBox">
        <div class="rights">
          <div class="subject-side-box rightBox-box1">
            <div class="chartsBox">
              <stacked-histogram
                chartName="histogram"
                v-if="histogram"
                :xAxisName="analyseNameList"
                :dataOne="marginAmountList"
                :dataTwo="guaranteeAmountList"
              ></stacked-histogram>
            </div>
          </div>
          <div class="subject-side-box rightBox-box2">
            <div class="chartsBox">
              <bar-one
                chartName="barone"
                v-if="barone"
                :xAxisName="purchaseNameList"
                :dataOne="purchaseGuaranteeList"
                :dataTwo="purchaseMarginList"
              ></bar-one>
            </div>
          </div>
          <div class="subject-side-box rightBox-box3">
            <div class="chartsBox">
              <bar-two></bar-two>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myMap from "../components/map";
import lineBar from "../components/lineBar.vue";
import pieOne from "../components/pieOne.vue";
import pieTwo from "../components/pieTwo.vue";
import stackedHistogram from "../components/stackedHistogram.vue";
import barOne from "../components/barOne.vue";
import barTwo from "../components/barTwo.vue";

import Cookies from "js-cookie";

export default {
  components: {
    myMap,
    lineBar,
    pieOne,
    pieTwo,
    stackedHistogram,
    barOne,
    barTwo,
  },
  data() {
    return {
      time: 30000,

      lineBar: false,
      myPie1: false,
      myPie2: false,

      histogram: false,
      barone: false,

      peerNum: 0, //节点数量
      blockNum: 0, //区块高度
      txNum: 0, //总交易量
      userNum: 0, //用户数量

      //今日招投标
      projectCountToday: {},

      //各类项目成交统计
      knockdownAmountList: [], // 金额
      knockdownCountList: [], // 数量
      knockdownNameList: [], // 名称

      // 参与企业统计
      creditList: [],

      //银行产品放款明细
      loanList: [],
      myPie2Color: ["#FFAE0B", "#37A9FF", "#06CBCD", "#FF4F34", "#3570FF"],

      // 保证金/保函交易额占比
      marginAmountList: [], // 保证金金额
      guaranteeAmountList: [], // 保函对应保证金的金额
      analyseNameList: [], // 名称

      // 各采购方式保函减少资金
      purchaseGuaranteeList: [], // 保函费用
      purchaseMarginList: [], // 担保金额（保证金金额）
      purchaseNameList: [], // 名称
    };
  },
  mounted() {
    this.GetRequest();

    // 删除地图缓存
    sessionStorage.removeItem("mapData");
  },
  methods: {
    // 获取 url 参数， 通过 参数 自动配置 图表刷新时间
    GetRequest() {
      let url = location.search; //获取url中"?"符后的字串

      if (url) {
        if (url.indexOf("?") != -1) {
          //判断是否有参数
          let str = url.substr(1); //从第一个字符开始 因为第0个是?号 获取所有除问号的所有符串
          let strs = str.split("="); //用等号进行分隔 （因为知道只有一个参数 所以直接用等号进分隔 如果有多个参数 要用&号分隔 再用等号进行分隔）
          // alert(strs[1]); //直接弹出第一个参数 （如果有多个参数 还要进行循环的）

          this.time = strs[1];
        }
      }

      this.logo();
      this.goLogin(1000 * 60 * 30);
    },

    goLogin(time) {
      setInterval(() => {
        this.logo();
      }, time);
    },

    logo() {
      this.API.login({
        username: "dp001",
        password:
          "f969248d621bcded4a3582a1c3b17a71eedfefa9120c36ee3bd1957438cd55b9",
        source: "dp",
      }).then((res) => {
        Cookies.remove("token");
        Cookies.set("token", res.data.data.token);

        this.apiOne();
        this.apiTwo();

        // this.getMap();

        // 每隔 xxx s 请求一次
        this.timeout(10000);
        this.timeoutTwo(this.time);
      });
    },

    timeout(time) {
      setInterval(() => {
        this.apiOne;
      }, time);
    },

    timeoutTwo(time) {
      setInterval(() => {
        this.apiTwo();

        // if (!sessionStorage.getItem("mapData")) {
        //   this.getMap();
        // }
      }, time);
    },

    // getMap() {
    //   // 获取地图 上面的数据
    //   this.API.getProjectCountListByRegion().then((res) => {
    //     debugger;
    //     sessionStorage.setItem("mapData", res.data.data);
    //   });
    // },

    apiOne() {
      this.getPeerNum();
      this.getBlockNum();
      this.getTxNum();
      this.getUserNum();

      this.getProjectCountToday();
    },

    apiTwo() {
      this.getProjectDealingCountList();
      this.getParticipantLists();
      this.detailsLoanStatistics();

      this.getFinancialReduceList();
      this.getMarginList();
    },

    // 节点数量
    getPeerNum() {
      this.API.getPeerNum().then((res) => {
        this.peerNum = res.data.data;
      });
    },
    // 区块高度
    getBlockNum() {
      this.API.getBlockNum().then((res) => {
        this.blockNum = res.data.data;
      });
    },
    // 总交易量
    getTxNum() {
      this.API.getTxNum().then((res) => {
        this.txNum = res.data.data;
      });
    },
    // 用户数量
    getUserNum() {
      this.API.getUserNum().then((res) => {
        this.userNum = res.data.data;
      });
    },
    // 今日招投标 (招标中、评标中、中标)
    getProjectCountToday() {
      this.API.getProjectCountToday().then((res) => {
        this.projectCountToday = res.data.data;
      });
    },

    // ------------------------左边
    // 各类项目成交统计
    getProjectDealingCountList() {
      this.lineBar = false;
      this.API.getProjectDealingCountList({}).then((res) => {
        let amountList = [];
        let countList = [];
        let nameList = [];

        if (res.data.data) {
          res.data.data.forEach((item) => {
            amountList.push(this.UTIL.thousandMoney(item.amount));
            countList.push(item.count);
            nameList.push(item.name);
          });
        }

        this.knockdownAmountList = amountList;
        this.knockdownCountList = countList;
        this.knockdownNameList = nameList;

        this.lineBar = true;
      });
    },

    // 参与企业统计
    getParticipantLists() {
      this.myPie1 = false;
      this.API.getParticipantLists({}).then((res) => {
        let data = [];

        if (res.data.data) {
          res.data.data.forEach((item) => {
            data.push({
              value: item.count,
              // value: this.UTIL.formatMoney(item.count),
              name: item.name,
            });
          });
        }

        this.creditList = data;

        this.myPie1 = true;
      });
    },

    // 银行产品放款明细
    detailsLoanStatistics() {
      this.myPie2 = false;
      this.API.detailsLoanStatistics({}).then((res) => {
        let data = [];

        if (res.data.data) {
          res.data.data.forEach((item) => {
            data.push({
              value: item.loanAmount,
              name: item.bankName,
            });
          });
        }

        this.loanList = data;

        this.myPie2 = true;
      });
    },

    // ------------------------右边
    // 保证金/保函交易额占比
    getMarginList() {
      this.histogram = false;

      this.API.getMarginList({}).then((res) => {
        let marginAmountList = []; // 保证金金额
        let guaranteeAmountList = []; // 保函对应保证金的金额
        let nameList = [];

        if (res.data.data) {
          res.data.data.forEach((item) => {
            marginAmountList.push(this.UTIL.thousandMoney(item.marginAmount));
            guaranteeAmountList.push(
              this.UTIL.thousandMoney(item.guaranteeAmount)
            );
            nameList.push(item.publicBidType);
          });
        }

        this.marginAmountList = marginAmountList;
        this.guaranteeAmountList = guaranteeAmountList;
        this.analyseNameList = nameList;

        this.histogram = true;
      });
    },

    // 各采购方式保函减少资金
    getFinancialReduceList() {
      this.barone = false;

      this.API.getFinancialReduceList({
        type1: 1,
      }).then((res) => {
        let guaranteeList = [];
        let marginList = [];
        let nameList = [];

        if (res.data.data) {
          res.data.data.forEach((item) => {
            guaranteeList.push(this.UTIL.thousandMoney(item.guaranteeAmount));
            marginList.push(this.UTIL.thousandMoney(item.marginAmount));
            nameList.push(item.name);
          });
        }

        this.purchaseGuaranteeList = guaranteeList;
        this.purchaseMarginList = marginList;
        this.purchaseNameList = nameList;

        this.barone = true;
      });
    },
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
  width: 100vw;
  background: no-repeat url(../assets/imgs/bg.jpg);
  background-size: cover;
  padding: 0.4% 0 0 0;
  margin: -0.08%;
}

.titleBox {
  position: relative;
  top: 3.5%;
}

.titleImg {
  width: 100%;
}

.subject {
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 9vh;
  display: flex;
  justify-content: space-between;
}

.subject-side {
  position: relative;
  width: 23%;
  height: 95%;
  background-size: cover;
  margin-bottom: 1%;
  /* border: 1px solid red; */
}

.subject-side-box {
  width: 100%;
  height: 29%;
  /* border: 1px solid red; */
  /* margin-bottom: 10px; */
  margin-bottom: 5%;
  position: relative;
}

.chartsBox {
  /* border: 1px solid yellow; */
  /* width: 85%; */
  width: 92%;
  height: 80%;
  position: absolute;
  right: 4.5%;
  bottom: 10px;
}

/* 左边内容 */
.leftBox {
  padding-left: 2.5%;
}

.leftBox-box1 {
  background: url(../assets/imgs/box1.png) no-repeat;
  background-size: 100% 100%;
}

.leftBox-box2 {
  background: url(../assets/imgs/box2.png) no-repeat;
  background-size: 100% 100%;
}

.leftBox-box3 {
  background: url(../assets/imgs/box3.png) no-repeat;
  background-size: 100% 100%;
}

/* ---------- 中间内容 ---------- */
.centreBox {
  width: 44%;
  position: relative;
  top: 6.3%;
}

.centreBox-top {
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
}

.centreBox-total-one {
  padding: 15px 0;
  width: 25%;
  margin-right: 10px;
}

.centreBox-total-two {
  background: url(../assets/imgs/biddingToday.png) no-repeat;
  background-size: 100% 100%;
  width: 50%;
}

.centreBox-total-three {
  padding: 15px 0;
  width: 25%;
  margin-left: 10px;
}

.statisticsBox {
  display: flex;
  width: 100%;
}

/* 今日招投标 */
.statisticsBox-centre {
  display: flex;
  width: 100%;
  height: 90%;
  margin-top: 6%;
  justify-content: center;
}

.biddingData {
  width: 91%;
  /* width: 79%; */
  height: 49%;
  background: url(../assets/imgs/biddingData.png) no-repeat;
  background-size: 100% 100%;
  border: 1px solid rgba(0, 0, 0, 0);
  margin-top: 39%;
  /* margin-left: 8px; */
  margin-left: 2px;
}

.biddingData-num {
  width: 100%;
  color: #ffffff;
  font-size: 25px;
  font-weight: 400;
  margin-top: 30.5%;
  display: flex;
  justify-content: center;
}

.statistics-min {
  margin: 0 3%;
  width: 23%;
  /* border: 1px solid red; */
}

.statistics {
  width: 100%;
  text-align: center;
  /* border: 1px solid yellow; */
}

.totalImg {
  width: 88%;
  height: 88%;
}

.total {
  margin: 0;
  font-size: 26px;
  font-weight: 600;
  color: #ffffff;
  line-height: 26px;
  /* text-shadow: 0px 0px 10px #2f6cff; */
}

.totalTitle {
  margin: 6px 0 0 0;
  font-size: 13px;
  color: #63a1ff;
  line-height: 14px;
}

.map {
  width: 100%;
  height: 64%;
  margin-top: 35px;
  /* border: 1px solid red; */
}

/* 右边内容 */

.rights {
  width: 100%;
  height: 100%;
  /* border: 1px solid rgb(8, 146, 42); */
  /* padding-right: 100px; */
}
.rightBox {
  padding-right: 2%;
}

.rightBox-box1 {
  background: url(../assets/imgs/box4.png) no-repeat;
  background-size: 100% 100%;
}

.rightBox-box2 {
  background: url(../assets/imgs/box5.png) no-repeat;
  background-size: 100% 100%;
}

.rightBox-box3 {
  background: url(../assets/imgs/box6.png) no-repeat;
  background-size: 100% 100%;
}
</style>
