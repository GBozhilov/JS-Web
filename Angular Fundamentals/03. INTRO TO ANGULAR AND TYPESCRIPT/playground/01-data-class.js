var HttpRequest = /** @class */ (function () {
    function HttpRequest(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fullfilled = false;
    }
    return HttpRequest;
}());
var myData = new HttpRequest('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
