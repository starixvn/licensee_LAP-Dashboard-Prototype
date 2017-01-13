/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var WidgetBox = React.createClass({
    render() {
        return (
            <div>
              <div className="header">
                {this.props.title}
              </div>
                <div className="content">
                   {this.props.children}
                </div>
          </div>
        );
    }
});

module.exports = WidgetBox;
