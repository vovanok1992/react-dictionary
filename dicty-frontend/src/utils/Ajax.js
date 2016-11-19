/**
 * Created by Vovan on 12.11.2016.
 */

class Ajax {

    get(url){
        const promise = new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            xhttp.open("GET", url, true);
            xhttp.send();
        });
        return promise;
    }

    post(url, object){
        const promise = new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(object));
        });
        return promise;
    }
}

export default new Ajax();