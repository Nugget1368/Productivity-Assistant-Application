# :rocket:Productivity-Assistant-Application
Application that helps user to keep track of his/hers todos, habits and events

## :computer:Services
I denna mapp finner vi alla logiska metoder som hanterar något form av data **med hjälp av javascript**.

### localstorage.js
I denna fil lagras alla funktioner förknippade med Local-storage.


Returnerar den angivna localstorage-nyckelns värden som objekt **konverterade ifrån JSON**.

```js
const getStorageAsJSON = (storageName) =>
  JSON.parse(localStorage.getItem(storageName));

  //Example
let activities = getStorageAsJSON(ACTIVITIES_KEY);
console.log(activities); //Output: En array av objekt från Localstorage sparningen "activities"
```


#### Save To Storage
Denna metod är tänkt att användas för att spara till Localstorage.


>**Parametrar**:
**storageName** - Namnet för nyckeln i Localstorage som man vill komma åt, exempelvis "activities" eller "user".
**obj** - Det objekt man vill spara som värde i localstorage.

```js
const saveToStorage = (storageName, obj) =>{
    if(localStorage.getItem(storageName)){
        let storage = JSON.parse(localStorage.getItem(storageName));
        storage.push(obj);
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
    else{
        let arr = [];
        arr.push(obj);
        localStorage.setItem(storageName, JSON.stringify(arr));
    }   
}
```

I metodens första rad sker en if-sats som kontrollerar ifall nyckeln existerar. Om den existerar vill vi lägga till det nya värdet i listan av värden. Detta är viktigt eftersom vi lagrar alla värden i en Array och inte vill **råka ersätta hela arrayen med det nya värdet vi försöker lägga till**.

För att lägga till objektet krävs att vi först hämtar hela listan, **pushar** värdet in i arrayen och därefter skriver vi över den gamla arrayen som finns lagrad med den nya vi precis skapat.

Om nyckeln istället **inte existerar** vill vi skapa en ny array och lägga till det nya värdet i arrayen. Därefter spara arrayen i localstorage.

```js
if(localStorage.getItem(storageName)){
    // Nyckeln finns angiven sen tidigare
}
else{
    // Nyckeln finns inte angiven sen tidigare, skapa en ny Array att spara som värde
}
```

>**JSON.stringify & JSON.parse**
För att **minska storleken** på datan som lagras i localstorage är det **viktigt** att vi inte sparar vardera objekt som de är, utan istället **konverterar de till JSON-strängar** (JSON.stringify).
>
>När vi sedan hämtar datan behöver vi då även konvertera tillbaka datan från JSON till objekten vi hämtat (JSON.parse).

#### editStorage( )
För att redigera ett objekt hämtar vi först alla objekt från localstorage. Därefter använder vi Array-metoden _Map()_ för att söka efter ett objekt i den hämtade arrayen som har ett matchande id med objektet vi tagit in i parametern.

>Vi använder oss av ett _shorthand if-else state_, ett s.k [Ternary Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator), för att utföra filtreringen i Map()-Metoden. Syftet med det är att minimera mängden kodrader och få renare kod.
>
>**Om** vi hittar ett objekt, ska objektet från localstorage bli lika med det objektet vi tagit in i arrayen.
**Annars** ska objektet från localstorage bli lika med sig själv, dvs. **ingen förändring ska ske i objektet**.

```js
const editStorage = (storageName, obj) => {
    if(localStorage.getItem(ACTIVITIES_KEY)){
        let storage = getStorageAsJSON(ACTIVITIES_KEY);
        // Search for similiar id, in that case EDIT that object
        storage = storage.map((element) => (element.id === obj.id ? obj : element));
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
}

//Example
editStorage(ACTIVITIES_KEY, {id:2, title: "Say Hello", description: "Say Hello to World"});
```

#### deleteFromStorage( )
Tar bort det objekt i den lagrade arrayen som mathcar med det angivna id i parametern. I denna metod hämtar vi först de värden som finns i localstorage med hjälp av **_getStorageAsJSON_**, därefter filtrerar vi arrayen vi fått. I filtreringen vill vi ha alla de objekt som **inte** matchar med det id som angivits.

Efter filtreringen har vi nu en ny array **utan** objektet med det id:et som angivits i parametern. Vi skriver nu över localstorage med den **nya** arrayen.

```js
const deleteFromStorage = (storageName, id) => {
  //Get from localstorage
  let storage = getStorageAsJSON(storageName);
  //Filter out the values that don't have the id we'd like to delete
  storage = storage.filter((element) => element.id !== id);
  //save the new storage-array
  localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(storage));
};

//Example
deleteFromStorage(ACTIVITY_KEY, 2);
```

****

