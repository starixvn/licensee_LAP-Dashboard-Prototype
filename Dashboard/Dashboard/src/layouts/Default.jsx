/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var RightPanel = require('../components/RightPanel.jsx');

var DefaultLayout = React.createClass({
    render() {
        return (
         <div className="dashboard__container">
            <RightPanel />
             {this.props.children}
         </div>
    );
    }
});

module.exports = DefaultLayout;
