const express = require("express")
const graphHTTP = require("express-graphql")
const schema = require("./schema/schema")

const app = express()

app.use("/graphql", graphHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('listening for request at port 4000')
})