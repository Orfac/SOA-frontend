import {xml2json} from "xml-js";

export function deleteById() {

}
export async function getMarines(finalUrl) {
    let response = await fetch(finalUrl, {
        method: 'GET',
    });
    let responseText = await response.text();
    let convertedJson = xml2json(responseText, {compact: true});
    convertedJson = convertedJson.replace(/_/g, "");
    let parsedMarinesMap = JSON.parse(convertedJson).SpaceMarineCollection;
    if (Object.keys(parsedMarinesMap).length === 0){
        return [];
    }
    let parsedMarines = parsedMarinesMap.SpaceMarine;
    if (!Array.isArray(parsedMarines)){
        parsedMarines = [parsedMarines];
    }
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
            return marine
        }
    )
}
