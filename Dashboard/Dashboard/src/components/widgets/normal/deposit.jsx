import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';
import { WidgetKey } from '../../../config';

export default class DepositWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalDeposit,
            TitleKey: "deposit_today",
            WidgetName: "deposit",
            WidgetKey: WidgetKey.normalDeposit,
            defaultCountdown: 120,
            countdownValues: [5, 15, 30, 45]
        });
    }
};
