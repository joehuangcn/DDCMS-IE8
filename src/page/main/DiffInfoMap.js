import React,{Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import {Select,Form,Button,Icon} from 'antd';
import { Row, Col } from 'antd';
import {ajaxUtil} from '../../util/AjaxUtils';
import "echarts/map/js/province/liaoning.js";
const FormItem=Form.Item;
const Option = Select.Option;

class DiffInfoMap extends Component {
 constructor(props){
   super(props);
   this.state={
     obtainDateList:[],
     diffCodeList:[],
     netCodeList:[],
     obtainDate:'',
     diffCode:'',
     netCode:'',
     option:{
       title : {
         text: '',
         x:'center'
     },
     tooltip : {
         trigger: 'item',
         formatter:function(params){
           if (params.data.sameRate!==undefined) {
             return params.name+"<br/>差异量 :"+params.value+" 整体一致率："+params.data.sameRate+"%";
           }

         }
     },
     visualMap: {
                min: 0,
                max: 0,
                left: 'left',
                top: 'bottom',
                text: ['高','低'],           // 文本，默认为数值文本
                calculable: true,
                color: ['orangered','yellow','lightskyblue']
      },
     series : [
         {
             name: '',
             type: 'map',
             mapType : '辽宁',
             roam:false,
             label:{
               normal:{show:true},
               emphasis:{show:true}
             },
             data:[
                        {name: '沈阳市',value: 20 ,sameRate:15},
                        {name: '大连市',value:30 ,sameRate:20},
                        {name: '鞍山市',value:40 ,sameRate:30},
                        {name: '抚顺市',value: 50 ,sameRate:45},
                        {name:'本溪市',value:60 ,sameRate:23},
                        {name:'丹东市',value:80 ,sameRate:56},
                        {name:'锦州市',value:20 ,sameRate:30},
                        {name:'营口市',value:30 ,sameRate:40},
                        {name:'阜新市',value:100,sameRate:50},
                        {name:'辽阳市',value:23, sameRate:78},
                        {name:'盘锦市',value:45 ,sameRate:32},
                        {name:'铁岭市',value:67,sameRate:20},
                        {name:'朝阳市',value:29,sameRate:20},
                        {name:'葫芦岛市',value:13,sameRate:67}
             ],
             itemStyle: {
                 emphasis: {
                     shadowBlur: 10,
                     shadowOffsetX: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                 }
             }
         }
     ]
     }
   }
 }

componentWillMount(){
  // this.getHead();
}
 componentDidMount(){
   // this.fetch();
 }


  render(){
    return(
      <div>
      <ReactEcharts option={this.state.option} style={{height: '700px', width: '100%'}} className={'react_for_echarts'} />
      </div>
    );
  }
}
export default DiffInfoMap;
