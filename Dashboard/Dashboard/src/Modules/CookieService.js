export default class CookieService {
    static getCookieValue(key) {
        const pattern = '(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$';
        const regex = new RegExp(pattern, 'g');

        return document.cookie.replace(regex, "$1");
    }
}