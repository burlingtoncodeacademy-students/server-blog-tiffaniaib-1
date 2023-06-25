require("dotenv").config()
const express =  require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || "127.0.0.1"

const commentsRouter = require("./controllers/routes")

// Without `express.json()` `req.body` is undefined
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", commentsRouter)

app.listen(PORT, HOST, () => {
    console.log(`[server] listening on ${HOST}:${PORT}`)
})