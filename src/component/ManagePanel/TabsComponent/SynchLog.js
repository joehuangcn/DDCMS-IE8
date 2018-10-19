import React,{Component} from 'react'
import { Table,Tabs, Button,Icon,Select,DatePicker,message ,Form,Dropdown,Menu,Checkbox} from 'antd';
import { Row, Col } from 'antd';
import { Modal } from 'antd';
import {ajaxUtil} from '../../../util/AjaxUtils';
const FormItem=Form.Item;
const confirm=Modal.confirm;
class SynchLog extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      loading: false,
      city:'',
      startDate:'',
      endDate:'',
      columns:[],
      pagination:{},
      selectedRowKeys:[],
      selectedDiff:[],
      abletodown:false,
      config:props.config,
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = {...this.state.pagination};
    pager.current=pagination.current;
    this.setState({
      pagination:pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }

  componentWillMount(){
    this.getDynColumnHead();
  }
  componentDidMount(){
    this.fetch();
  }

  componentWillReceiveProps(props){
    if (props.config.bizCode!== this.state.config.bizCode) {
      this.setState({config:props.config});
      this.handleReset();
    }
  }

  getDynColumnHead =() =>{
    const columns =[
      {title: '业务名称',dataIndex: 'bizName', key: 'bizName',width:150},
      { title: '操作者工号',dataIndex: 'opter',key: 'opter',width:100},
      {title: '稽核日期',dataIndex: 'auditDate',key: 'auditDate',width:150},
      { title: '上传日期',dataIndex: 'synDate', key: 'synDate',width:150},
      { title: '反馈日期', dataIndex: 'retDate',key: 'retDate',width:150},
      { title: '业务代码', dataIndex:'bizCode',key: 'bizCode',width:100},
      { title: '差异类型', dataIndex: 'diffCode',  key: 'diffCode',width:100},
      { title: '差异名称', dataIndex: 'diffName',key: 'diffName',width:150},
      { title: '处理平台', dataIndex: 'synFlat', key: 'synFlat',width:100},
      {title: '差异总量', dataIndex: 'diffTotal', key: 'diffTotal',width:100},
      {title: '差异处理成功量',dataIndex: 'synSuccessNum',  key: 'synSuccessNum',width:100,render:(text,record,index) =>(this.renderDow(text,record,index))},
      {title: '差异处理失败量',dataIndex: 'failNum',  key: 'failNum',width:100,render:(text,record,index) =>(this.renderDowFail(text,record,index))},
      { title: '处理总量', dataIndex: 'synTotal', key: 'synTotal',width:100},
      {title: '处理结果', dataIndex: 'synResult',key: 'synResult',width:100},
      {title: '处理信息',dataIndex: 'synInfo',key: 'synInfo',width:150}
    ];
    this.setState({columns});
  }
//successNum failNum
  renderDow =(text,record,index) =>{
    const {permission}=this.props;
    let value=record.synId+"-successNum-"+record.diffCode+"|"+record.auditDate;
    value=encodeURI(value);
    const {selectedDiff}=this.state;
    let havePerm=(selectedDiff.indexOf(value)===-1?false:true);
    if (text===''||text==='0') {
      return text;
    }else{
      return <Checkbox onChange={this.onCheckChange} value={value} checked={havePerm}>{text}<Icon type="download" /></Checkbox>
    }
    // }else if (havePerm===true||abletodown===true) {
    //   return <Checkbox onChange={this.onCheckChange} value={value}>{text}<Icon type="download" /></Checkbox>
    // }else {
    //   return text;
    // }
  }
  renderDowFail=(text,record,index) =>{
    const {permission}=this.props;
    let value=record.synId+"-failNum-"+record.diffCode+"|"+record.auditDate;
    value=encodeURI(value);
    const {selectedDiff}=this.state;
    let havePerm=(selectedDiff.indexOf(value)===-1?false:true);
    if (text===''||text==='0') {
      return text;
    }else{
     return <Checkbox onChange={this.onCheckChange} value={value} checked={havePerm}>{text}<Icon type="download" style={{color:'blue'}}/></Checkbox>
    }
    // }else if (havePerm===true||abletodown===true) {
    //   return <Checkbox onChange={this.onCheckChange} value={value}>{text}<Icon type="download" style={{color:'blue'}}/></Checkbox>
    // }else {
    //   return text;
    // }
  }


  UrlSearchDiff =(url) =>{
     let name,value;
     let num=url.indexOf("?")
     url=url.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
     let arr=url.split("&"); //各个参数放到数组里
     let object=new Map();
     for(let i=0;i < arr.length;i++){
         num=arr[i].indexOf("=");
         if(num>0){
             name=arr[i].substring(0,num);
             value=arr[i].substr(num+1);
            object[name]=value;
         }
     }
     return object;
}

handelRequestDownload=()=>{
  const {selectedDiff}=this.state;
  const {config} = this.props;
  if (selectedDiff.length<=0) {
      message.warning("请勾选需要下载的数据");
  }else{
   let text="diffList="+selectedDiff+"&bizCode="+config.bizCode;
  ajaxUtil("urlencoded","download-apply-info!get4aInfo.action",text,this,(data,that)=>{
      if (data.success==="true") {
        // http://10.67.12.11:9090/vaultgoto4a/valustgoto/valultmain.do?appCode=147000&operCode=14101&subLoginName=admin&&soNbr=2018012316150674217
   let url=data.message;
 let li1=url.split("?");
 let uri=li1[0];
 let urlSearch=this.UrlSearchDiff(url);
 let obj={"url":uri,"appCode":urlSearch.appCode,"operCode":urlSearch.operCode,"subLoginName":urlSearch.subLoginName,"soNbr":urlSearch.soNbr};
 var userAgent=navigator.userAgent;
 var isChrome = userAgent.indexOf("Chrome") > -1;
 var ret=null;
  if (!isChrome) {
      ret =window.showModalDialog("/DDCMS/pagejs/DataAudit/AAAA.jsp",obj,"center=yes;dialogWidth=800px;dialogHeight=600px") ;
  }  else{
     ret =window.open("/DDCMS/pagejs/DataAudit/AAAA.jsp",obj,"center=yes;dialogWidth=800px;dialogHeight=600px") ;
  }
    if(ret==null){
        message.error("获取4A申请地址出错.");
      }else{
      var rets=ret.split("|");
      if("0"==rets[0]){
        message.info("申请下载权限成功");
        this.showApplyConfirm();
      }
    }
      }else{
        message.error("获取4A申请地址出错.");
      }
  });
}

}

 showApplyConfirm=()=>{
  const that=this;
  confirm({
    title: '立即下载勾选的差异?',
    content: '',
    okText: '是',
    okType: 'primary',
    cancelText: '否',
    onOk() {
      that.handleDownloadDiffDetail();
    },
    onCancel() {
      that.setState({selectedDiff:[]},()=>{that.fetch()});
    },
  });
}

 //选择处理,选中则加入进去
  onCheckChange=(e) =>{
    let changeDiff= this.state.selectedDiff;
    if (e.target.checked) {
        changeDiff.push(e.target.value);
    }else{
      changeDiff.splice(changeDiff.indexOf(e.target.value),1);
    }

    this.setState({selectedDiff:changeDiff});
  }

  reflash=() => {
    this.fetch();
  }


  exportMes=(e)=>{
     const {config} = this.props;
     let synId='';
     let downflag='';
     let text="startDate="+this.state.startDate
     +"&endDate="+this.state.endDate
     +"&cityCode="+this.state.city
     +"&bizCodeParam="+config.bizCode
     +"&auditType="+config.auditType
     +"&dataScope="+config.dataScope
     +"&dataType="+config.dataType
    //  +"&sort="+config.sort
    //  +"&dir="+config.dir
     if (e.key==='1') {
       if (this.state.selectedRowKeys.length<=0) {
          message.warning("请选择需要导出的列");
       }else{
         text+="&downflag=select&synId="+this.state.selectedRowKeys;
        //  this.help(text);
         window.location.href="/DDCMS/syn-log!downloadSynlogList.action?"+text;
       }
     }else if (e.key==='2') {
        text+="&downflag=all&synId=";
        // this.help(text);
        window.location.href="/DDCMS/syn-log!downloadSynlogList.action?"+text;
     }
  }

  fetch = (params = {}) => {
     this.setState({loading:true});
     let page=0;
     if (params.page>1) {
       page=(params.page-1)*10;
     }
     let sort='synDate';
     if (typeof(params.sortField) !== "undefined" ) {
       sort=params.sortField;
     }
     let dir='DESC';
     if (typeof(params.sortOrder) !== "undefined" ) {
       dir=(params.sortOrder=="descend"?"desc":"asc");
     }
     const {config} = this.props;
     const text="startDate="+this.state.startDate
     +"&endDate="+this.state.endDate
     +"&cityCode="+this.state.city
     +"&bizCodeParam="+config.bizCode
     +"&auditType="+config.auditType
     +"&dataScope="+config.dataScope
     +"&dataType="+config.dataType
     +"&sort="+sort
     +"&dir="+dir
     +"&start="+page+"&limit=10";
     ajaxUtil("urlencoded","syn-log!getSynLogJsonList.action",text,this,(data,that)  => {
       const pagination = that.state.pagination;
       pagination.total = parseInt(data.totalProperty,10);
       this.setState({
           loading: false,
           data: data.root,
           pagination,
           selectedDiff:[],
           selectedRowKeys:[],
       });
     });
   }

   handleReset = () => {
    this.form.resetFields();
    this.setState({startDate:'',endDate:''},()=>{this.fetch()});
  }

  handleSearch=(e) => {
    const form= this.form;
    form.validateFields(( err, values) => {
      if (err) {
        return;
      }

      let startDate=values.startDate===undefined||values.startDate==null?'':values.startDate.format('YYYY-MM-DD');
      let endDate=values.endDate===undefined||values.endDate==null?'':values.endDate.format('YYYY-MM-DD');
      this.setState({startDate,endDate},()=>{this.fetch()});
   })
}

   showModal = () =>{
     this.formModal.show();
   }

   onSelectChange = (selectedRowKeys) => {
  this.setState({ selectedRowKeys });
  }

  handleDownloadDiffDetail=()=>{
    const {selectedDiff}=this.state;
    const {config} = this.props;
    if (selectedDiff.length<=0) {
        message.warning("请勾选需要下载的数据");
    }else{
      message.info("正在下载,请稍后!!!!!");
       let text="diffList="+selectedDiff+"&bizCode="+config.bizCode;
      // window.location.href="/DDCMS/syn-log!downloadDiffDetail.action?diffList="+selectedDiff;
      window.location.href="/DDCMS/syn-log!downloadAllSelectedDiff.action?"+text;
    }
  }

  render() {
    const {selectedRowKeys,columns}=this.state;
    const rowSelection = {
     selectedRowKeys,
     onChange: this.onSelectChange,
   };
    return(
    <div className="table-colums" style={{heigth:'100%'}} >
      <SearchBut ref={(ref) => this.form = ref} handleSearch={this.handleSearch} handleReset={this.handleReset}
     handleDownloadDiffDetail={this.handleDownloadDiffDetail}  handelRequestDownload={this.handelRequestDownload} exportMes={e =>this.exportMes(e)}
     permission={this.props.permission}/>
      <Table rowKey='synId' rowClassName={(record, index) =>{}} rowSelection={rowSelection} columns={columns}  loading={this.state.loading}
      dataSource={this.state.data} pagination={this.state.pagination} onChange={this.handleTableChange} scroll={{x:'120%',y:'120%'}} size="middle"/>
    </div>)
  }
}

