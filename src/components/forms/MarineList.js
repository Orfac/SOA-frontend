import React, {Component, useState} from 'react';
import SpaceMarine from "../SpaceMarine";
import {xml2json} from "xml-js";
import Config from '../../api/Config.json';
import './FormStyle.css';
import {getMarines} from "../../api/utils";
const MarineList = () => {
    let url = Config.Url;
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
        let updatedMarines = await getMarines(finalUrl);
        if (updatedMarines.length < 1) {
            setErrorMessage("There are 0 space marines");
            return
        }
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

export default MarineList;
