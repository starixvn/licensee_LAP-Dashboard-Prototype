import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import widgetApi from '../../../Modules/WidgetApi';
import NumberF from '../../../Modules/Number';
import LanguageApi from '../../../Modules/LanguageApi';

import {WidgetKey} from '../../../config';
export default class DepositWidget extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            data:100
        }
       
    }
   componentWillReceiveProps(nextProps) {
      if(nextProps.refresh)
      {
          
          //fech data & update state
          this.setState(pre=>({data:pre.data+=100}))
      }
   }
   
   
    render() {
       
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,WidgetKey.normalDeposit)} widgetName="deposit">
                <span className="number-big">{NumberF.DecFormat(this.props.filter.baseCurrency,this.state.data)}</span>
              </WidgetBox>;
        
    }   
};
