
import React from 'react';
import ReactDOM from 'react-dom';
import RightPanel from '../components/RightPanel';

export default class DefaultLayout extends React.Component{
    render() 
    {
        return <div className="dashboard__container">
            <RightPanel />
             {this.props.children}
         </div>;
    }
};
