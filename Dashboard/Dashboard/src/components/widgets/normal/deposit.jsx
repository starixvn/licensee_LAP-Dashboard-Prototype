import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import widgetApi from '../../../Modules/WidgetApi';
import NumberF from '../../../Modules/Number';
import LanguageApi from '../../../Modules/LanguageApi';
import axios from 'axios';
export default class DepositWidget extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            msg:'',
            data:'0.0',
            currency:'USD'
            
        };
       
    }
    updateData(value)
    {
        this.setState({data:value});
    }
    componentDidMount () {
        axios.get('http://licadmin.playthefun.com/spondemo/externalapi/sessionisalive', {
            
             withCredentials: false,
        })
        .then(response => {
            console.log(response.data);
            this.updateData(response.data.Msg);   
        })
        .catch(error=> {
            console.log(error);
        });

    }
    componentWillUnmount() {
        
    }
    
    render() {
       
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,"DepositToday")} widgetName="deposit">
                <span className="number-big">{NumberF.DecFormat(this.state.currency,this.state.data)}</span>
              </WidgetBox>;
        
    }   
};
