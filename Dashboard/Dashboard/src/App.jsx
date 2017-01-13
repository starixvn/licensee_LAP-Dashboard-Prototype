/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Layout = require('./layouts/Default.jsx');
// Export React so the dev tools can find it
(window !== window.top ? window.top : window).React = React;

React.renderComponent(
 <Layout />
 ,
  document.body
);
