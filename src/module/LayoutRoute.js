import React, {Component} from 'react'
import {Layout,Menu,Icon} from 'antd';
import { Route} from 'react-router';
import Header from './Header'
// import Switches from './Switches'
import SiderMenu from './SiderMenu'
import ToolBar from './ToolBar'
import './LayoutRoute.css'
import {ajaxUtil} from '../util/AjaxUtils.js'
import {config} from '../config'

// const {Content, Footer, Sider} = Layout;
class LayoutRoute extends Component {
   constructor(props) {
        super(props);
        this.state = {
            userName:'',
            collapsed: false,
            mode:"inline",
            message:{}
        };
    }


  componentDidMount(){
    console.log("-----测试登录---")
      ajaxUtil("urlencoded", "person!getAjaxName.action", "", this,(data,that)=>{
          this.setState({
            userName:data.userName
          });
      });
    }

     onCollapse=()=> {
          // mode: collapsed ? 'vertical' : 'inline',
        this.setState({
            collapsed:!this.state.collapsed,
            mode:!this.state.collapsed? 'vertical' : 'inline',
        });
    }

 render() {
    const collapse = this.state.collapsed;
    const {userName} = this.state;
    return (
        <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
          <aside className="ant-layout-sider">
            {/*<div className="ant-layout-logo"></div>*/}
            <SiderMenu location={this.props.location} mode={this.state.mode} />
            <div className="ant-aside-action" onClick={this.onCollapse}>
              {collapse ? <Icon type="right" /> : <Icon type="left" />}
            </div>
          </aside>
        <div className="ant-layout-main">
          <div className="ant-layout-header">
             <Header  onCollapse={this.onCollapse} collapsed={this.state.collapsed} userName={userName}/>
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">        
                {this.props.children}
            </div>
          </div>
          <div className="ant-layout-footer">
         电信科学技术第五研究所 Version:2.0
          </div>
        </div>
      </div>
    );
  }
  // render() {
  //   return (
  //           <Layout  className="layout_main">

  //               <Layout className="layout_cont">
  //                   <Sider
  //                       collapsible  trigger={null}
  //                       collapsed={this.state.collapsed} onCollapse={this.onCollapse}
  //                       style={{ overflow: 'auto'}}
  //                   >
  //                       <div className="logo"/>
  //                       <SiderMenu location={this.props.location} mode={this.state.mode}/>
  //                   </Sider>
  //                   <Layout>
  //                       <Header  onCollapse={this.onCollapse} collapsed={this.state.collapsed} />
  //                       <Content  className="content_main" style={{margin: '0 8px'}}>
  //                           <div
  //                               style={{borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#f0f2f5',paddingBottom:'5px'}}>
  //                              {/* <ToolBar userName={this.state.userName} />*/}
  //                           </div>
  //                           <div  className="content_switch">
  //                            {/*   <Switches />*/}
  //                           </div>
  //                       </Content>
  //                       <Footer style={{textAlign: 'center'}}>
  //                           电信科学技术第五研究所 Version:2.0
  //                       </Footer>
  //                  </Layout>
  //               </Layout>
  //           </Layout>
  //       );
  // }
}

export default LayoutRoute;
