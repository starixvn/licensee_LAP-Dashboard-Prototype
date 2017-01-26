import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';

export default class PendingFundsWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalPendingFund,
            TitleKey: "pending_funds",
            WidgetName: "pending-fund"
        });
        this.state = {
            data: 0
        }
    }
};