import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';
import { WidgetKey } from '../../../config';

export default class CustomerBalanceWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalCustomerBalance,
            TitleKey: "customer_balance",
            WidgetName: "customer-balance",
            WidgetKey: WidgetKey.normalCustomerBalance,
            defaultCountdown: 75,
            countdownValues: [15, 30, 45, 60, 75]
        });
    }
};