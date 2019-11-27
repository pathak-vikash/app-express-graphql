const express = require("express")
const graphHTTP = require("express-graphql")
const schema = require("./schema/schema")
const mongoose = require("mongoose")

const app = express()


mongoose.connect('mongodb+srv://express-graphql:H23FjcbBEusSJAJ@cluster0-eqfbh.gcp.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log("Connected to database");
})


app.use("/graphql", graphHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('listening for request at port 4000')
})