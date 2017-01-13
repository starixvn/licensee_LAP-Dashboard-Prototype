/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Layout = require('./layouts/Default.jsx');
var PendingFuns = require('./components/widgets/normal/pendingfunds.jsx');
var Deposit = require('./components/widgets/normal/deposit.jsx');
// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

var DashboardApp = React.createClass({
    render() {
        return (
            <Layout>
                <PendingFuns />
                <Deposit />
            </Layout>
        );
    }
});

module.exports = DashboardApp;

React.renderComponent(
        <DashboardApp />
 ,
  document.body
);
