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

const loadEvent = async () => {

    const result = await pharseJSON("/api/v1/users")
    const rootElement=document.getElementById("root")
    rootElement.insertAdjacentHTML(
        "beforeend", 
        result.map(users => userComponent(users)).join("")
    )

}
window.addEventListener("load", loadEvent)