import React from 'react';
import ReactDOM from 'react-dom';


export default class WidgetBox extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return <div>
              <div className="header">
                {this.props.title}
              </div>
                <div className="content">
                   {this.props.children}
                </div>
          </div>
        ;
    }
};


