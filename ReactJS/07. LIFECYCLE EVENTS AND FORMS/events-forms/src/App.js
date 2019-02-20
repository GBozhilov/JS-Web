import React, {Component} from 'react';
import Toggle from './components/Toggle';
//import RegistrationForm from './components/RegistrationForm';
//import Counter from './components/Counter';

//const initialCount = 10;

class App extends Component {
    render() {
        return (
            <div className="App">
                <Toggle/>
                {/*<Counter initialCount={initialCount}/>*/}
                {/*<Counter initialCount={initialCount + 10}/>*/}
            </div>
        );
    }
}

export default App;