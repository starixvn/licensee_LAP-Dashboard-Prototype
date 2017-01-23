import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class Turnover extends React.Component {

    constructor(props) {
        super(props);

    }
     componentWillReceiveProps(nextProps) {
      if(nextProps.refresh > this.props.refresh)
      {
          console.log("fetch-data - turnover");
          //fech data & update state
       
      }
   }
   componentDidMo
    componentDidMount () {
        console.log("fetch-data after mounted - turnover")
    }
    
    render() {
        return <WidgetBox title="Turnover by Platform (month to date)" widgetName="turnover default">
                Turnover Content
                <div className="footer-total">
                    <span>Total turnover: $1,222,919.56</span>
                </div>
            </WidgetBox>
            ;
    }
};