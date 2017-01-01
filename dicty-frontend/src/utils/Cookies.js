/**
 * Created by Vovan on 01.01.2017.
 */

export default class Cookies {

    static createCookie(name, value, sec) {
        let expires;
        if (sec) {
            const date = new Date();
            date.setTime(date.getTime() + (sec * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    static readCookie(name) {
        return this.getCookies()[name];
    }

    static getCookies() {
        const cookies = {};
        for (const cookie of document.cookie.split('; ')) {
            let [name, value] = cookie.split("=");
            cookies[name] = decodeURIComponent(value);
        }
        return cookies;
    }

    static eraseCookie(name) {
        this.createCookie(name, "", -1);
    }
}