import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
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
        return <WidgetBox  widgetKey={WidgetKey.chartTurnover} title={LanguageApi.getRes(this.props.langCode,"sportsbook_turnover_month_todate")} widgetName="turnover default">
                Turnover Content
                <div className="footer-total">
                    <span>Total turnover: $1,222,919.56</span>
                </div>
            </WidgetBox>
            ;
    }
};