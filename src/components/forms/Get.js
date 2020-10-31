import React, {Component, useState} from 'react';
import SpaceMarine from "../SpaceMarine";
import {xml2json} from "xml-js";
import './FormStyle.css';
const Get = () => {
    let url = "http://localhost:8080/marines";
    const [marines, setMarines] = useState([]);
    const [pageSize, setPageSize] = useState("");
    const [pageNumber, setPageNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const renderMarines = () => {
        return marines.map(
            (marine) => <SpaceMarine marine={marine}/>
        )
    }

    const updateMarines = async () => {
        setErrorMessage("");
        let finalUrl;
        if (pageSize && pageNumber) {
            finalUrl = url + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize
        } else {
            finalUrl = url;
        }
        let response = await fetch(finalUrl, {
            method: 'GET',
        });
        let responseText = await response.text();
        let convertedJson = xml2json(responseText, {compact: true});
        convertedJson = convertedJson.replace(/_/g, "");
        let parsedMarinesMap = JSON.parse(convertedJson).SpaceMarineCollection;
        if (Object.keys(parsedMarinesMap).length === 0){
            setErrorMessage("There are 0 space marines")
            return;
        }
        let parsedMarines = parsedMarinesMap.SpaceMarine;
        let updatedMarines = parsedMarines.map(
            marine => {

                let chapter = marine.chapter;
                chapter.name = chapter.name.text;
                chapter.parentLegion = chapter.parentLegion.text;
                chapter.marinesCount = chapter.marinesCount.text;
                chapter.world = chapter.world.text;
                marine.chapter = chapter;

                marine.category = marine.category.text;
                marine.coordinates = {x: marine.coordinates.x.text, y:marine.coordinates.y.text};
                marine.creationDate = marine.creationDate.text;
                marine.health = marine.health.text;
                marine.meleeWeapon = marine.meleeWeapon.text;
                marine.heartCount = marine.heartCount.text;
                marine.name = marine.name.text;
                return marine
            }
        )
        setMarines(updatedMarines);
    }

    function inputPageSize(event) {
        setPageSize(event.currentTarget.value)
    }

    function inputPageNumber(event) {
        setPageNumber(event.currentTarget.value)
    }

    return (
        <div className="form-container">
            <h2>
                Get space marines
            </h2>
            <div>
                <button className="cool-button" onClick={updateMarines}>Get data</button>
                <div>
                    Page size
                    <input type="text" onChange={inputPageSize}/>
                </div>
                <div>
                    Page number
                    <input type="text" onChange={inputPageNumber}/>
                </div>
            </div>

            <div>
                {errorMessage ? <div className="error-message">{errorMessage}</div> : renderMarines()}
            </div>
        </div>
    );

}

export default Get;
