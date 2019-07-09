import React from 'react';
import ReactEcharts from 'echarts-for-react';

const data = ['周一','周二','周三','周四','周五','周六','周日'];
let smileData = localStorage.getItem('smileData');
let fallData = [2.0, 3.0, 2.0, 4.0, 5.0, 1.0, 1.0];
let forbiddenData = localStorage.getItem('forbiddenData');
let invadeData = localStorage.getItem('invadeData');
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

const option = {
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

// const CareEchart = () => (
//     <ReactEcharts
//         option={option}
//         style={{height: '212px', width: '100%'}}
//         className={'react_for_echarts'}
//     />
// );

class CustomChart extends React.Component{
    state = {
        trigger : true,
        date : new Date()
    }

    componentWillUpdate(){
        console.log("Component did update");
        setTimeout(this.triggerChange,1000);
    }

    // componentDidMount(){
    //     setTimeout(this.triggerChange,1000);
    //     console.log("CareEchart did mount");
    // }


    triggerChange = () => {
        const newTrigger = !this.state.trigger;
        this.setState({trigger:newTrigger});
        this.setState({date:new Date()})
    }

    render(){
        return(
            <div>
                <p>{String(this.state.date)}</p>
                <ReactEcharts
                    option={option}
                    style={{height: '212px', width: '100%'}}
                    className={'react_for_echarts'}
                />
            </div>
        );
    }
}

export default CustomChart;