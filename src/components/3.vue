<template>
  <div id="mapView" style="width: 900px; height: 500px" />
</template>
<script>
//引入地图数据
import loudi from "./assets/json/loudi.json";

export default {
  mounted() {
    this.getMapInfo(); //获取地图显示的数据
  },
  methods: {
    async getMapInfo() {
      let data = [
        {
          name: "新化县",
          value: 0,
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
          name: "冷水江市",
          value: 0,
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
          name: "涟源市",
          value: 0,
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
          name: "娄星区",
          value: 0,
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
          name: "双峰县",
          value: 0,
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
      ];

      this.buildMap(data);
    },
    buildMap(data) {
      // buildMap() {
      let myMap = this.$echarts.init(document.getElementById("mapView")); //初始化节点实例

      this.$echarts.registerMap("娄星区", loudi); //注册可用的地图数据 , name 值 需要于 json 数据中的值 一样

      //配置项
      let option = {
        backgroundColor: "#fff", // 地图背景

        geo: {
          // geo组件
          map: "娄星区",
          label: {
            normal: {
              show: true,
              formatter: "{a}",
              // position: 'inside',
              backgroundColor: "#fff",
              padding: [3, 5],
              borderRadius: 3,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.5)",
              color: "#777",
            },
            emphasis: {
              areaColor: "#2a333d",
            },
          },
          selectedMode: "single",
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#404a59",
            },
            emphasis: {
              areaColor: "#2a333d",
            },
          },
        },

        series: [
          {
            name: "娄星区地图",
            type: "map", // 系列名称
            map: "娄星区", // 自定义扩展图表类型，和上文注册名字的一样
            zoom: 1.2,
            label: {
              show: true,
              color: "#fff",
            },
            itemStyle: {
              normal: {
                //正常状态
                label: {
                  show: true,
                  formatter: "{b}", //地图上显示的数据，分别对应data中的name和value
                  color: "#fff",
                },
                borderColor: "#07919e", // 边框颜色
                areaColor: "#0a76d1", //地图区域的颜色
                shadowBlur: 2, // 图形阴影的模糊大小
                shadowOffsetX: 0, // 阴影水平方向上的偏移距离。
              },
              emphasis: {
                //  鼠标移入高亮状态
                label: {
                  show: true,
                },
                areaColor: "#ccb213",
              },
            },

            emphasis: {
              // 高亮状态下的多边形和标签样式
              label: {
                show: false,
              },
              itemStyle: {
                areaColor: "#2AB8FF",
              },
            },
            aspectScale: 1, //用于 scale 地图的长宽比
            top: "60",
            data: data,

            // 自定义markPoint的标记类型
            markPoint: {
              // symbol: 'image://' + require('./assets/logo.png'), // 自定义图片路径

              //  markPoint 的样式内置了 ‘circle’, ‘rect’, ‘roundRect’, ‘triangle’, ‘diamond’, ‘pin’, ‘arrow’ 几种
              symbol: "pin",

              symbolSize: [28, 49], // 图片大小
              label: {
                position: "top",
                color: "#fff",
              },
              // coord 数组存放地址坐标
              data: [
                {
                  name: "冷水江市",
                  coord: [111.459046, 27.657982],
                  value: "78",

                  // 提示框的数据显示
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
                  name: "涟源市",
                  coord: [111.658173, 27.691427],
                  value: "37",
                },
                {
                  name: "双峰县",
                  coord: [112.177963, 27.452222],
                  value: "50",
                },
              ],
            },
          },
        ],

        //移入地图时展示信息
        tooltip: {
          trigger: "item",
          backgroundColor: "opacity",
          formatter: function (params) {
            // params.componentType  获取 鼠标事件 类型
            // 当 鼠标 在 markPoint 数据中的坐标 时 显示提示框
            if (params.componentType == "markPoint") {
              let obj1 = JSON.parse(JSON.stringify(params));
              let obj = obj1.data.emphasis;
              let str = `
                  <ul style='width:200px; padding: 8px 20px;background: #0b2668;border: 1px solid #123c8e'>
                      <li style='height: 20px; list-style: none; color: #198aea;font-size: 12px;display: flex;justify-content: space-between;align-items: centborder-bottom: solid #123c8e;padding-bottom: 5px'>
                          <p>医院</p>
                          <p>接入设备数</p>
                       </li>
                    `;
              for (let i = 0; i < obj.length; i++) {
                str =
                  str +
                  `
                   <li style='height: 20px; list-style: none; color: #198aea;font-size: 12px;display: flex;justify-content: space-between;align-items: center;margin: 5px 0'>
                       <p>${obj[i].name}</p>
                       <p>${obj[i].value}</p>
                   </li>
                                    `;
              }
              str = str + "</ul>";
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