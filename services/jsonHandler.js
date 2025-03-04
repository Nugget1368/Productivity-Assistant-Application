export const CATEGORIES_KEY = "../JSON-storage/categories.json";
export const PRIORITIES_KEY = "../JSON-storage/priorities.json";
export const SORT_OPTIONS_KEY = "../JSON-storage/sortOptions.json";

export const loadFromJSONAsync = async (key) => {
  try {
    let response = await fetch(key);
    let json = response.json();
    return json;
  } catch (error) {
    return "Ett fel har inträffat...";
  }
};