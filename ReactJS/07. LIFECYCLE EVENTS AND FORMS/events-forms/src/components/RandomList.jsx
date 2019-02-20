import React from 'react';

const RandomList = ({randomList = []}) => (
    <ul>
        {
            randomList.map(p => <li>{p}</li>)
        }
    </ul>
);

export default RandomList;
