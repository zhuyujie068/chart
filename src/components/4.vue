<template>
  <div id="mapView" style="width: 900px; height: 700px" />
</template>
<script>
//引入地图数据
import loudi from "../assets/json/loudi.json";

export default {
  data() {
    return {
      myColor: "red",
      // 坐标连线
      busLines: [
        {
          name: "冷水江市",
          coords: [
            [111.428147, 27.70541],
            [111.657486, 27.698115],
          ],
          lineStyle: {
            //给每条线都不同的样式
            normal: {
              color: "#fff",
            },
          },
        },
        {
          name: "涟源市",
          coords: [
            [111.657486, 27.698115],
            [112.179337, 27.463799],
          ],
          lineStyle: {
            //给每条线都不同的样式
            normal: {
              // 使用渐变色
              color: {
                type: "linear", // radial   linear
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "red", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0069e6", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        },
        {
          name: "双峰县",
          coords: [
            [112.179337, 27.463799],
            [111.428147, 27.70541],
          ],
          lineStyle: {
            //给每条线都不同的样式
            normal: {
              color: "#fff",
            },
          },
        },
        {
          name: "双峰县",
          coords: [
            [111.428147, 27.70541],
            [112.179337, 27.463799],
          ],
          lineStyle: {
            //给每条线都不同的样式
            normal: {
              color: "#fff",
            },
          },
        },
        {
          name: "双峰县",
          coords: [
            [112.179337, 27.463799],
            [111.243439, 27.827534],
            [111.270905, 28.132545],
            [110.863724, 27.853642],
            [111.582642, 27.806278],
          ],
          lineStyle: {
            //给每条线都不同的样式
            normal: {
              color: "#fff",
            },
          },
        },
      ],
      listData: [
        {
          name: "东营区",
          emphasis: [
            {
              name: "东营顺利医院",
              value: 0,
            },
            {
              name: "东营顺利医院6",
              value: 6,
            },
          ],
        },
        {
          name: "河口区",
          emphasis: [
            {
              name: "东营顺利医院",
              value: 0,
            },
            {
              name: "东营顺利医院6",
              value: 6,
            },
          ],
        },
      ],
    };
  },
  mounted() {
    // this.getMapInfo() //获取地图显示的数据
    this.buildMap();
  },
  methods: {
    buildMap() {
      let myMap = this.$echarts.init(document.getElementById("mapView")); //初始化节点实例

      this.$echarts.registerMap("娄星区", loudi); //注册可用的地图数据 , name 值 需要于 json 数据中的值 一样

      const series = [];

      series.push({
        type: "lines", // 这个就是普通连线
        coordinateSystem: "geo", // 这句的意思是连线是基于地理坐标的,geo组件将在下面给出
        polyline: true, // 这表示连线是否为多端点的连线
        data: this.busLines, // 这里就是连线的数据了
        // 线条样式
        lineStyle: {
          normal: {
            opacity: 0.5,
            width: 2,
          },
          emphasis: {
            color: "red",
          },
        },
        // 线特效的配置
        effect: {
          constantSpeed: 20, // 恒定速度
          show: true,
          trailLength: 0.1,
          symbolSize: 1.5,
        },

        // 自定义markPoint的标记类型
        markPoint: {
          // symbol: 'image://' + require('./assets/logo.png'), // 自定义图片路径

          //  markPoint 的样式内置了 ‘circle’, ‘rect’, ‘roundRect’, ‘triangle’, ‘diamond’, ‘pin’, ‘arrow’ 几种
          symbol: "pin",

          emphasis: {
            color: "red",
          },
          symbolSize: [28, 49], // 图片大小
          label: {
            position: "top",
            color: "#fff",
          },
          // 定位地址坐标
          data: [
            {
              name: "冷水江市",
              coord: [111.459046, 27.657982],
              value: "78",

              // 选中 状态 的数据  可以在 提示框 拿到进行 数据显示
              emphasis: [
                {
                  name: "项目总数",
                  value: 23,
                },
                {
                  name: "中标数量",
                  value: 16,
                },
                {
                  name: "发标总额",
                  value: "630.00 万元",
                },
                {
                  name: "中标总额",
                  value: "389.50 万元",
                },
                {
                  name: "企业数量",
                  value: 961,
                },
              ],
            },
            {
              name: "涟源市",
              coord: [111.658173, 27.691427],
              value: "37",
            },
            {
              name: "双峰县",
              coord: [112.177963, 27.452222],
              value: "50",
            },
            {
              coord: [112.179337, 27.463799],
              value: "50",
            },
            {
              coord: [111.243439, 27.827534],
              value: "50",
            },
          ],
        },
      });

      //配置项
      let option = {
        // backgroundColor: '#09132c', // 地图背景
        geo: {
          map: "娄星区",
          zoom: 0.9, // 地图 在画布 中的距离
          label: {
            // 正常状态
            normal: {
              show: true,
              formatter: "{a}", //地图上显示的数据，分别 a、b 对应 data 中的 name 和 value ， 默认只展示 name
              backgroundColor: "#002E9B",
              color: "#63A1FF",
              padding: [4, 5],
              borderRadius: 3,
              borderWidth: 1,
              borderColor: "#2F6CFF",
            },
            // 高亮状态 下的多边形和标签样式
            emphasis: {
              backgroundColor: "#002E9B",
              color: "#63A1FF",
              borderColor: "#2F6CFF",
            },
            itemStyle: {
              // 图形样式
              areaColor: "#00FFFF",
              borderWidth: 2,
              borderColor: "#2AB8FF",
              shadowColor: "#2AB8FF",
              shadowBlur: 5, // 图形阴影的模糊大小
              shadowOffsetX: 5, // 阴影水平方向上的偏移距离。
              shadowOffsetY: 6,
            },
          },
          // selectedMode: 'single', // 是否支持多个选中，single单选，multiple多选
          roam: true,

          // 地图样式
          itemStyle: {
            normal: {
              // areaColor: '#0f3c8e', // //地图色

              // 地图整体设置渐变色，会设置到每一块都是颜色渐变，并不是整体一个颜色渐变过去
              areaColor: {
                //地图色
                type: "linear", // radial   linear
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#052c76", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#0069e6", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },

              borderWidth: 2,
              borderColor: "#2AB8FF",
              shadowColor: "#0f3c8e",
              shadowBlur: 5,
              shadowOffsetX: 5,
              shadowOffsetY: 6,
            },
            emphasis: {
              areaColor: "#0f3c8e",
            },
          },
          // top: '160', // 地图 距离 画布 top 的距离，默认居中
          data: this.listData,
        },
        series: series,

        //移入地图时展示信息
        tooltip: {
          trigger: "item",
          backgroundColor: "opacity",
          formatter: function (params) {
            let objs = JSON.parse(JSON.stringify(params));
            console.log(objs);

            // params 获取 鼠标 在 画布 上 移动的 参数
            // params.componentType  获取 鼠标事件 类型
            // 当 鼠标 在 markPoint 数据中的坐标 时 显示提示框
            if (params.componentType == "geo") {
              let obj1 = JSON.parse(JSON.stringify(params));
              let obj = obj1.data.emphasis; // 获取 鼠标 移到 markPoint 坐标 对应的 显示数据
              let item = "";

              if (obj.length > 1) {
                for (let i = 0; i < obj.length; i++) {
                  item += `
                      <li style='height: 20px; list-style: none; color: #e3ac3a;font-size: 12px;display: flex;justify-content: space-between;align-items: center;margin: 5px 0'>
                          <p>${obj[i].name}</p>
                          <p>${obj[i].value}</p>
                      </li>
                      `;
                }
              } else {
                item = `
                      <li style='height: 20px; list-style: none; color: #fff;font-size: 12px;display: flex;justify-content: space-between;align-items: centborder-bottom: solid #123c8e;padding-bottom: 5px'>
                          <p>暂无数据</p>
                       </li>
                    `;
              }
              let str = `<ul style='width:200px; padding: 8px 20px;background: #0b2668;border: 1px solid #123c8e'>${item}</ul>`;
              return str;
            }
          },
        },
      };

      myMap.clear();
      myMap.setOption(option);
    },
  },
};
</script>