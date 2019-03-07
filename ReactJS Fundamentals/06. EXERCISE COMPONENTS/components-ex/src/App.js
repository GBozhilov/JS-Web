import React, { Component } from 'react';
import Street from './Street/Street';
import House from './House/House';
import HouseDetails from './HouseDetails/HouseDetails';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            streets: [],
            selectedStreetIndex: 0,
            selectedHouseIndex: 0,
            hasFetched: false
        }
    }

    getSelectedStreet() {
        const currentStreetIdx = this.state.selectedStreetIndex;
        const currentStreetHomes = this.state.streets[currentStreetIdx].homes;

        return currentStreetHomes;
    }

    getSelectedHouse() {
        const currentStreetIdx = this.state.selectedStreetIndex;
        const currentStreetHomes = this.state.streets[currentStreetIdx].homes;
        const currentHouseIdx = this.state.selectedHouseIndex;
        const currentHouse = currentStreetHomes[currentHouseIdx];

        return currentHouse;
    }

    componentWillMount() {
        fetch('http://localhost:9999/feed/street/all')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    streets: data.streets,
                    hasFetched: true
                });
            })
            .catch(err => console.log(err));
    }

    streetHoverEvent(index) {
        this.setState({
            selectedStreetIndex: index
        });
    }

    houseHoverEvent(index) {
        this.setState({
            selectedHouseIndex: index
        });
    }

    renderStreetComponents() {
        const streets = this.state.streets;

        if (!streets.length) {
            return null;
        }

        return streets.map((street, index) => {
            return (
                <Street
                    location={street.location}
                    key={index}
                    id={index}
                    streetHoverEvent={this.streetHoverEvent.bind(this)}
                />
            );
        });
    }

    renderHouseComponents() {
        return this.getSelectedStreet().map((home, index) => {
            return (
                <House
                    type={home.type}
                    description={home.description}
                    imageUrl={home.imageUrl}
                    price={home.price}
                    id={index}
                    key={index}
                    houseHoverEvent={this.houseHoverEvent.bind(this)}
                />
            );
        })
    }

    renderHouse() {
        const house = this.getSelectedHouse();
        console.log(house);

        return this.state.streets.length > 0 ?
            <HouseDetails
                type={house.type}
                description={house.description}
                imageUrl={house.imageUrl}
                price={house.price}
                key={this.state.selectedHouseIndex}
            /> :
            null;
    }

    render() {
        if (!this.state.hasFetched) {
            return <div>Loading...</div>
        }

        return (
            <div className="App">
                <div className="streets">
                    <h2>Streets</h2>
                    {this.renderStreetComponents()}
                </div>
                <div className="houses">
                    <h2>Houses</h2>
                    {this.renderHouseComponents()}
                </div>
                {this.renderHouse()}
            </div>
        );
    }
}

export default App;