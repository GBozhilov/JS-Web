class Ticket {
    private destination: String;
    private price: Number;
    private status: String;

    constructor(
        destination: String,
        price: Number,
        status: String
    ) {
        this.destination = destination;
        this.price = price;
        this.status = status;
    }
}

const sortingCriteria = 'status';
const inputArr = [
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
];

const tickets = [];

inputArr.forEach(str => {
    let [destination, priceStr, status] = str.split('|');
    const newTicket = new Ticket(destination, Number(priceStr), status);
    tickets.push(newTicket);
});

const sortedTickets = tickets.sort(function (t1, t2) {
    return t1[sortingCriteria].localeCompare(t2[sortingCriteria]);
});

console.log(sortedTickets);
