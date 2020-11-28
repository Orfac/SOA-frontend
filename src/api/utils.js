import {xml2json} from "xml-js";
import Config from '../api/Config.json';


export async function deleteById(id) {
    let url = Config.Url + "/" + id;
    let response = await fetch(url ,{
        method: "DELETE"
    });
}
export async function getMarines(finalUrl) {
    return await fetch(finalUrl, {
        method: 'GET',
    })


}

export async function updateById(id, text){
    let url = Config.Url + "/" + id;
    return  await fetch(url ,{
        method: "PUT",
        body: text
    });
}
export async function save(text){
    let url = Config.Url;
    return await fetch(url, {
        method: "POST",
        body: text
    });
}
export async function handleXml(text){
    let convertedJson = xml2json(text, {compact: true});
    convertedJson = convertedJson.replace(/_/g, "");
    let parsedMarinesMap = JSON.parse(convertedJson).SpaceMarineCollection;
    if (Object.keys(parsedMarinesMap).length === 0){
        return [];
    }
    let parsedMarines = parsedMarinesMap.SpaceMarine;
    if (!Array.isArray(parsedMarines)){
        parsedMarines = [parsedMarines];
    }
    let i = 0;
    return parsedMarines.map(
        marine => {

            let chapter = marine.chapter;
            chapter.name = chapter.name.text;
            chapter.parentLegion = chapter.parentLegion.text;
            chapter.marinesCount = chapter.marinesCount.text;
            chapter.world = chapter.world.text;
            marine.chapter = chapter;

            marine.id = marine.id.text;
            marine.category = marine.category.text;
            marine.coordinates = {x: marine.coordinates.x.text, y:marine.coordinates.y.text};
            marine.creationDate = marine.creationDate.text;
            marine.health = marine.health.text;
            marine.meleeWeapon = marine.meleeWeapon.text;
            marine.heartCount = marine.heartCount.text;
            marine.name = marine.name.text;

            marine.xmlText = getSpaceMarineXMLById(text, i);
            i++;
            return marine
        }
    )
}
function getSpaceMarineXMLById(xmlText, id) {
    let domParser = new DOMParser();
    let dom = domParser.parseFromString(xmlText, "application/xml");

    let elements = dom.childNodes[0].getElementsByTagName("SpaceMarine");

    return elements[id].outerHTML;
}
