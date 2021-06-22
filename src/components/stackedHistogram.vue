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
          backgroundColor: "#F79700", // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: "#F79700", // 提示边框颜色
          textStyle: {
            color: "#FFFFFF", //设置文字颜色
            fontSize: 8,
            align: "left",
          },
        },
        legend: {
          data: ["保证金交易额 (万元)", "保函交易额 (万元)"],
          itemGap: 10, // 图例之间的距离
          // 设置文本
          textStyle: {
            color: "#63A1FF",
            fontSize: 10,
          },
          itemHeight: 10, //修改 icon 图形 Height
          itemWidth: 10, //修改 icon 图形 Width
          x: "23%", // 水平安放位置
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
                fontSize: 8, //更改坐标轴文字大小
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
            name: "保证金交易额 (万元)",
            type: "bar",
            stack: "交易额", // 柱状图 stack 值相同时 就会 堆叠
            barWidth: 20, // 柱状图 宽度 默认自适应
            // emphasis: {
            //   focus: "series",
            // },
            data: this.dataOne,
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#FF7C2F" }, //柱图渐变色
                  { offset: 0, color: "#FFB04D" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "保函交易额 (万元)",
            type: "bar",
            stack: "交易额",
            barWidth: 20, // 柱状图 宽度 默认自适应
            // emphasis: {
            //   focus: "series",
            // },
            data: this.dataTwo,
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0], // 柱条边线圆角，单位px，默认为0
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#F44C2D" }, //柱图渐变色
                  { offset: 0, color: "#FF6B3C" }, //柱图渐变色
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
      default: "stackedHistogram",
    },
    xAxisName: {
      default: () => ["政府采购", "工程建设", "土地矿产", "产权交易", "其他"],
    },
    dataOne: {
      default: () => [220, 182, 191, 234, 290, 330, 310],
    },
    dataTwo: {
      default: () => [150, 232, 201, 154, 190, 330, 410],
    },
  },
  mounted() {
    this.getCharts();

    console.log(this.xAxisName);
    console.log(this.dataOne);
    console.log(this.dataTwo);
  },
  methods: {
    getCharts() {
      //初始化节点实例
      this.chart = this.$echarts.init(document.getElementById(this.chartName));

      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option);
    },
  },
};
</script>