import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Default';
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import DepositWB from './components/widgets/normal/deposit';
import PendingWB from './components/widgets/normal/pendingfunds';

export default class DashboardApp extends React.Component {
  constructor(props) {
      super(props);
       this.state = {
        layouts:{
            lg:
           [{i: 'c-turnover', x: 0, y: 0, w: 4, h: 2.5, static: true},
           {i: 'c-licWL', x: 4, y: 0, w: 4, h: 2.5, minW: 2, maxW: 4},
           {i: 'n-reg-customer', x: 0, y: 2.5, w: 4, h: 2},
           {i: 'n-online-customer', x:4 , y: 2.5, w: 4, h: 2},
           {i: 'n-sb-wl', x:0 , y: 5, w: 2, h: 4},
           {i: 'n-pending-funds', x:2 , y: 5, w: 2, h: 1},
           {i: 'n-deposit', x:4 , y: 5, w: 2, h: 1},
          {i: 'n-withdrawal', x:6 , y: 5, w: 2, h: 4}
          ],
           md:
           [{i: 'c-turnover', x: 0, y: 0, w: 4, h: 5, static: true},
           {i: 'c-licWL', x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4},
           {i: 'n-reg-customer', x: 0, y: 5, w: 4, h: 2},
           {i: 'n-online-customer', x:4 , y: 5, w: 4, h: 2},
           {i: 'n-sb-wl', x:0 , y: 15, w: 2, h: 4},
           {i: 'n-pending-funds', x:2 , y: 15, w: 2, h: 4},
           {i: 'n-deposit', x:4 , y: 15, w: 2, h: 4},
          {i: 'n-withdrawal', x:6 , y: 15, w: 2, h: 4}],
            sm:
            [{i: 'c-turnover', x: 0, y: 0, w: 4, h: 5, static: true},
            {i: 'c-licWL', x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4},
            {i: 'n-reg-customer', x: 0, y: 5, w: 4, h: 2},
            {i: 'n-online-customer', x:4 , y: 5, w: 4, h: 2},
            {i: 'n-sb-wl', x:0 , y: 15, w: 2, h: 4},
            {i: 'n-pending-funds', x:2 , y: 15, w: 2, h: 4},
            {i: 'n-deposit', x:4 , y: 15, w: 2, h: 4},
           {i: 'n-withdrawal', x:6 , y: 15, w: 2, h: 4}],
             xs:
             [{i: 'c-turnover', x: 0, y: 0, w: 4, h: 5, static: true},
             {i: 'c-licWL', x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4},
             {i: 'n-reg-customer', x: 0, y: 5, w: 4, h: 2},
             {i: 'n-online-customer', x:4 , y: 5, w: 4, h: 2},
             {i: 'n-sb-wl', x:0 , y: 15, w: 2, h: 4},
             {i: 'n-pending-funds', x:2 , y: 15, w: 2, h: 4},
             {i: 'n-deposit', x:4 , y: 15, w: 2, h: 4},
            {i: 'n-withdrawal', x:6 , y: 15, w: 2, h: 4}],

             xxs:
             [{i: 'c-turnover', x: 0, y: 0, w: 4, h: 5, static: true},
             {i: 'c-licWL', x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4},
             {i: 'n-reg-customer', x: 0, y: 5, w: 4, h: 2},
             {i: 'n-online-customer', x:4 , y: 5, w: 4, h: 2},
             {i: 'n-sb-wl', x:0 , y: 15, w: 2, h: 4},
             {i: 'n-pending-funds', x:2 , y: 15, w: 2, h: 4},
             {i: 'n-deposit', x:4 , y: 15, w: 2, h: 4},
            {i: 'n-withdrawal', x:6 , y: 15, w: 2, h: 4}]

         }
     };
  }
  getDefaultLayout()
  {
    return
  }
    render()
    {

        return <Layout>
        <ResponsiveReactGridLayout className="layout" layouts={this.state.layouts}
         breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
        <div key={"c-turnover"}>1</div>
        <div key={"c-licWL"}>2</div>
        <div key={"n-reg-customer"}>3</div>
        <div key={"n-online-customer"}>4</div>
        <div key={"n-sb-wl"}>5</div>
        <div key={"n-pending-funds"}>6</div>
        <div key={"n-deposit"}><DepositWB/></div>
        <div key={"n-withdrawal"}><PendingWB/></div>
        </ResponsiveReactGridLayout>

        </Layout>
    };
};

ReactDOM.render(
        <DashboardApp />
 ,
  document.getElementById("dashboad-app")
);
