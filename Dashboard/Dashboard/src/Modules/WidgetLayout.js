import LocalStorageHelper from './LocalStorageHelper';
import { WidgetKey, Wglayouts } from '../config';

export default class WidgetLayout {
    static getWidgetStatusSettings(permissions) {
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

    static cloneWidgetLayoutConfigs() {
        return {
            lg: [...Wglayouts.lg],
            md: [...Wglayouts.md],
            sm: [...Wglayouts.sm],
            xs: [...Wglayouts.xs],
            xxs: [...Wglayouts.xxs]
        }
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

    static addWidgetToLayout(layouts, key) {
        const newLayouts = {};
        const find = w => w.i === key;

        if (layouts) {
            const breakpoints = Object.keys(Wglayouts);
            let widget = Wglayouts[breakpoints[0]].find(find);

            if (!widget) {
                return layouts;
            }

            const userSettings = LocalStorageHelper.getWidgetLayout() || {
                lg:[], md:[], sm:[], xs:[], xxs:[]
            };

            breakpoints.forEach(breakpoint => {
                const layout = Object.assign({}, 
                    Wglayouts[breakpoint].find(find),
                    userSettings[breakpoint].find(find)
                );
                newLayouts[breakpoint] = [...layouts[breakpoint], layout];
            });
        }
        
        return newLayouts;
    }

    static getUserWidgetLayoutSettingsForDisplay(){
        let userWidgetLayouts = LocalStorageHelper.getWidgetLayout();
        if (!userWidgetLayouts) {
            userWidgetLayouts = WidgetLayout.cloneWidgetLayoutConfigs();
            LocalStorageHelper.saveWidgetLayout(userWidgetLayouts);
        }

        const widgetStatus = LocalStorageHelper.getWidgetStatus();
        const filter = w => !!widgetStatus.find(widget => widget.key === w.i && widget.enable);

        return {
            lg: userWidgetLayouts.lg.filter(filter),
            md: userWidgetLayouts.md.filter(filter),
            sm: userWidgetLayouts.sm.filter(filter),
            xs: userWidgetLayouts.xs.filter(filter),
            xxs:userWidgetLayouts.xxs.filter(filter)
        };
    }
}
