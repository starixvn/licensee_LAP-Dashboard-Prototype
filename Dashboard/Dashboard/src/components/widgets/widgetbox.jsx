import React from 'react';
import ReactDOM from 'react-dom';


export default class WidgetBox extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="widgetbox">
              <div className={`widgetbox-header ${this.props.widgetName}`}>
                <span className="title">
                  {this.props.title}
                </span>

                <span className="icon-wrapper right">
                    <span>-</span>
                    <span>x</span>
                </span>
              </div>
                <div className={`widgetbox-content ${this.props.widgetName}`}>
                  {this.props.children}
                </div>
          </div>
                      ;
              }
              };


