import ReactEcharts from "echarts-for-react";
import React from "react";
import getChartData from "./getChartData";

const UpdateOption = () => {
    getChartData();
    const data = ['周一','周二','周三','周四','周五','周六','周日'];
    let smileData = String(localStorage.getItem('smileData')).split(',');
    let fallData = String(localStorage.getItem('fallData')).split(',');
    let forbiddenData = String(localStorage.getItem('forbiddenData')).split(',');
    let invadeData = String(localStorage.getItem('invadeData')).split(',');
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
    const option =  {
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
                data : data
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
    return option
}

export default UpdateOption;