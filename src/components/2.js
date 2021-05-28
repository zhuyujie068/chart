import echarts from 'echarts' // 引入echarts
import resize from '@/components/Charts/mixins/resize'
import '@/assets/citymap/fz.js' // 导入echarts地图js
export default {
    name: 'EchartsMap',
    mixins: [resize],
    data() {
        return {
            chart: null,
            options: {},
        }
    },
    created() {
        this.options = {
            title: {
                text: '各区域摄像头分布情况',
                subtext: '',
                padding: [15, 15],
                textStyle: {
                    fontFamily: '宋体',
                    fontSize: 16,
                    fontWeight: 'normal',
                    color: '#fff'
                }
            },
            series: [
                {
                    map: '福州',
                    type: 'map',
                    aspectScale: 0.9,
                    roam: false,

                    label: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 12,
                        }
                    },

                    itemStyle: {
                        normal: {
                            borderColor: '#0AAEB0', // 图形的描边颜色 #0AAEB0
                            borderWidth: 1, // 描边线宽。
                            borderType: 'solid', // 柱条的描边类型。
                            areaColor: '#233F53', // 图形的颜色 #233F53
                            shadowBlur: 5, // 图形阴影的模糊大小。
                            shadowColor: '#233F53', // 阴影色 #233F53
                            shadowOffsetX: 5, // X轴阴影
                            shadowOffsetY: 5, // Y轴阴影

                            label: {
                                show: false, // 显示区域名称
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 12,
                                },
                            }
                        },
                        // 鼠标移入时
                        emphasis: {
                            borderColor: '#2378f7', // 图形的描边颜色 #2378f7
                            borderWidth: '1',
                            areaColor: '#233F53', // 阴影色 #233F53
                            label: {
                                show: false,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 14,
                                }
                            }
                        },

                        effect: {
                            show: true,
                            shadowBlur: 10,
                            loop: true,
                        }
                    },

                    markPoint: {
                        symbol: 'image://' + require('../../../assets/newui/leaf-blue.png'),// 自定义图片路径
                        symbolSize: [28, 49], // 图片大小
                        label: {
                            position: 'top',
                            color: '#fff'
                        },
                        // coord数组存放地址坐标
                        data: [
                            { name: '闽侯县', coord: [119.203478, 26.063571], value: '78' },
                            { name: '仓山区', coord: [119.254358, 26.044616], value: '92' },
                            { name: '晋安区', coord: [119.332546, 26.089014], value: '21' },
                            { name: '连江县', coord: [119.572573, 26.201361], value: '37' },
                            { name: '长乐区', coord: [119.533479, 25.968762], value: '50' },
                        ]
                    }
                }
            ]
        };
    },
    mounted() {
        this.chart = echarts.init(this.$refs.mapBox)
        this.chart.setOption(this.options)
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    }
}
