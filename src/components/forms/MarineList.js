import React, {useState} from 'react';
import SpaceMarine from "../SpaceMarine";
import Config from '../../api/Config.json';
import './FormStyle.css';
import {getMarines, handleXml, save} from "../../api/utils";

const MarineList = () => {
    let url = Config.Url + "/marines";
    const [marines, setMarines] = useState([]);
    const [pageSize, setPageSize] = useState("");
    const [pageNumber, setPageNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isAddOpen, setAddOpen] = useState(false);
    const [addValue, setAddValue] = useState("");

    const [filter, setFilter] = useState("");
    const [sort, setSort] = useState("");

    const renderMarines = () => {
        return marines.map(
            (marine) => <SpaceMarine marine={marine} callForUpdate={reUpdateMarines}/>
        )
    }

    const reUpdateMarines = async () => {
        await updateMarines();
    }

    const updateMarines = async () => {
        setErrorMessage("");
        setAddOpen(false);
        let finalUrl = url + "?";
        if (pageSize && pageNumber) {
            finalUrl += "&pageNumber=" + pageNumber + "&pageSize=" + pageSize
        }
        if (filter) {
            finalUrl += "&" + filter;
        }
        if (sort) {
            finalUrl += "&sortBy" + sort;
        }
        let updatedMarinesResponse = await getMarines(finalUrl);
        let updatedMarines = [];
        let responseText = await updatedMarinesResponse.text();
        if (updatedMarinesResponse.status === 200) {
            updatedMarines = await handleXml(responseText);
            if (updatedMarines.length < 1) {
                setErrorMessage("There are 0 space marines");
            }
        } else {
            setErrorMessage(responseText);
        }

        setMarines(updatedMarines);
    }

    const inputPageSize = event => setPageSize(event.currentTarget.value);
    const inputPageNumber = event => setPageNumber(event.currentTarget.value);
    const openAdd = () => {
        setAddOpen(!isAddOpen);
        setErrorMessage("");
        setPageNumber("");
        setPageSize("");
        setSort("");
        setFilter("");
    };
    const updateNew = event => setAddValue(event.target.value);
    const sendNew = () => save(addValue);
    const inputSort = event => setSort(event.target.value);
    const inputFilter = event => setFilter(event.target.value);

    return (
        <div className="form-container">
            <h2>
                Space marines
            </h2>
            <div>
                <button className="cool-button" onClick={updateMarines}>Get marines</button>
                <button className="cool-button" onClick={openAdd}>{isAddOpen ? "Close marine" : "Add marine"}</button>
                {isAddOpen ? "" : <div>
                    <div>
                        <div>
                            Page size
                            <input type="text" onChange={inputPageSize} placeholder="1"/>
                        </div>
                        <div>
                            Page number
                            <input type="text" onChange={inputPageNumber} placeholder="1"/>
                        </div>
                    </div>
                    <div>
                        Filter by
                        <input type="text" onChange={inputFilter} placeholder="name=vasya&id=1"/>
                    </div>
                    <div>
                        Sort by
                        <input type="text" onChange={inputSort} placeholder="name,id"/>
                    </div>
                </div>}
            </div>


            <div>
                {isAddOpen ? <div>
                    <h2>XML view</h2>

                    <textarea cols="60" rows="20" onChange={updateNew}/>
                    <div>
                        <button className="cool-button" onClick={sendNew}>
                            Load new marine
                        </button>
                    </div>
                </div> : renderMarines()}
            </div>

            {errorMessage ? <div className="error-message">{errorMessage}</div> : ""}


        </div>
    );

}

export default MarineList;
