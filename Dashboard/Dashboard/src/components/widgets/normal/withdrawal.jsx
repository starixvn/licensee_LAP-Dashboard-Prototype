import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class Withdrawal extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title="Withdrawal (today)" widgetName="withdrawal">
            $ 500k
            </WidgetBox>
            ;
    }
};