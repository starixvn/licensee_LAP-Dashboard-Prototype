function isSupportSessionStorage() {
    if (window.sessionStorage) {
        var test = "__sessionStorageTest__";

        try {
            window.sessionStorage.setItem(test, test);
            window.sessionStorage.removeItem(test);
        } catch (ex) {
            return false;
        }

        return true;
    }

    return false;
}

export default class StorageHelper {
    constructor() {
        this._supportSessionStorage = isSupportSessionStorage();
    }

    get supportSessionStorage() { return this._supportSessionStorage };
}