var Ticket = /** @class */ (function () {
    function Ticket(destination, price, status) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
    return Ticket;
}());
var sortingCriteria = 'status';
var inputArr = [
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
];
var tickets = [];
inputArr.forEach(function (str) {
    var _a = str.split('|'), destination = _a[0], priceStr = _a[1], status = _a[2];
    var newTicket = new Ticket(destination, Number(priceStr), status);
    tickets.push(newTicket);
});
var sortedTickets = tickets.sort(function (t1, t2) {
    return t1[sortingCriteria].localeCompare(t2[sortingCriteria]);
});
console.log(sortedTickets);
