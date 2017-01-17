import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class Turnover extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title="Turnover by Platform (month to date)" widgetName="turnover default">
                Turnover Content
            </WidgetBox>
            ;
    }
};