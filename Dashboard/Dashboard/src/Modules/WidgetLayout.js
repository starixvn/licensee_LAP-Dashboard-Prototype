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

    static syncLayoutWithNewStatus(newStatus, widgetStatus, widgetLayouts) {
        let newWidgetStatus = [...widgetStatus];
        let newLayouts = Object.assign({}, widgetLayouts);
        let removedLayouts = LocalStorageHelper.getRemovedWidgetLayout();
        const me = WidgetLayout;

        newStatus.forEach(widgetItem => {
            let status = newWidgetStatus.find(w => w.key === widgetItem.key);
            if(status.enable === widgetItem.enable){
                return;
            }
            status.enable = widgetItem.enable;

            if (status.enable) {
                const addedItem = removedLayouts[widgetItem.key] || me._getWidgetLayoutByKey(Wglayouts, widgetItem.key);
                newLayouts = me._addWidgetToLayout(newLayouts, addedItem);
                removedLayouts[widgetItem.key] = null;
            } else {
                const remmovedItem = me._getWidgetLayoutByKey(newLayouts, widgetItem.key);
                newLayouts = me._removeWidgetFromLayout(newLayouts, widgetItem.key);
                removedLayouts[widgetItem.key] = remmovedItem;
            }
        });

        return {newWidgetStatus, newLayouts, removedLayouts};
    }

    static _removeWidgetFromLayout(layouts, key) {
        const filter = w => w.i !== key;
        const newLayout = {};

        if (layouts) {
            Object.keys(layouts).forEach(breakpoint => {
                newLayout[breakpoint] = layouts[breakpoint].filter(filter);
            });
        }

        return newLayout;
    }

    static _addWidgetToLayout(layouts, widgetLayout) {
        const newLayouts = {};
        const breakpoints = Object.keys(layouts);
        let isValid = true;

        breakpoints .forEach(breakpoint => {
            newLayouts[breakpoint] = [...layouts[breakpoint]];
            if(!widgetLayout[breakpoint]) {
                return (isValid = false);
            }
            newLayouts[breakpoint].push(widgetLayout[breakpoint]);
        });

        return isValid ? newLayouts : layouts;
    }    

    static _getWidgetLayoutByKey(layouts, key) {
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
