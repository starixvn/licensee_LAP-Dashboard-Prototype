import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';
import { WidgetKey } from '../../../config';

export default class PendingFundsWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalSportsbookWallet,
            TitleKey: "sportsbook_wallet",
            WidgetName: "sportbook-wallet",
            WidgetKey: WidgetKey.normalSportsbookWallet
        });
    }
};