class StatSearch extends Component {

  renderDownMenu=()=>{
    return(
      <Menu onClick={this.props.export}>
        <Menu.Item key="1">导出选中</Menu.Item>
        <Menu.Item key="2">导出本页</Menu.Item>
        <Menu.Item key="3">导出全部</Menu.Item>
      </Menu>
    );
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {permission}=this.props;
    let havePerm=(permission.data.indexOf('synlogDownload')===-1?'none':'inline');
    let applyPerm=(permission.data.indexOf('synlogDownload')===-1?'inline':'none');
   const formItemLayout = {
     labelCol: { span: 10 },
     wrapperCol: { span: 14 },
   };
   const menu = (
      <Menu onClick={this.props.exportMes}>
        <Menu.Item key="1">导出选中</Menu.Item>
        <Menu.Item key="2">导出全部</Menu.Item>
      </Menu>
      );
   return(
    <Form layout="inline"  >
       <Row gutter={24}>
        <Col span={5}>
         <FormItem {...formItemLayout} label="开始时间" >
           {getFieldDecorator("startDate")(
               <DatePicker className='1111' placeholder="开始时间" style={{width:150}}/>
           )}
         </FormItem>
         </Col>
         <Col span={5} >
          <FormItem {...formItemLayout} label="结束时间">
            {getFieldDecorator("endDate")(
                <DatePicker  placeholder="结束时间" style={{width:150}}/>
            )}
          </FormItem>
          </Col>
         <Col span={10} style={{ textAlign: 'right' }} >
           <Button type="primary" onClick={this.props.handleSearch}>查询</Button>
           <Button style={{ marginLeft: 8 }} onClick={this.props.handleReset}> 重置</Button>
           <Dropdown overlay={menu} style={{ marginLeft: 16 }}>
              <Button>
                <Icon type="file-excel" />导出<Icon type="down" />
              </Button>
            </Dropdown>
          <Button style={{ marginLeft: 24, display:applyPerm}} onClick={this.props.handelRequestDownload}> 下载申请</Button>
        <Button style={{ marginLeft: 8, display:havePerm }} onClick={this.props.handleDownloadDiffDetail}> 下载差异</Button>
         </Col>
       </Row>
     </Form>
   );
  }
}
const SearchBut =Form.create()(StatSearch);

export default SynchLog;


class CreateNew extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }

show = () => {
  this.setState({visible:true});
}
  handleOk = (e) => {
    this.setState({visible:false});
  }

handleCancel = (e) => {
  this.setState({visible:false});
}
  render () {
    const { visible }= this.state;
    return (
      <div>
        <Modal visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
        </Modal>
      </div>
    )
  }
}
