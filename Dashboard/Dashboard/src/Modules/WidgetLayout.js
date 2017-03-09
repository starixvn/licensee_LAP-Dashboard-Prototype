import LocalStorageHelper from './LocalStorageHelper';
import { WidgetKey, Wglayouts } from '../config';

export default class WidgetLayout {
    static getWidgetStatusSettings(permissions = []) {
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

    static removeWidgetFromLayout(layouts, key) {
        const filter = w => w.i !== key;
        const newLayout = {};

        if (layouts) {
            Object.keys(layouts).forEach(breakpoint => {
                newLayout[breakpoint] = layouts[breakpoint].filter(filter);
            });
        }

        return newLayout;
    }

    static addWidgetToLayout(layouts, widgetLayout) {
        const newLayouts = {};

        Object.keys(layouts).forEach(breakpoint => {
            newLayouts[breakpoint] = [...layouts[breakpoint], widgetLayout[breakpoint]];
        });

        return newLayouts;
    }

    static getWidgetLayoutSettings() {
        let userWidgetLayouts = LocalStorageHelper.getWidgetLayout();

        if (!userWidgetLayouts) {
            userWidgetLayouts = WidgetLayout._cloneDefaultWidgetLayout();
        }
        const widgetStatus = LocalStorageHelper.getWidgetStatus();
        const enabledLayoutFilter = w => !!widgetStatus.find(widget => widget.key === w.i && widget.enable);
        const layouts = {};

        Object.keys(userWidgetLayouts).forEach(breakpoint => {
            layouts[breakpoint] = userWidgetLayouts[breakpoint].filter(enabledLayoutFilter);
        });
        LocalStorageHelper.saveWidgetLayout(layouts);
        return layouts;
    }

    static getWidgetLayoutByKey(layouts, key) {
        const widgetLayout = {};

        Object.keys(layouts).forEach(breakpoint => {
            widgetLayout[breakpoint] = layouts[breakpoint].find( w => w.i === key);
        });
        
        return widgetLayout;
    }    

    static _cloneDefaultWidgetLayout(){
        const newLayouts = {};
        Object.keys(Wglayouts).forEach(breakpoint => {
            newLayouts[breakpoint] = [...Wglayouts[breakpoint]];
        });
        return newLayouts;
    }
}
