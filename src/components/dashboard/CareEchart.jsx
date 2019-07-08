import React from 'react';
import ReactEcharts from 'echarts-for-react';

const data = ['周一','周二','周三','周四','周五','周六','周日'];
let smileData = localStorage.getItem('smileData');
const fallData = [2.0, 3.0, 2.0, 4.0, 5.0, 1.0, 1.0]
let series = [];
const smileSeries = 
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
    const fallSeries = 
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
series.push(smileSeries);
series.push(fallSeries);

const option = {
    title : {
        text: '老人一周微笑次数',
        subtext: '实时更新'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['微笑次数','跌倒次数']
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

const CareEchart = () => (
    <ReactEcharts
        option={option}
        style={{height: '212px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

export default CareEchart