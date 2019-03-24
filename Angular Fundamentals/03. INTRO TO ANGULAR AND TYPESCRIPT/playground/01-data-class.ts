class HttpRequest {
    private method: String;
    private uri: String;
    private version: String;
    private message: String;
    private response: String;
    private fullfilled: Boolean;

    constructor(
        method: string,
        uri: string,
        version: string,
        message: string,
    ) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fullfilled = false;
    }
}

let myData = new HttpRequest('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
