<template>
  <div :id="chartName" style="width: 100%; height: 100%" />
</template>
<script>
export default {
  data() {
    return {
      chart: null,
      option: {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#0299D0", // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: "#0299D0", // 提示边框颜色
          textStyle: {
            color: "#FFFFFF", //设置文字颜色
            fontSize: 8,
            align: "left",
          },
        },
        legend: {
          data: ["担保金额 (万元)", "保函费用 (万元)"],
          itemGap: 10, // 图例之间的距离
          // 设置文本
          textStyle: {
            color: "#63A1FF",
            fontSize: 10,
          },
          itemHeight: 10, //修改 icon 图形 Height
          itemWidth: 10, //修改 icon 图形 Width
          x: "32%", // 水平安放位置
          y: "2%",
        },
        // 网格(设置 图表 位置)
        grid: {
          top: "20%", //距上边距
          left: "20%", //距离左边距
          right: "5%", //距离右边距
          bottom: "15%", //距离下边距
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisName,
            axisPointer: {
              type: "shadow",
            },
            // 设置 标签
            axisLabel: {
              show: true,
              textStyle: {
                color: "#63A1FF", //更改坐标轴文字颜色
                fontSize: 7.2, //更改坐标轴文字大小
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "¥{value}",
              textStyle: {
                color: "#63A1FF",
              },
            },
            // 分隔线
            splitLine: {
              show: true, // 默认显示
              // 控制线条样式
              lineStyle: {
                color: ["#014692"],
                width: 1,
                type: "solid",
              },
            },
          },
        ],
        series: [
          {
            name: "担保金额 (万元)",
            type: "bar",
            data: this.dataOne,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0], // 柱条边线圆角，单位px，默认为0
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#2FB9FF" }, //柱图渐变色
                  { offset: 0, color: "#33FEF0" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "保函费用 (万元)",
            type: "bar",
            data: this.dataTwo,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0], // 柱条边线圆角，单位px，默认为0
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#FBBB0F" }, //柱图渐变色
                  { offset: 0, color: "#FFE858" }, //柱图渐变色
                ]),
              },
            },
          },
        ],
      },
    };
  },
  props: {
    chartName: {
      default: "barOne",
    },
    xAxisName: {
      type: Array,
      default: () => [
        "公开招标",
        "邀请招标",
        "竞争性磋商",
        "竞争性谈判",
        "询价",
        "单一来源",
      ],
    },
    dataOne: {
      type: Array,
      default: () => [],
    },
    dataTwo: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    // xAxisName(newval, oldval) {
    //   if (newval) {
    //     this.initCharts();
    //   }
    // },
    // option(newval, oldval) {
    //   if (newval) {
    //     this.chart.setOption(newval);
    //   }
    // },
    // xAxisName(newval, oldval) {
    // debugger;
    // console.log(this.xAxisName);
    // console.log(this.dataOne);
    // console.log(this.dataTwo);
    // this.chart.clear();
    // if (newval) {
    //   this.chart.setOption(this.option, true);
    // }
    // this.chart.resize();
    //   if (newval) {
    //     debugger;
    //     this.$echarts.dispose();
    //     this.initCharts();
    //   }
    // },
    // option: {
    //   deep: true,
    //   handler: function (newval, oldval) {
    //     debugger;
    //     if (newval) {
    //       this.chart.setOption(newval, true);
    //     } else {
    //       this.chart.setOption(oldval, true);
    //     }
    //     this.chart.resize();
    //   },
    // },
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initCharts() {
      //初始化节点实例
      this.chart = this.$echarts.init(document.getElementById(this.chartName));

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option);
    },
    // 重新渲染(重新绘制,重新加载数据)
  },
};
</script>