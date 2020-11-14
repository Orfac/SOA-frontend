
import './App.css';
import React, {useState} from "react";

import Features from "./components/forms/Features";
import MarineList from './components/forms/MarineList';

function App() {

    const [stateNumber,setStateNumber] = useState(0);
    function select(value) {
        switch (value) {
            case "main":
                setStateNumber(0);
                break;
            case "features":
                setStateNumber(1);
                break;
            default:
                break;
        }
        return undefined;
    }

    return (
        <div className="App">
            <div className="mode-selection">
                <div className="mode" onClick={() => select("main")}>Main page</div>
                <div className="mode" onClick={() => select("features")}>Features</div>
            </div>
            <div>
                {stateNumber === 0 ?  <MarineList/> : ""}
                {stateNumber === 1 ?  <Features/> : ""}
            </div>


        </div>
    );
}

export default App;
