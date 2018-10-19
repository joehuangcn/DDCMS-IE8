/** ie8 兼容需要入口写require 不能运用import 
**/
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
require('fetch-ie8');
require('babel-polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
require('./index.html');
require('./index.less');
// import './index.html';
// import './index.less';
// import {LocaleProvider } from 'antd';
// const LocaleProvider=require('antd');
// const enUS=require('antd/lib/locale-provider/en_US');
// import zhCN from 'antd/lib/locale-provider/zh_CN';
// import enUS from 'antd/lib/locale-provider/en_US';
// import moment from 'moment';
// import 'moment/locale/zh-cn';
const App = require('../App');
// import App from '../App';
const registerServiceWorker=require('../registerServiceWorker');
// import registerServiceWorker from '../registerServiceWorker';

// moment.locale('zh-cn');
 // window.Promise = Promise;
// ReactDOM.render(<LocaleProvider locale={enUS}><App /></LocaleProvider>, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker;