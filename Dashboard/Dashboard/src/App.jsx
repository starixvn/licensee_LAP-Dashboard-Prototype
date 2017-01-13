/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Layout = require('./layouts/Default.jsx');
// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

React.renderComponent(
    <div className="dashboard__container">
        <Layout />
    </div>
 ,
  document.body
);
