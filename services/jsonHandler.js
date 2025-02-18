const loadFromJSONAsync = async () => {
    try{
        let response = await fetch("./JSON-storage/categories.json");
        let json = response.json();
        return json;
    }
    catch (error){
        return "Ett fel har inträffat...";
    }
}

export {loadFromJSONAsync}