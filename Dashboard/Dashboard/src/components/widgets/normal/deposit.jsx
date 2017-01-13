/**
 * @jsx React.DOM
 */


'use strict';

var React = require('react');
var wbBox = require('../widgetbox.jsx');
var DepositWidget = React.createClass({
    render() {
        return (
            <wbBox title={"Deposit (today)"}>
                $1000050K
            </wbBox>
        );
}
});

module.exports = DepositWidget;