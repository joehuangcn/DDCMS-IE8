import React, {Component} from 'react'
import {Menu, Icon} from 'antd';
import {Link,browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {ajaxUtil } from '../util/AjaxUtils.js';
import "./silderMenu.css";
const SubMenu = Menu.SubMenu;

class SiderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu:[],
            selectedKeys:'',
            mode: 'inline',
        };
       this.busData={}; 
    }

    componentWillMount(){
     this.getMenuList();
    }

    componentWillReceiveProps(props){
      // 因为需要根据传递key 来更新左侧选择的高亮,所以直接在这里面获取传递进来的location.
    const {mode}=props;
    // if (props.location.pathname==='/business') {
    //   this.setState({selectedKeys:props.location.state.id});
    // }else {
    //   this.setState({selectedKeys:props.location.pathname});
    // }
    if (props.location.state!==undefined) {
      if (props.location.state===null) {
        this.setState({selectedKeys:"/main"});  
      }else{
        this.setState({selectedKeys:props.location.state.id});
      }
    }else {
      let id=this.findMemuTree(this.state.menu,props.location.pathname);
      if (id!=='') {
        this.setState({selectedKeys:id});
      }else{
        this.setState({selectedKeys:props.location.pathname});
      }
    }

    this.setState({mode});
    }

    getMenuList() {

      ajaxUtil("urlencoded","module!getLeftMenu.action","parentCode=0&statu=1",this,(data,that) => {

        this.setState({menu:data});
      });
    }

    findMemuTree=(data,name) => {
      let id='';
      for (var i = 0; i < data.length; i++) {
            let item =data[i];
      // }
      // for (let item of data) {
        if (item.router===name) {
          id=item.id;
          break;
        }
        if (item.child) {
          id=this.findMemuTree(item.child,name);
        }
        if (id!=="") {
          break;
        }
      }
        return id;
  }

    renderMemuTree=(data) => {
      return data.map((item) => {
        let routerpointName=item.router===''?'/NotFound':item.router;
        let routerpoint;
        // routerpoint=(routerpointName==='/business'?{pathname:routerpointName,state:item}:routerpointName);
        // console.log("renderMu "+JSON.stringify(item))
         routerpoint={pathname:routerpointName,state:JSON.stringify(item)};
        if (item.child) {
          return (
            <SubMenu key={item.id} title={<span><Icon type="mail"/><span>{item.name}</span></span>}>
               {this.renderMemuTree(item.child)}</SubMenu>
           );
        }
        this.busData[item.id]=item;
        // return <Menu.Item key={item.id} ><Link to={{...routerpoint}}>{item.name}</Link></Menu.Item>
       return <Menu.Item key={item.id} >{item.name}</Menu.Item>
      }
      )
    }

    // renderMemu=(data)=>{
    //   data.map((item)=>{
    //         if (item.child) {

    //         }
    //     )
    //   }
    // }

onClick=({ item, key, keyPath })=>{
  console.log(item,key);
  let items=this.busData[key];
  console.log("got item",items);
  if (key!=="/main") {
  let routerpointName=items.router===''?'/NotFound':items.router;
   let routerpoint={pathname:routerpointName,state:items,hash: '#the-hash',search: '?sort=name',query:''};
   const nextLocation = browserHistory.createLocation(routerpoint);
   nextLocation.search="";
   browserHistory.push(nextLocation);

  }
  
    // ReactDOM.unmountComponentAtNode(document.getElementById('ant-layout'));
  // console.log(keyPath);
  // this.setState({selectedKeys:key});
}

    render() {
      const {menu} =this.state;
      let some=this.renderMemuTree(menu);
      let logo_style = {
          zIndex: '01',
          height: '50px',
          paddingLeft: '0px',
          paddingRight: '20px'
      }
        return (
            <div style={{height: '100%'}}>
                <img  alt="logo" src={this.state.mode==='inline'?require('../util/mobileW.png'):require('../util/mobileOnly.png')} style={logo_style}/>
                <div className="selectMenu">
                <Menu theme="dark"
                      mode={this.state.mode}
                      defaultSelectedKeys={['/main']} selectedKeys={[this.state.selectedKeys]} onClick={this.onClick}>
                      <Menu.Item key="/main"><Link to="/main">主页</Link></Menu.Item>
                      {some}
                </Menu>
                </div>
            </div>
        );
    }
}

export default SiderMenu;