import React,{Component} from "react";
import { Form, Input, Button,Modal,Select,Row,Col,Radio,Tabs,DatePicker,TreeSelect} from 'antd';
import uuid from 'node-uuid';
import Moment from 'moment';
const FormItem = Form.Item;
const Option=Select.Option;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const { TextArea } = Input;

class FormFile extends Component {


 handleRenderTab=(type,formItemLayout,label,name,required,initValue,SourceList,rows,info) =>{
    const {getFieldDecorator} = this.props;
    let renderSome;
    switch (type) {
      case 'input':
              renderSome=<Input placeholder="请输入" />
        break;
        case 'select':
              renderSome= <Select  placeholder="请选择" mode={info} >
                              {SourceList.map(d=> <Option key={d.key} value={d.key}>{d.value}</Option>)}
                          </Select>
          break;
          case 'textarea':
              renderSome= <TextArea placeholder={info}  rows={rows}/>; break;
          case 'radio':
                renderSome=<RadioGroup>
                          {SourceList.map(d=> <Radio key={d.key} value={d.key}>{d.value}</Radio>)}
                    </RadioGroup>;break;
          case 'date':
                renderSome= <DatePicker  placeholder="请选择" style={{width:150}}/>; break;
          case 'none':
                renderSome= <Input style={{display:'none'}} disabled={true}/>; break;
          case 'tree':
                renderSome=<TreeSelect  placeholder='请选择'  allowClear  treeData={SourceList}/>;break;
          case 'treeSelect':
                renderSome=<TreeSelect placeholder='请选择'  allowClear  treeData={SourceList}
                                treeCheckable={true} showCheckedStrategy='SHOW_CHILD' />;break;
      default:break;
    }
    return (
      <FormItem {...formItemLayout } label={label}>
       {getFieldDecorator(name,{
         rules:[{ required:required, message:label+'不能为空',}],
         initialValue:(type==="date"?(initValue?Moment(initValue):Moment()):(initValue===undefined?"":initValue))
       })
       (
         renderSome
      )}
     </FormItem>

   );
  }


render() {
	const {type,formItemLayout,label,name,required,initValue,sourceList,rows,info}=this.props;
	return(
		<div>
			{this.handleRenderTab(type,formItemLayout,label,name,required,initValue,sourceList,rows,info)}	
		</div>
		)
}
}
export default FormFile;