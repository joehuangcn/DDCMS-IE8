import React, {PropTypes,Component} from 'react';
import './App.css';
import { Router, Route, IndexRoute, Link, IndexRedirect,browserHistory} from 'react-router';
import LayoutRoute from './module/LayoutRoute';
import LoginForm from './module/login/LoginForm';
import {ajaxUtil} from './util/AjaxUtils';
import {AppRoot} from './AppRoot';
import Main from "./page/main/Main";
import Switchrouter from './Switches';
class App extends Component {
    constructor(props) {
        super(props);
        this.state={};
        global.isAuthenticated = false;
    }

     validate({params}, replace){
       console.log("---1111---");
       if (global.isAuthenticated) {
        // replace('/login');
       }else{
          ajaxUtil("json", "person!isLogin.action", {}, this, (data, that) => {
            console.log("global is ---",global);
            global.isAuthenticated = true;
        })
       }
    }

  


    render() {
        return (
            <Router history={browserHistory} ref={(router) => {
                global.router = router;
            }} >
               <Route path="/login" component={LoginForm}/> 
                <Route path="/"  onEnter={this.validate.bind(this)} component={LayoutRoute} >
                    <IndexRedirect to="main" />
                        {Switchrouter()}
                    </Route>
            </Router>
        );
    }
}


 // { <Route path="/" onEnter={this.validate()}>
 //                  <IndexRedirect to="home"/> 
 //                    <Route component={LayoutRoute}>  
 //                      <Route path="home" component={LayoutRoute}/>
 //                       <Route path="check" component={LayoutRoute}/>
 //                    </Route>
 //                </Route>}

export default App;


