import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';
import { WidgetKey } from '../../../config';

export default class PendingFundsWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalPendingFund,
            TitleKey: "pending_funds",
            WidgetName: "pending-fund",
            WidgetKey: WidgetKey.normalPendingFund,
            defaultCountdown: 45,
            countdownValues: [5, 15, 30, 45]
        });
    }
};