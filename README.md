# :rocket:Productivity-Assistant-Application
Application that helps user to keep track of his/hers todos, habits and events

## :computer:Services
I denna mapp finner vi alla logiska metoder som hanterar något form av data **med hjälp av javascript**.

### localstorage.js
I denna fil lagras alla funktioner förknippade med Local-storage.

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
### todoActivities.js

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