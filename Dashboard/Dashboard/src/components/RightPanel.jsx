import React from 'react';
import ReactDOM from 'react-dom';

export default class RightPanel extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state ={
            isMounted:false,
            isHidden:true
        };
        
    };
    componentDidMount() {
        this.setState({isMounted:true});
    }
    
    componentWillMount() {
        this.setState({isMounted:false});
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

                <div className="widgets-config">

                    <div className="widgets-title">Widgets</div>

                    <form action="#">

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test1" defaultChecked />
                            <label htmlFor="test1">Tunrover by Platform</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test2" />
                            <label htmlFor="test2">Licensee Win Loss</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test3" defaultChecked />
                            <label htmlFor="test3">Registered Customers</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test4" />
                            <label htmlFor="test4">Online Customers</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test5" />
                            <label htmlFor="test5">Sportbook Wallet</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test6" />
                            <label htmlFor="test6">Pending funds</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test7" />
                            <label htmlFor="test7">Deposit (today)</label>
                        </p>

                        <p className="widget-item">
                            <input className="filled-in" type="checkbox" id="test8" />
                            <label htmlFor="test8">Withdraw (today)</label>
                        </p>

                    </form>

                </div>

            </div>
        </div>

    }

};
