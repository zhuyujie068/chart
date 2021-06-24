<template>
  <div :id="chartName" style="width: 100%; height: 100%" />
</template>
<script>
export default {
  data() {
    return {
      chart: null,
      option: {
        // 网格(设置 图表 位置)
        grid: {
          top: "1%", //距上边距
          left: "5%", //距离左边距
          right: "5%", //距离右边距
          bottom: "1%", //距离下边距
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "#0588EF", // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: "#0588EF", // 提示边框颜色
          textStyle: {
            color: "#FFFFFF", //设置文字颜色
            fontSize: 8,
            align: "left",
          },
          formatter: (param) => {
            // console.log(param);
            return (
              param.name +
              "&nbsp;&nbsp;&nbsp;&nbsp;" +
              this.UTIL.formatMoney(param.value)
            );
          },
        },
        series: [
          {
            type: "pie",
            radius: ["26%", "45%"],
            avoidLabelOverlap: true,
            color: this.color,
            labelLine: {
              normal: {
                length: 25, //指示线 长度
                length2: 60, //指示线 长度
              },
            },
            // 标签
            label: {
              show: true, //默认展示
              position: "outside", //默认'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区
              //   formatter: "{a|{b}}{c|{d}%}", //格式展示{a|{b}\n{d}%}
              formatter: "{a|{d}%}\n{b|{b}}", //格式展示{a|{b}\n{d}%}
              backgroundColor: "auto", //圆点颜色，auto：映射的系列色
              // height,width,lineHeight必须为0
              height: 0,
              width: 0,
              lineHeight: 0,
              // radius和padding为圆点大小，圆点半径为几radius和padding各项数值就为几如：圆点半径为1
              borderRadius: 2.5,
              //   padding: [2.5, -2.5, 2.5, -2.5],
              color: "#315af0",
              rich: {
                // 自定义富文本样式
                b: {
                  color: "auto",
                  fontSize: 10,
                  lineHeight: 14,
                  padding: [-20, -40, -0, -40],
                },
                a: {
                  color: "#FFFFFF",
                  fontSize: 12,
                  padding: [-30, -40, -0, -40],
                  lineHeight: 14,
                },
              },
            },
            data: this.data,
          },
        ],
      },
    };
  },
  mounted() {
    this.getCharts();
  },
  props: {
    chartName: {
      default: "pieOne",
    },
    data: {
      default: () => [
        {
          value: 510,
          name: "win8",
        },
        {
          value: 42,
          name: "win10",
        },
        {
          value: 175,
          name: "winXP",
        },
        {
          value: 141,
          name: "macOS",
        },
        {
          value: 342,
          name: "win7",
        },
      ],
    },
    color: {
      default: () => ["#5B19EC", "#FF5332", "#0099F2", "#FFF474", "#0099F2"],
    },
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