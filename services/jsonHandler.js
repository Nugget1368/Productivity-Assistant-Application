const CATEGORIES_KEY = "./JSON-storage/categories.json";

const loadFromJSONAsync = async (key) => {
    try{
        let response = await fetch(key);
        let json = response.json();
        return json;
    }
    catch (error){
        return "Ett fel har inträffat...";
    }
}

export {loadFromJSONAsync, CATEGORIES_KEY}