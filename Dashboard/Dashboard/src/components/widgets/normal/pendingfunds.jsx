/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var wbBox = require('../widgetbox.jsx');
var PendingFundsWidget = React.createClass({
    render() {
        return (
            <wbBox title={"Pending Funds"}>
                $250K
            </wbBox>
        );
    }
});

module.exports = PendingFundsWidget;
