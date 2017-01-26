import { WidgetApiUrl } from '../../../config'
import BaseNormalWidget from './BaseNormalWidget';

export default class DepositWidget extends BaseNormalWidget {
    constructor(props) {
        super(props, {
            Url: WidgetApiUrl.normalDeposit,
            TitleKey: "deposit_today",
            WidgetName: "deposit"
        });
        this.state = {
            data: 0
        }
    }
};