#### Sträng-Konstanter
På första raden finns en strängkonstant deklarerad, **_ACTIVITIES_KEY_**, denna konstant är tänkt att användas varje gång ett anrop görs till _activities-nyckeln_ i Localstorage. Denna konstant finns för att undvika eventuella felstavningar som kan uppstå när man som utvecklare vill nå nyckelns värden i Localstorage.

```js
const ACTIVITIES_KEY = "activities";

// Exempel
let todo = createTodo("Hello World");
saveToStorage(ACTIVITIES_KEY, todo);
```

Det är tänkt att liknande ska ske för nycklarna hos **Habits, Event-planner och User**.
****
### todoHandler.js

Här är tänkt att alla metoder som berör todo/aktiviteter ska lagras.

#### createTodo( )
En genväg för att skapa ett Todo-objekt, detta för att undvika att man ev. glömmer data när man vill hantera ett todo-objekt.
```js
const createTodo = (title, description, status, time, category, deadline) => {
    const todo = {
        id: Date.now(),
        title,
        description,
        status,
        time,
        category,
        deadline,
    };
    return todo;
}
```

### jsonHandler
Här hanteras alla funktioner som berör lokalt lagrad json-data. Huvudmetoden är **loadFromJSONAsync**, som hämtar data med hjälp av _fetch_ med hjälp av den url-nyckel som angivits i anropet. Metoden returnerar datat konverterat från JSON.

### Constructors
För att få en stabil mall när man ska spara ett aóbjekt som Todo, Habit eller Event används en [_Simplifierad Konstruktor_](https://www.w3schools.com/js/js_object_constructors.asp). Dessa finns för att vi under projektets gång lätt ska kunna spara undan ett objekt utan att råka glömma bort viktiga delar av objektet som bör finnas med.

>**Nuvarande Konstruktorer**:
>- **createTodo**, Finns i todoHandler.js
>- **createHabit**, Finns i habitHandler.js
>- **createEvent**, finns i eventHandler.js

### filterSortHandler.js
Denna fil har som syfte att samla alla metoder som har med kategorisering och sortering att göra.

#### filterCategoryList
Filtrerar en lista utefter det värde som användaren angett.

```js
const filterCategoryList = (destination = "", storageName = "", allowedKeys = []) => {
    let categoryDrop = document.querySelector(`select${destination}`);  //Get selected value
    let storage = [];
    if (categoryDrop.value === "Ingen vald...") { //If no chosen
        storage = getStorageAsJSON(storageName);
    }
    else { //Filter
        let value = categoryDrop.value;
        storage = getStorageAsJSON(storageName);
        storage = storage.filter((element) => filterObjKeys(element, allowedKeys)[0][1] === value);
    }
    return storage;
}
```
Denna metod använder sig av en extern metod, **filterObjKeys**, som är nödvändig för att få denna metod generisk. Med hjälp av denna metod kan vi filtrera värden utefter olika typer av nycklar som använts. För att göra detta krävs att vi anger en nyckel i _parametern allowedKeys_.

```js
//Exempel
  storage = filterCategoryList("#priorities-dropdown", HABITS_KEY, ["priority"]);
```
I exemplet vill vi med hjälp av dropdown-värdet som användaren angett i **_#priorities-dropdown_**, filtrera localstorage-listan vars namn är **_HABITS_KEY_**, och propertyn (eller nyckeln) i habits-objektet som vi filtrerar efter **_heter priority_**.

**Resultatet**: Om användaren angett i Dropdownen att hen vill se alla rutiner (Habits) vars prioritet är **Hög**, så kommer _variabeln storage_ vara en **lista** (array) **med rutiner** vars **Prioritet är Hög**.

#### filterDateList
Filtrering för datum som som jämför ett datum med dagens datum, och returnerar en lista med antingen de datum som passerat eller de datum som kommer härnäst.

```js
export const filterDateList = (storageName = "", value = "") => {
    let storage = getStorageAsJSON(storageName);
    if (value === "show-upcoming")
    //Filtrera på datum som kommer
        storage = storage.filter((element) => element.end >= new Date().toLocaleDateString());
    else if (value === "show-previous")
    //Filtrera på datum som passerat
        storage = storage.filter((element) => element.end < new Date().toLocaleDateString());
    return storage;
}
```

****

## Builders
Ett **[Design Pattern](https://refactoring.guru/design-patterns)** i form av **[Builder Pattern](https://refactoring.guru/design-patterns/builder)** som har till syfte att på ett strukturerat vis bygga upp delar av DOM:en ifrån backend.

I detta projekt följs nödväntigtvis inte Builder Pattern till exakthet, men det finns här för att bidra till struktur. 

>De Builders som finns:
>- **todoBuilder.js**, ansvarar för allt som har med **Ärenden och Aktiviteter**

****