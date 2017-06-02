
import React from 'react';
import ReactDOM from 'react-dom';
import RightPanel from '../components/RightPanel';

export default class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="dashboard__container">
            <RightPanel langCode={this.props.langCode} wgs={this.props.initialWgStatus} callbackParent={this.props.callbackParent} />
             {this.props.children}
         </div>;
    }
}
