import React, {Component}  from 'react';
import { Route } from 'react-router';
import LayoutRoute from './module/LayoutRoute';
import Main from './page/main/Main';
import Business from './page/Business';
const Switchrouter=()=>(
				  <div >
                    <Route path="main" component={Main}/>
                     <Route path="/business" component={Business}/>
                    </div>	
				);
// class Switchrouter extends Component{
// 		render(){
// 			return(
// 				  <div >
//                     <Route path="main" component={Main}/>
//                     <Route path="ok" component={Main}/>
//                     </div>	
// 				);
// 		}
// }
export default Switchrouter;
