import React,{Component} from 'react';
import {Card} from 'antd';
import ReactEcharts from 'echarts-for-react';
// import  {LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import {ajaxUtil} from '../../util/AjaxUtils';
// Tooltip, Legend
class AuditChart extends Component{
  constructor(props){
    super(props);
    this.state={
      data:[],
      option:{
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['稽核次数','稽核业务量']
            },
            xAxis: {
               type: 'category',
               data: []
              },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                name:'稽核次数',
                type: 'line'
            },{
                data: [],
                name:'稽核业务量',
                type: 'line'
            }]
      }
    }
  }
  componentDidMount(){
    ajaxUtil("urlencoded","audit-stat!getAuditSumLineChart.action","",this,(data,that) => {
      let chartList=data.data;
      let xdata=[];
      let y1data=[];
      let y2data=[];
      for (var i = 0; i < chartList.length; i++) {
           xdata.push(chartList[i].name);
           y1data.push(chartList[i].稽核次数);
           y2data.push(chartList[i].稽核业务量);
      }
      let options=this.state.option;
      options.xAxis.data=xdata;
      options.series[0].data=y1data;
      options.series[1].data=y2data;
      this.setState({option:options});
    });
  }
  render(){
    const {data}=this.state;
    return(
      <Card title="总体稽核统计图">
      <ReactEcharts option={this.state.option} />
    {/*  <LineChart width={750} height={250} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis />
     <Tooltip/>
       <Legend />
       <Line type="monotone" dataKey="稽核业务量" stroke="	#00BFFF" activeDot={{r: 8}}/>
       <Line type="monotone" dataKey="稽核次数" stroke="	#FFA500" />
      </LineChart>*/}
       </Card>
    );
  }
}
export default AuditChart;
