const express = require("express");  //ezek a csomagok amike kelleni fognak
const req = require("express/lib/request");
const fs = require("fs")
const path = require("path")

const app = express(); //változóba mentjünk az express függvényt
const port = 9000

app.use(express.json()) //EZ mindig kell a post metódushoz!!!!!!!!!!!

const fFolder = `${__dirname}/../frontend`
app.use('/public', express.static(`${fFolder}/public`));
const userFile = path.join(`${__dirname}/../frontend/users.json`)

app.get("/", (request, response, next) => {  // "http://127.0.0.1:9000/" oldalon a functionban rakott object lesz benne 
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`)); //az index elérési útvonalát itt adjuk meg
})

app.get("/admin/order-view", (request, response, next) => { 
    response.sendFile(path.join(`${__dirname}/../frontend/index.html`)); 
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

/* app.get("/api/v1/users/active", (request, response, next) => {
    fs.readFile("../frontend/users.json", (error, data) => {  //fs = filesystem, elérési útvonal, kettő para = error, és data
        if(error){
            response.send("something error while read the file")
        }else{
            const users = JSON.parse(data) //javascript objektumra konvertálja az adatot
            const activeUsers = users.filter(users => users.status ==="active")
            response.send(activeUsers)
        }

    })  
}); */

/* app.get("/api/v1/users/passive", (request, response, next) => { 
    fs.readFile("../frontend/users.json", (error, data) => {  //fs = filesystem, elérési útvonal, kettő para = error, és data
        if(error){
            response.send("something error while read the file")
        }else{
            const users = JSON.parse(data) //javascript objektumra konvertálja az adatot
            const passiveUsers = users.filter(users => users.status ==="passive")
            response.send(passiveUsers)
        }
    })  
}); */

app.get("/something", (request, response, next) => {  
    console.log("request recived or something endpoint")  
    response.send("Thank you for your request, this is our respone for something endpoint")
})

app.get("/api/v1/users-query", (request, response, next) => {  
    console.dir(request.query.apiKey)
    if(request.query.apiKey === "apple"){
        response.sendFile(path.join(`${__dirname}/../frontend/users.json`));
    }else{
        response.send("Unauthurized request")
    }
    
})

app.get("/api/v1/users/:key", (request, response, next) => {  
    console.dir(request.params)
    console.log(request.params.key)
    if(request.params.key === "active"){
        response.send("You write apple")    
    }else{
        response.send("You dont write")
    }
    response.send("hello")
    
})

app.get("/api/v1/users-params/:key", (request, response, next) => {  
    console.dir(request.params)
    console.log(request.params.key)

    fs.readFile(userFile, (error, data) => { 
        const users = JSON.parse(data) //javascript objektumra konvertálja az adatot

        if(request.params.key === "active"){
           
            response.send(users.filter(users => users.status ==="active"))
                
        }else if(request.params.key === "passive"){

            response.send(users.filter(users => users.status ==="passive"))

        }else{

            response.send("Something wrong")

        }

    })
    
})

/* ---------------------------------------Post----------------------------------------(Az elején van egy app.use!!!) */

app.post("/users/new", (req, res) => {  //Itt jelöljük ki a post
    fs.readFile(`${fFolder}/users.json`, (error, data) => {  //Itt magát a változtatni kívánt mappát jelöljük ki
        if(error){  //Ha nem sikerült, csókolom
            console.log("error")
            res.send("Error reading")
        }else{
            const users = JSON.parse(data) //Ha sikerül, akkor JSON fájlra konvertálja
            console.log(req.body)

            users.push(req.body)  //itt pusholja bele az új változóba
                
                fs.writeFile(`${fFolder}/users.json`, JSON.stringify(users), error => {  //Itt írjuk bele a fájlba,végleg
                    if (error){
                        console.log(error)
                        res.send("Error van bástya")
                    }
                })
                res.send(req.body)
        }
    })
})



app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})