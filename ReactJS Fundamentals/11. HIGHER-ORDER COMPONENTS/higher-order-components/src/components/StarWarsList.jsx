import React from 'react';
import StarWarsService from '../services/star-wars-service';
import withDataFromService from './hocs/with-data-from-service';

function StarWarsList({data: characters, bar}) {

    if (!characters.length) {
        return null;
    }

    return (
        <ul>
            {
                characters.map(ch =>
                    <li key={ch.url}>{ch.name}</li>
                )
            }
        </ul>
    );
}

export default withDataFromService(
    StarWarsList,
    [],
    new StarWarsService().getStarWarsCharacters
);