const express = require("express")
const app = express()
const fs = require("fs")
require("dotenv").config()

app.get("/", (req, res) => {
    const data = Buffer.from(fs.readFileSync("./sample-collection.json")).toString()
    const collection = JSON.parse(data)
    const collectionName = collection.info.name
    const baseUrlVar = req.query.baseUrlVar
    const tokenVar = req.query.tokenVar
    const queryRootFolder = collectionName.replace(/\s/g, '')
    
    if (!fs.existsSync(queryRootFolder)) {
        fs.mkdirSync(queryRootFolder, {
            recursive: true
        });
    }

    collection.item.forEach((folder) => {
        let code = `
            import axios from "axios";
            import {
                useQuery,
            } from "@tanstack/react-query";
        `;
        folder.item.forEach((request) => {
            let route = request.name.replace(/\s/g, '')
            let hookName = "use" + route.replace(/\s/g, '').charAt(0).toUpperCase() + route.slice(1)
            const keyName = route.toLowerCase();
            const url = baseUrlVar
                ? baseUrlVar+"/"+request.request.url.path.join("/")
                : request.request.url.raw
            const method = request.request.method.toLowerCase()
            let body = false
            if (request.request.body) {
                bodyObj = JSON.parse(request.request.body.raw)
                body = "{";
                Object.keys(bodyObj).map((item) => {
                    body+=`${item}:"${bodyObj[item]}",
                    `
                })
                body+="}"
            }

            code +=
                `
                export const ${hookName} = () => {
                    return useQuery({
                        queryKey: ["${keyName}"],
                        queryFn: async () => {
                            const { data } = await axios.${method}("${url}",
                            ${body ? body + "," : ""}
                            {
                                headers: {
                                    "Content-Type": "aplication/json",
                                    Authorization: "Bearer "+${tokenVar ? tokenVar : "ENTER_YOUR_TOKEN_HERE"}
                                }
                            })
                            return data
                        }
                    })
                }`
        })
        fs.writeFileSync(`${queryRootFolder}/${folder.name}Query.js`, code)
        return res.send("Your files were generated successfully")
    })

})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to server on ${port}`)
})
