import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';
import { WidgetKey } from '../../../config';

export default class WithdrawalWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalWithdrawal,
            TitleKey: "withdrawal_today",
            WidgetName: "withdrawal",
            WidgetKey: WidgetKey.normalWithdrawal,
            defaultCountdown: 45,
            countdownValues: [5, 15, 30, 45]
        });
    }
};