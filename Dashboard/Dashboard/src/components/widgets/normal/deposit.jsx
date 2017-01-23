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

    fetchData()
    {
             this.setState(pre=>({data:pre.data+=100}))
    }
   componentWillReceiveProps(nextProps) {
       console.log(nextProps);
      if(nextProps.refresh > this.props.refresh)
      {
          console.log("fetch-data");
          //fech data & update state
         this.fetchData()
      }
   }
   componentDidMount() {
       
       
       console.log("fetch data after mounted")
       this.fetchData()
   }
   
   
    render() {
       
        return <WidgetBox  widgetKey={WidgetKey.normalDeposit} title={LanguageApi.getRes(this.props.langCode,"deposit_today")} widgetName="deposit">
                <span className="number-big">{NumberF.DecFormat(this.props.filter.baseCurrency,this.state.data)}</span>
              </WidgetBox>;
        
    }   
};
