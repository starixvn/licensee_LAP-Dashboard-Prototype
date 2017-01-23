import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class LicenseeWinLoss extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,"licensee_winloss_month_todate")} widgetName="licenseewl default">
                Licensee Win Loss Content
                <div className="footer-total">
                    <span>Total turnover: $1,222,919.56</span>
                </div>
            </WidgetBox>
            ;
    }
};