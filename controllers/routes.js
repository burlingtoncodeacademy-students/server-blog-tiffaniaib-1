const router = require("express").Router()
const { read, save } = require("../rc/functions")
const { v4: uuid_v4 } = require("uuid") // it's used to randomly generate IDs
const apiPath = "./api/blog.json"


// endpoint - GET ALL COMMENTS
//? GET api/
// endpoint - GET ONE COMMENT
//? GET api/:id
// endpoint - CREATE NEW COMMENT
//? POST api/create
router.post("/create", (req, res) => {
    try {
        const id = uuid_v4()
        const api = read(apiPath)
        let newComment = req.body
        req.body.post_id = id
        api.push(newComment)
        save(api, apiPath)
    } catch(err) {
        console.log(err)
    }
})
// endpoint - UPDATE COMMENT
//? PUT api/update/:id
// endpoint - DELETE COMMENT
//? DELETE api/delete/:id


module.exports = router