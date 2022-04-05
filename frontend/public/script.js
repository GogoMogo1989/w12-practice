const pharseJSON = async (url) =>{  //fetch-et lementjük egy függvényben, hogy ne kelljen folyton leírni.
    const response = await fetch(url)
    return response.json()
}

const userComponent = ({name, surname}) => {
    return`
    <div>
        <h1>${name}</h1>
        <h2>${surname}</h2>
    </div>
    `
}

function addUserComponent(){
    return`
        <div>
            <input type="text" name="name" class="name" placeholder="first name">
            <input type="text" name="surname"  class="surname" placeHolder="surname">
            <button class="myButton">Send</button>
        </div>
    `
}

const loadEvent = async () => {

    if(window.location.pathname==="/admin/order-view"){
        console.log("We are in the admin site")
    }else{
        console.log("We are in the shopping site")
    }
    const result = await pharseJSON("/api/v1/users")
    const rootElement=document.getElementById("root")
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(users => userComponent(users)).join("")
    )
    rootElement.insertAdjacentHTML("afterend", addUserComponent())

   /*  ----------------------------post--------------------------------- */

    const button = document.querySelector(".myButton")  //Itt mentjük el a gombot, és az inputokat változókba
    const name = document.querySelector(".name")
    const surname = document.querySelector(".surname")

    button.addEventListener('click', e => {  //gombra rakunk egy click eseményt
        const userData = {
            name : name.value,  //Itt adjuk meg a click eseményhez az inputokat.
            surname: surname.value
        };

    

        fetch("/users/new", {
            method: "post",
            headers: {
                "Content-type" :"application/json"
            },
            body: JSON.stringify(userData)  
        })

        .then(async data => {
            const user = await data.json();  //Itt adunk új felhasználókat

            rootElement.insertAdjacentHTML("beforend", userComponent(user))

        })

    })

}
window.addEventListener("load", loadEvent)