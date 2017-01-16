import React from 'react';
import ReactDOM from 'react-dom';

export default class RightPanel extends React.Component{
    render() {
        return <div className="dashboard__right-panel">
            <span className="icon-quickaccess js-icon-quickaccess">
                <i className="icon-settings"></i>
            </span>

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
                        <input class="filled-in" type="checkbox" id="test1" checked />
                        <label for="test1">Tunrover by Platform</label>
                    </p>

                    <p className="widget-item">
                        <input class="filled-in" type="checkbox" id="test2" />
                        <label for="test2">Licensee Win Loss</label>
                    </p>

                    <p className="widget-item">
                        <input class="filled-in" type="checkbox" id="test3" />
                        <label for="test3">Registered Customers</label>
                    </p>

                    <p className="widget-item">
                        <input type="checkbox" id="test4" />
                        <label for="test4">Online Customers</label>
                    </p>

                    <p className="widget-item">
                        <input type="checkbox" id="test5" />
                        <label for="test5">Sportbook Wallet</label>
                    </p>

                    <p className="widget-item">
                        <input type="checkbox" id="test6" />
                        <label for="test6">Pending funds</label>
                    </p>

                    <p className="widget-item">
                        <input type="checkbox" id="test7" />
                        <label for="test7">Deposit (today)</label>
                    </p>

                    <p className="widget-item">
                        <input type="checkbox" id="test8" />
                        <label for="test8">Withdraw (today)</label>
                    </p>

                </form>

            </div>

          </div>
        
    }
    
};
