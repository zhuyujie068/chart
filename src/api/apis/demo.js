import axios from "../axios"

export default {
  //  172.30.103.148: 8200                http://172.30.103.148:8200

  // 保证金/保函交易额占比
  login(data) {
    return axios.post('https://ztb.ldlcsj.com/financial/system/user/login', data)
  },

  // 节点数量      
  getPeerNum() {
    return axios.get('https://ztb.ldlcsj.com/explorer/getPeerNum')
  },
  // 区块高度
  getBlockNum() {
    return axios.get('https://ztb.ldlcsj.com/explorer/getBlockNum')
  },
  // 总交易量
  getTxNum() {
    return axios.get('https://ztb.ldlcsj.com/explorer/getTxNum')
  },
  // 用户数量
  getUserNum() {
    return axios.get('https://ztb.ldlcsj.com/explorer/getUserNum')
  },

  // 今日招投标 (招标中、评标中、中标)
  getProjectCountToday() {
    return axios.get('https://ztb.ldlcsj.com/integrated/tender/dashboard/getProjectCountToday')
  },

  // --------------------------------------- 左边
  // 各类项目成交统计
  getProjectDealingCountList(data) {
    return axios.get('https://ztb.ldlcsj.com/integrated/tender/dashboard/getProjectDealingCountList', data)
  },
  // 参与企业统计
  getParticipantLists(data) {
    return axios.get('https://ztb.ldlcsj.com/integrated/tender/dashboard/getParticipantLists', data)
  },
  // 银行产品放款明细
  detailsLoanStatistics(data) {
    return axios.post('https://ztb.ldlcsj.com/financial/statistics/loan/detailsLoanStatistics', data)
  },

  // --------------------------------------- 右边

  // 保证金/保函交易额占比
  getMarginList(data) {
    return axios.post('https://ztb.ldlcsj.com/integrated/tender/dashboard/getMarginList', data)
  },
  // 各采购方式保函减少资金
  getFinancialReduceList(data) {
    return axios.post('https://ztb.ldlcsj.com/integrated/tender/dashboard/getFinancialReduceList', data)
  },


  // 地图-按区域统计项目金额及数量 
  getProjectCountListByRegion(data) {
    return axios.get('https://ztb.ldlcsj.com/integrated/tender/dashboard/getProjectCountListByRegion', data)
  },
}
