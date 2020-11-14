import React, {Component, useState} from 'react';
import Config from './Config.json';
const Put = () => {

    const [putValue, setPutValue] = useState("");
    function inputName(event) {
        setPutValue(event.target.value);

    }

    async function addMarine() {
        let response = await fetch(Config.Url, {
            method: 'PUT',
            body: putValue
        });
        console.log(putValue);
        console.log(response);
    }

    return (
        <div>
            <h2>
                Add space marine
            </h2>
            <div>
               <div> Enter marine xml formatted file</div>
                <textarea cols="100" rows="30" onChange={inputName}/>
            </div>
            <button className="cool-button" onClick={addMarine}>Get data</button>
        </div>
    );

}

export default Put;
