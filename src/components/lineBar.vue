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
          backgroundColor: "#00ADDB", // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: "#00ADDB", // 提示边框颜色
          textStyle: {
            color: "#FFFFFF", //设置文字颜色
            fontSize: 8,
            align: "left",
          },
        },
        // legend: {
        //   data: [
        //     {
        //       name: "项目数",
        //       icon: "rect", // 用矩形替换
        //     },
        //     {
        //       name: "交易量 (万元)",
        //       // icon: "rect",
        //     },
        //   ],

        //   itemGap: 10, // 图例之间的距离
        //   itemHeight: 8, //修改 icon 图形 Height
        //   itemWidth: 12, //修改 icon 图形 Width
        //   // 设置文本
        //   textStyle: {
        //     color: "#63A1FF",
        //     fontSize: 8,
        //   },
        //   x: "45%", // 水平安放位置
        // },

        //分开单独设置图例
        legend: [
          {
            data: [
              {
                name: "项目数",
                icon: "rect", // 用矩形替换
              },
            ],
            itemGap: 10, // 图例之间的距离
            itemHeight: 10, //修改 icon 图形 Height
            itemWidth: 10, //修改 icon 图形 Width
            // 设置文本
            textStyle: {
              color: "#63A1FF",
              align: "left",
              // padding: [10, 0, 0, 0],
            },
            x: "47%", // 水平安放位置
            y: "2%", // 水平安放位置
          },
          {
            data: [
              {
                name: "交易量 (万元)",
                icon: "rect", // 用矩形替换
              },
            ],
            itemGap: 10, // 图例之间的距离
            itemHeight: 3, //修改 icon 图形 Height
            itemWidth: 12, //修改 icon 图形 Width
            // 设置文本
            textStyle: {
              color: "#63A1FF",
              fontSize: 10,
            },
            x: "64%", // 水平安放位置
            y: "2%",
          },
        ],

        // 网格(设置 图表 位置)
        grid: {
          top: "20%", //距上边距
          left: "16%", //距离左边距
          right: "20%", //距离右边距
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
          // --- 项目数 ---
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#63A1FF",
              },
            },
            // 分隔线
            splitLine: {
              show: true, // 默认显示
              // 控制线条样式
              lineStyle: {
                color: ["#0a266b"],
                width: 1,
                type: "solid",
              },
            },
          },
          // ---- 交易量 ----
          {
            type: "value",
            axisLabel: {
              formatter: "¥{value}",
              textStyle: {
                color: "#63A1FF",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "项目数",
            type: "bar",
            data: this.dataOne,
            barWidth: 20, // 柱状图 宽度 默认自适应
            itemStyle: {
              normal: {
                barBorderRadius: [4, 4, 0, 0], // 柱条边线圆角，单位px，默认为0
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#0288ff" }, //柱图渐变色
                  { offset: 0.5, color: "#3fc4ff" }, //柱图渐变色
                  { offset: 0, color: "#52dffa" }, //柱图渐变色
                ]),
              },
            },
          },
          {
            name: "交易量 (万元)",
            type: "line",
            yAxisIndex: 1,
            data: this.dataTwo,
            symbol: null, // 折线图 拐点图形类型
            symbolSize: 2, // 折线图 拐点图形大小
            itemStyle: {
              normal: {
                color: "red",
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "#FEAC17" }, //柱图渐变色
                  { offset: 0, color: "#FF730A" }, //柱图渐变色
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
      default: () => ["政府采购", "工程建设", "土地矿产", "产权交易"],
    },
    dataOne: {
      default: () => [220, 182, 191, 234, 290, 330, 320],
    },
    dataTwo: {
      default: () => [150, 232, 201, 154, 190, 330, 410],
    },
  },
  mounted() {
    this.getCharts();
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