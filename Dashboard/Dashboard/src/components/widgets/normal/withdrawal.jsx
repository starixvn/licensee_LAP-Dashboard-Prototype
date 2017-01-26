import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';
import { WidgetKey } from '../../../config';

export default class PendingFundsWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalWithdrawal,
            TitleKey: "withdrawal_today",
            WidgetName: "withdrawal",
            WidgetKey: WidgetKey.normalWithdrawal
        });
    }
};