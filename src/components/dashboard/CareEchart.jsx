import React from 'react';
import ReactEcharts from 'echarts-for-react';
import getChartData from '../helper/getChartData';
import UpdateOption from '../helper/updateOption';
import OldmanChart from './oldmanChart'
import echarts from 'echarts'

const data = ['周一','周二','周三','周四','周五','周六','周日'];
let smileData = String(localStorage.getItem('smileData')).split(',');
let fallData = String(localStorage.getItem('fallData')).split(',');
let forbiddenData = String(localStorage.getItem('forbiddenData')).split(',');
let invadeData = String(localStorage.getItem('invadeData')).split(',');

let PlayEchart = ({play,option}) =>{
    // if(play){
    //     return(<ReactEcharts
    //         option={option}
    //         style={{height: '212px', width: '100%'}}
    //         className={'react_for_echarts'}
    //     />);
    // }
    // console.log("实际上有在刷新哦");
    return (<ReactEcharts
        option={option}
        style={{height: '212px', width: '100%'}}
        className={'react_for_echarts'}
    />);
}

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

const CareEchart = () => (
    <ReactEcharts
        option={option}
        style={{height: '212px', width: '100%'}}
        className={'react_for_echarts'}
    />
);

class CustomChart extends React.Component{
    state = {
        trigger : true,
        date : new Date(),
        play : true,
        echartOption: option,
    }

    // option =  {
    //     title : {
    //         text: '老人一周微笑次数',
    //         subtext: '实时更新'
    //     },
    //     tooltip : {
    //         trigger: 'axis'
    //     },
    //     legend: {
    //         data:['微笑次数','跌倒次数','禁区次数','陌生人次数']
    //     },
    //     toolbox: {
    //         show : true,
    //         feature : {
    //             mark : {show: true},
    //             dataView : {show: true, readOnly: false},
    //             magicType : {show: true, type: ['line', 'bar']},
    //             restore : {show: true},
    //             saveAsImage : {show: true}
    //         }
    //     },
    //     calculable : true,
    //     //x轴
    //     xAxis : [
    //         {
    //             type : 'category',
    //             data : data
    //         }
    //     ],
    //     yAxis : [
    //         {
    //             type : 'value'
    //         }
    //     ],
    //     // series代表的是同一横轴上的各个竖条
    //     series : series
    // };

    componentWillUpdate(){
        // console.log("Component did update");
        setTimeout(this.triggerChange,10000);
    }




    triggerChange = () => {
        // console.log('play:'+this.state.play);
        getChartData();
        const newTrigger = !this.state.trigger;
        const newOption = UpdateOption();
        this.setState({trigger:newTrigger, play:!this.state.play, date:new Date(), echartOption:newOption});
        // this.setState({date:new Date()})
    }



    render(){
        const getOption=()=>{
            return UpdateOption();
        }
        return(
            <div>
                <div>
                    {/*<p>{String(this.state.date)}</p>*/}
                    {/*<PlayEchart play={this.state.play} option={this.getOption}/>*/}
                    <ReactEcharts
                        // ref={ (e) => { refs.echartsReact = e; }}
                        option={this.state.echartOption}
                        style={{height: '212px', width: '100%'}}
                        className={'react_for_echarts'}
                    />
                    <p>{String(this.state.date)}</p>
                </div>
            </div>
        );
    }
}

export default CustomChart;