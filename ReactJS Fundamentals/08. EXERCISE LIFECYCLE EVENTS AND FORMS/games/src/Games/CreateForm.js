import React from 'react';

let innerState = {
    title: null,
    description: null,
    imageUrl: null
};

const handleFormElementChange = ({target}) => {
    const {name, value} = target;
    innerState[name] = value;
};

const CreateForm = (props) => {
    return (
        <div className="create-form">
            <h1>Create game</h1>
            <form onSubmit={(event) => {
                event.preventDefault();
                props.createGame(innerState);
            }}>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={handleFormElementChange}
                />
                <label>Description</label>
                <textarea
                    name="description"
                    onChange={handleFormElementChange}
                />
                <label>ImageUrl</label>
                <input
                    type="text"
                    name="imageUrl"
                    onChange={handleFormElementChange}
                />
                <input type="submit" value="Create"/>
            </form>
        </div>
    )
};

export default CreateForm;

