const express = require("express")  //ezek a csomagok amike kelleni fognak
const fs = require("fs")
const path = require("path")

const app = express(); //változóba mentjünk az express függvényt
const port = 9000

app.get("/", (request, response, next) => {  // "http://127.0.0.1:9000/" oldalon a functionban rakott object lesz benne 
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`)); //az index elérési útvonalát itt adjuk meg
})

app.get("/kismacska", (request, response, next) => {  // "http://127.0.0.1:9000/kismacska" oldalon a functionban rakott object lesz benne 
    response.sendFile(path.join(`${__dirname}/../frontend/somefile.json`)); //a somefile.json eléri útvonalát adjuk itt meg.
})

app.get("/api/v1/users", (request, response, next) => {  
    console.log("request recived or users endpoint endpoint")
    response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
 /*    const users = [
        {
            name : "John",
            surname : "Doe",    
            status : "active"
        },
        {
            name : "Jack",
            surname : "Dick",
            status: "passive"
        }
    ] */
/*     response.send(JSON.stringify(users))  */// ÍGy küldün json fájl a frontendnek, (JSON.stringfy-al alakítjuk át kompnak)
})

app.get("/api/v1/users/active", (request, response, next) => {
    fs.readFile("../frontend/users.json", (error, data) => {  //fs = filesystem, elérési útvonal, kettő para = error, és data
        if(error){
            response.send("something error while read the file")
        }else{
            const users = JSON.parse(data) //javascript objektumra konvertálja az adatot
            const activeUsers = users.filter(users => users.status ==="active")
            response.send(activeUsers)
        }

    })  
});

app.get("/api/v1/users/passive", (request, response, next) => { 
    fs.readFile("../frontend/users.json", (error, data) => {  //fs = filesystem, elérési útvonal, kettő para = error, és data
        if(error){
            response.send("something error while read the file")
        }else{
            const users = JSON.parse(data) //javascript objektumra konvertálja az adatot
            const passiveUsers = users.filter(users => users.status ==="passive")
            response.send(passiveUsers)
        }
    })  
});

app.get("/something", (request, response, next) => {  
    console.log("request recived or something endpoint")  
    response.send("Thank you for your request, this is our respone for something endpoint")
})

app.use('/public', express.static(`${__dirname}/../frontend/public`));

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})