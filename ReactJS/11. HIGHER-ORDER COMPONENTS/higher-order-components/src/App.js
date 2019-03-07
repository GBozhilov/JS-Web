import React, {Component, Fragment} from 'react';

// import BookList from './components/BookList';
// import StarWarsList from './components/StarWarsList';

const defaultTheme = 'light';
const {Consumer: ThemeConsumer, Provider: ThemeProvider} = React.createContext(defaultTheme);

const Nav = ({items = [], theme}) => (
    <nav className={theme}>
        {
            items.map(item => (
                <a href="#" key={item.id}>
                    {item.name}
                </a>
            ))
        }
    </nav>
);

const NavConsumer = (props) => (
    <ThemeConsumer>
        {
            (theme) => <Nav {...props} theme={theme}/>
        }
    </ThemeConsumer>
);

const PhoneBook = ({contacts = [], theme}) => (
    <div className={theme}>
        {
            contacts.map(contact => (
                <div key={contact.id}>
                    <h4>Name: {contact.name}</h4>
                    <h4>Phone: {contact.phone}</h4>
                </div>
            ))
        }
    </div>
);

const PhoneBookConsumer = (props) => (
    <ThemeConsumer>
        {
            (theme) => <PhoneBook {...props} theme={theme}/>
        }
    </ThemeConsumer>
);

class App extends Component {
    state = {
        contacts: [
            {id: 1, name: 'Peter', phone: '+35929805060'},
            {id: 2, name: 'Maria', phone: '+359888777666'},
            {id: 3, name: 'Ivan', phone: '+359899403020'},
        ],
        items: [
            {id: 'home', name: 'Home'},
            {id: 'about', name: 'About'},
            {id: 'contact', name: 'Contact'},
        ],
        theme: 'light'
    };

    componentDidMount() {
        const hours = new Date().getHours();

        if (hours >= 0) {
            setTimeout(() => {
                this.setState({theme: 'dark'})
            }, 5000);
        }
    }

    render() {
        const {items, contacts, theme} = this.state;

        return (
            <Fragment>
                <ThemeProvider value={theme}>
                    <NavConsumer items={items}/>
                    <PhoneBookConsumer contacts={contacts}/>
                </ThemeProvider>
            </Fragment>
        );
    }
}

export default App;
