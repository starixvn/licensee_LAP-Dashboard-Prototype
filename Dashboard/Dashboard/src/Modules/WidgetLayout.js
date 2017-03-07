import LocalStorageHelper from './LocalStorageHelper';
import { WidgetKey, Wglayouts } from '../config';

export default class WidgetLayout {
    static getWidgetStatusSettings (permissions) {
        const defaultKeys = Object.keys(WidgetKey).map(key => WidgetKey[key]);
        const wgStatus = [];

        permissions.forEach(key => {
            if (defaultKeys.indexOf(key) >= 0) {
            wgStatus.push({
                key: key,
                enable: true
            });
            }
        });

        return wgStatus;
    }    

    static mergeWidgetStatusSettingsToUserSettings(widgetStatus) {
        const userWgStatus = LocalStorageHelper.getWidgetStatus();

        return userWgStatus 
            ? widgetStatus.map(widget => Object.assign({}, widget, userWgStatus.find(w => w.key === widget.key))) 
            : widgetStatus;
    }

    static cloneWidgetLayoutConfigs(){
        return {
            lg: [...Wglayouts.lg],
            md: [...Wglayouts.md],
            sm: [...Wglayouts.sm],
            xs: [...Wglayouts.xs],
            xxs: [...Wglayouts.xxs]
        }
    }
}
