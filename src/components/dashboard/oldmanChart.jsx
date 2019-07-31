import React from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
import getChartData from "../helper/getChartData";


export class PieReact extends React.Component {
    constructor(props) {
        super(props)
        this.setState({play:false})
        this.setPieOption = this.setPieOption.bind(this)
    }

    componentDidMount() {
        // 初始化
        const { smileData,fallData,invadeData,forbiddenData } = this.props //外部传入的data数据
        let myChart = echarts.init(document.getElementById('pieCharts')) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setPieOption(smileData,fallData,invadeData,forbiddenData)
        console.log('options:'+JSON.stringify(options))
        //设置options
        myChart.setOption(options)
        // 绘制图表
}

    // componentDidUpdate() {
    //     // const { smileData,fallData,invadeData,forbiddenData } = this.props //外部传入的data数据
    //     // let myChart = echarts.init(document.getElementById('pieCharts')) //初始化echarts
    //     //
    //     // //我们要定义一个setPieOption函数将data传入option里面
    //     // let options = this.setPieOption(smileData,fallData,invadeData,forbiddenData)
    //     // //设置options
    //     // myChart.setOption(options)
    //     setTimeout(this.triggerChange,10000)
    // }


    triggerChange = () => {
        getChartData();
        const newSmileData= String(localStorage.getItem('smileData')).split(',');
        const newFallData= String(localStorage.getItem('fallData')).split(',');
        const newInvadeData= String(localStorage.getItem('invadeData')).split(',');
        const newForbiddenData= String(localStorage.getItem('forbiddenData')).split(',');
        const options = this.setPieOption(newSmileData,newFallData,newInvadeData,newForbiddenData)
        let myChart = echarts.init(document.getElementById('pieCharts'))
        myChart.setOption(options)
    }



    render() {
        return (
            <div style={{width:"1000px", height:"300px"}} id="pieCharts">
                <div ref="pieReact" style={{width: "100%", height: "100%"}}></div>
            </div>
        );
    }

    setPieOption(smileData,fallData,invadeData,forbiddenData){
        console.log('setPieOpton-invadeData:'+invadeData);
        let series = [];
        let smileSeries =
            {
                name:'微笑次数',
                type:'bar',
                data:smileData,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            };
        let fallSeries =
            {
                name:'跌倒次数',
                type:'bar',
                data:fallData,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            };
        let forbiddenSeries =
            {
                name:'禁区次数',
                type:'bar',
                data:forbiddenData,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            };
        let invadeSeries =
            {
                name:'陌生人次数',
                type:'bar',
                data:invadeData,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            };
        series.push(smileSeries);
        series.push(fallSeries);
        series.push(forbiddenSeries);
        series.push(invadeSeries);
        return {
            title : {
                text: '老人一周微笑次数',
                subtext: '实时更新'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['微笑次数','跌倒次数','禁区次数','陌生人次数']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            //x轴
            xAxis : [
                {
                    type : 'category',
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            // series代表的是同一横轴上的各个竖条
            series : series
        };
    }
}

