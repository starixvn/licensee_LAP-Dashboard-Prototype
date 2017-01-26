import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';

export default class PendingFundsWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalWithdrawal,
            TitleKey: "withdrawal_today",
            WidgetName: "withdrawal"
        });
    }
};