import Promise from 'core-js/es6/promise';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Default';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import {WidgetKey,Wglayouts} from './config';

import DepositWB from './components/widgets/normal/deposit';
import OnlineCustomer from './components/widgets/normal/onlinecustomer';
import PendingWB from './components/widgets/normal/pendingfunds';
import RegisteredCustomer from './components/widgets/normal/registercustomer';
import SportsbookWallet from './components/widgets/normal/sportsbookwallet';
import Withdrawal from './components/widgets/normal/withdrawal';

import LicenseeWinLoss from './components/widgets/chart/licenseewl';
import Turnover from './components/widgets/chart/turnover';

export default class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
   const _wgStatus=[{key:WidgetKey.chartTurnover,enable:false}];
   const  _wgs= [{key:WidgetKey.chartTurnover,value:React.createElement(Turnover,{})}];
    this.state = {
      langCode:'en',
      refresh:0,
      selectedFilter:
      {
        currency:"ALL",
        baseCurrency:"EUR"
      },
      wgs:DashboardApp.getWgs(_wgStatus,_wgs)
     
    };
    
    this._defaultWgs=_wgs;
    this._defaultWgStatus =_wgStatus;
  }
  
  get defaultWgs()
  {
    return this._defaultWgs;
  }
  get defaultWgStatus ()
 {
   return this._defaultWgStatus;
 }
 get layouts ()
 {
   return Wglayouts;
 }
  static getWgs(statusItems,wgItems)
  {
     var result=[];
     for(var x of wgItems)
     {
     
        var item = statusItems.find(i=>i.key==x.key)
        if(item!=null && item.enable)
        {
          result.push(x);
        }

     }

     return result;
  }
  componentDidMount () {
   //setInterval(()=>{this.setState(pre=>({isRefresh:!pre.isRefresh}))},5000) 
  }
 
  onChildChanged(newState)
  {
  
    if(newState.action=='apply')
    {
       this.setState(pre => ({refresh:pre.refresh+1}))
    }
    else
    {
       var index = this.state.wgs.findIndex(x=>x.key==newState.key);
       var newWgs = this.state.wgs;
       if(newState.enable && index < 0 )
       {
          var item= this.defaultWgs.find(x=>x.key==newState.key);
          console.log(item);
           newWgs.push(item);
         
       }else
       {
        
         newWgs.splice(index,1);
         
       }
        this.setState({wg:newWgs});
    }
   
  }
  
  render() {
  
    return <Layout langCode={this.state.langCode} initialWgStatus={this.defaultWgStatus} callbackParent={(newState) => this.onChildChanged(newState) }>
      <ResponsiveReactGridLayout className="layout" layouts={this.layouts} rowHeight={25}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
      
        {this.state.wgs.map((item)=>
        {
           return <div key={item.key}>{item.value}</div> 
          
       })}

        <div key={WidgetKey.chartLicenseeWL}><LicenseeWinLoss /></div>
        <div key={WidgetKey.normalRegisterCustomer}><RegisteredCustomer /></div>
        <div key={WidgetKey.normalOnlineCustomer}><OnlineCustomer /></div>
        <div key={WidgetKey.normalSportsbookWallet}><SportsbookWallet /></div>
        <div key={WidgetKey.normalPendingFund}><PendingWB /></div>
        <div key={WidgetKey.normalDeposit}><DepositWB filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>
        <div key={WidgetKey.normalWithdrawal}><Withdrawal /></div>
      </ResponsiveReactGridLayout>

    </Layout>
  };
};

ReactDOM.render(
  <DashboardApp />
  ,
  document.getElementById("dashboad-app")
);
