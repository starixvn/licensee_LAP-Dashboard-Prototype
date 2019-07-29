import BaseNormalWidget from '../base-normal-widget/BaseNormalWidget';
import { widgetKey, widgetApiUrl } from '../../../../modules/constants';

export default class Deposit extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: widgetApiUrl.NormalDeposit,
            TitleKey: "deposit_today",
            WidgetName: "deposit",
            WidgetKey: widgetKey.NormalDeposit,
            defaultCountdown: 75,
            countdownValues: [15, 30, 45, 60, 75]
        });
    }
};
