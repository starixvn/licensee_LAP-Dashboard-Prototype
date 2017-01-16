import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class PendingFundsWidget extends React.Component{
  
    constructor(props) {
        super(props);
      
    }
    render() {
        return <WidgetBox title="Pending Funds" widgetName="pending-fund">
                $1000050K
            </WidgetBox>
        ;
}
};
