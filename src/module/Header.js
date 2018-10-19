import React, {Component}  from 'react'
import {Row,Icon,Col} from 'antd';
import "./Header.less";
import ToolBar from "./ToolBar";

class Header extends Component {
    render() {
        let title_style = {
            fontSize: '25px',
            height: '55px',
            lineHeight: '55px',
            color: '#fff',
            fontFamily: 'sans-serif',
            margin:'0px',
        }

        const {userName} =this.props;
        return (
            <Row style={{background: '#3F3F3F',height:'55px'}} id="rowheader">
              <Col span={18}>
                    <Col span={1}>
                    <Icon
                       className="trigger"
                       type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                       onClick={this.props.onCollapse}
                     />
                     </Col >
                     <Col span={23}>
                        <h2 style={title_style}>辽宁移动数据一致性管理系统</h2>
                     </Col>
             </Col> 
             <Col span={6}>  
                 <ToolBar userName={userName}/>
              </Col>   
            </Row>
        )
    }
}

export default Header;