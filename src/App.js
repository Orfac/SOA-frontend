import SpaceMarine from "./components/SpaceMarine";
import './App.css';
import React, {useState} from "react";
import {xml2js, xml2json} from "xml-js";
import Delete from "./components/forms/Delete";
import Put from "./components/forms/Put";
import Get from "./components/forms/Get";
import Post from "./components/forms/Post";
import Features from "./components/forms/Features";

function App() {

    const [stateNumber,setStateNumber] = useState(2);
    function select(value) {
        switch (value) {
            case "delete":
                setStateNumber(0);
                break;
            case "add":
                setStateNumber(1);
                break;
            case "get":
                setStateNumber(2);
                break;
            case "update":
                setStateNumber(3);
                break;
            case "features":
                setStateNumber(4);
                break;
            default:
                break;
        }
        return undefined;
    }

    return (
        <div className="App">
            <div className="mode-selection">
                <div className="mode" onClick={() => select("delete")}>Delete</div>
                <div className="mode" onClick={() => select("add")}>Add</div>
                <div className="mode" onClick={() => select("get")}>Get</div>
                <div className="mode" onClick={() => select("update")}>Update</div>
                <div className="mode" onClick={() => select("features")}>Features</div>
            </div>
            <div>
                {stateNumber === 0 ?  <Delete/> : ""}
                {stateNumber === 1 ?  <Put/> : ""}
                {stateNumber === 2 ?  <Get/> : ""}
                {stateNumber === 3 ?  <Post/> : ""}
                {stateNumber === 4 ?  <Features/> : ""}
            </div>


        </div>
    );
}

export default App;
