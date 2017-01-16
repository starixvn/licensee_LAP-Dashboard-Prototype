import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Default';
import DepositWB from './components/widgets/normal/deposit';
import PendingWB from './components/widgets/normal/pendingfunds';

export default class DashboardApp extends React.Component {
    render()
    {
        return <Layout>
        <DepositWB />
        <PendingWB />
        </Layout>
    };
};

ReactDOM.render(
        <DashboardApp />
 ,
  document.getElementById("dashboad-app")
);
