const router = require("express").Router()
const { read, save } = require("../rc/functions")
const { v4: uuid_v4 } = require("uuid") // it's used to randomly generate IDs
const apiPath = "./api/blog.json"


// endpoint - GET ALL COMMENTS
//? GET api/
router.get("/", (req,res) => {
    try {
    const allComments = read(apiPath) 
    res.status(200).json({ allComments })
    }catch{
    res.status(500).json({
        message: `${err}`
    })
    }
})

// endpoint - GET ONE COMMENT
//? GET api/:id


// endpoint - CREATE NEW COMMENT
//? POST api/create
router.post("/create", (req, res) => {
    try {
        const id = uuid_v4()
        const api = read(apiPath)
        if (Object.keys(req.body).length === 0) {
            throw Error("The post content cannot be empty")
        }
        let newComment = req.body
        req.body.post_id = id
        api.push(newComment)
        save(api, apiPath)
    } catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// endpoint - UPDATE COMMENT
//? PUT api/update/:id


// endpoint - DELETE COMMENT
//? DELETE api/delete/:id




module.exports = router