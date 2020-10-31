import React, {Component} from 'react';
import './SpaceMarine.scss';
const SpaceMarine = ({marine}) => {
    let chapter = marine.chapter;


    return (
        <div className="marine-container">
            <div className="chapter-info">
                <h2>Chapter</h2>
                <div>chapter = {chapter.name}</div>
                <div>parent legion = {chapter.parentLegion}</div>
                <div>marines count = {chapter.marinesCount}</div>
                <div>world = {chapter.world}</div>
            </div>
            <div className="main-info">
                <h2>Main</h2>
                <div>Name = {marine.name}</div>
                <div>coordinates - X = {marine.coordinates.x};</div>
                <div>coordinates - Y = {marine.coordinates.y};</div>
                <div>creation date = {marine.creationDate}</div>


            </div>

            <div className="additional-info">
                <h2>Additional</h2>
                <div>category = {marine.category}</div>
                <div>health = {marine.health}</div>
                <div>melee weapon = {marine.meleeWeapon}</div>
                <div>heart count = {marine.heartCount}</div>
            </div>
        </div>
    );
}

export default SpaceMarine;
