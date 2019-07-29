import BaseNormalWidget from '../base-normal-widget/BaseNormalWidget';
import { widgetKey, widgetApiUrl } from '../../../../modules/constants';

export default class PendingFunds extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: widgetApiUrl.NormalPendingFund,
            TitleKey: "pending_funds",
            WidgetName: "pending-fund",
            WidgetKey: widgetKey.NormalPendingFund,
            defaultCountdown: 75,
            countdownValues: [15, 30, 45, 60, 75]
        });
    }
};