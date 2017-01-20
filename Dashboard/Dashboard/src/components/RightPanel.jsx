import React from 'react';
import ReactDOM from 'react-dom';
import LanguageApi from '../Modules/LanguageApi';
export default class RightPanel extends React.Component {
    
    constructor(props)
    {
        super(props);
        
        var _tempWgs={};
        props.wgs.map((x)=>{ _tempWgs[x.key]=x.enable;  })
        this.state ={
          
            isMounted:false,
            isHidden:true,
            filter:{SelectedBaseCurrency:'EUR',
            SelectedCurrency:'USD',
            BaseCurrency:[{}],
            Currency:[{}]
            },
             wgs:_tempWgs
            };
        
        
    };
    
   
    componentDidMount() {
        this.setState({isMounted:true});
      
    }
    
    componentWillUnmount() {
        this.setState({isMounted:false});
    }
    applyAction()
    {

        if(this.state.isMounted)
        {
          return this.props.callbackParent({action:'apply', filter:this.state.filter,isRefresh:true});
        }
    }
    onCheckWg(key)
    {
        if(this.state.isMounted)
        {
             var temp = this.state.wgs;
             temp[key]=!temp[key];
            this.setState({wgs:temp})
            return this.props.callbackParent({action:'wgFilter', key:key,enable:this.state.wgs[key]});
        }
    }
    togglePanel()
    {
        if(this.state.isMounted)
        {
         this.setState(prevState => ({
      isHidden: !prevState.isHidden
        }));
        }
    };
    render() {
         const isHidden = this.state.isHidden;
        return <div className={isHidden?'dashboard__right-panel':'dashboard__right-panel is-expanded'} >
            <div className="right-panel-wrap">

                <span onClick={(e) => this.togglePanel(e)} className="icon-quickaccess js-icon-quickaccess">
                    <i className="icon-settings"></i>
                </span> 
                <div className="right-panel-content">
                          
                <div className="currency">
                    <label className="currency-label">Currency</label>
                    <select>
                        <option value="1">All</option>
                        <option value="2">EUR</option>
                        <option value="3">Mercedes</option>
                        <option value="4">Audi</option>
                    </select>
                </div>

                <div className="currency">
                    <label className="currency-label">Based</label>
                    <select>
                        <option value="1">EUR</option>
                        <option value="2">EUR</option>
                        <option value="3">Mercedes</option>
                        <option value="4">Audi</option>
                    </select>
                </div>

                <a className="btn-submit" onClick={(e) => this.applyAction(e)} href="#">Apply</a>

                <div className="widgets-config">

                    <div className="widgets-title">Widgets</div>
                     
                       {
                           this.props.wgs.map(item=>
                           {
                                return <p key={item.key} className="widget-item">
                                <input onChange={(e)=>this.onCheckWg(item.key)}  checked={this.state.wgs[item.key]}  className="filled-in" type="checkbox" id={item.key}   />
                                <label htmlFor={item.key}>{LanguageApi.getRes(this.props.langCode,item.key)}</label>
                               </p>
                           })
                       }

                        
                     
                </div> 
            </div>
        </div>
    </div>
    }

};
