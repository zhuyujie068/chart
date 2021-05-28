<template>
  <div id="mapView" style="width: 900px; height: 500px" />
</template>
<script>
  //引入地图数据
  import dy from './assets/json/dy.json'

  export default {
    mounted() {
      this.getMapInfo() //获取地图显示的数据
    },
    methods: {
      async getMapInfo() {
        // let res = await getMapData() //自己封装的请求方法

        let data = [{
          name: "东营区",
          emphasis: [{
            name: "东营顺利医院",
            value: 0
          }, {
            name: "东营顺利医院6",
            value: 6
          }]
        }, {
          name: "河口区",
          emphasis: [{
            name: "东营顺利医院",
            value: 0
          }, {
            name: "东营顺利医院6",
            value: 6
          }]
        }]

        this.buildMap(data) //有数据格式要求，下文细说

      },
      buildMap(data) {
        let myMap = this.$echarts.init(document.getElementById('mapView')) //初始化节点实例
        this.$echarts.registerMap('东营区', dy) //注册可用的地图
        //配置项
        let option = {
          //移入地图时展示信息
          tooltip: {
            trigger: "item",
            backgroundColor: 'opacity',
            //感觉代码写的不美观。。。显示的样式根据情况而定
            formatter: function (params) {
              let obj1 = JSON.parse(JSON.stringify(params));
              let obj = obj1.data.emphasis
              let str = `
                  <ul style='width:200px; padding: 8px 20px;background: #0b2668;border: 1px solid #123c8e'>
                      <li style='height: 20px; list-style: none; color: #198aea;font-size: 12px;display: flex;justify-content: space-between;align-items: centborder-bottom: solid #123c8e;padding-bottom: 5px'>
                          <p>医院</p>
                          <p>接入设备数</p>
                       </li>
                    `
              for (let i = 0; i < obj.length; i++) {
                str = str +
                  `
                   <li style='height: 20px; list-style: none; color: #198aea;font-size: 12px;display: flex;justify-content: space-between;align-items: center;margin: 5px 0'>
                       <p>${obj[i].name}</p>
                       <p>${obj[i].value}</p>
                   </li>
                                    `
              }
              str = str + "</ul>";
              return str;
            }
          },
          series: [{
            name: '东营市地图',
            type: 'map',
            mapType: '东营区', // 自定义扩展图表类型，和上文注册名字的一样
            itemStyle: {
              normal: { //正常状态
                label: {
                  show: true,
                  formatter: '{b}-{c}', //地图上显示的数据，分别对应data中的name和value
                  color: '#fff',
                },
                areaColor: '#0a76d1' //地图区域的颜色
              },
              emphasis: { //  鼠标移入高亮状态
                label: {
                  show: true
                },
                areaColor: '#ccb213'
              },
            },
            aspectScale: 1, //用于 scale 地图的长宽比
            zoom: 1,
            top: '60',
            data: data
          }],

        }
        myMap.clear()
        myMap.setOption(option)
      },
    }
  }
</script>