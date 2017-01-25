import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberF from '../../../Modules/Number';
import LanguageApi from '../../../Modules/LanguageApi';
import { WidgetApiUrl } from '../../../config'

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
        var param = {
            Url: WidgetApiUrl.normalDeposit,
            IsCrossSite: true
        };
        WidgetApi.fetchData(param)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }
   componentWillReceiveProps(nextProps) {
       console.log(nextProps);
      if(nextProps.refresh > this.props.refresh)
      {
        
         this.fetchData()
      }
   }
   componentDidMount() {
       
       this.fetchData()
   }
   
   
    render() {
       
        return <WidgetBox  widgetKey={WidgetKey.normalDeposit} title={LanguageApi.getRes(this.props.langCode,"deposit_today")} widgetName="deposit">
                <span className="number-big">{NumberF.DecFormat(this.props.filter.baseCurrency,this.state.data.Value)}</span>
              </WidgetBox>;
        
    }   
};
