const router = require("express").Router()
const { read, save } = require("../rc/functions")
const { v4: uuid_v4 } = require("uuid") // it's used to randomly generate IDs
const apiPath = "./api/blog.json"


// endpoint - GET ALL COMMENTS
//? GET api/
router.get("/", (req, res) => {
    try {
        const allComments = read(apiPath)
        res.status(200).json({ allComments })
    } catch {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// endpoint - GET ONE COMMENT
//? GET api/:id
router.get("/:id", (req, res) => {
    try {
        const { id } = req.params
        const api = read(apiPath)
        const itemRequested = api.find(comment => comment.post_id === id)
        if (!itemRequested) throw Error("No comment found")
        res.status(200).json({
            itemRequested
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

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
    } catch (err) {
        res.status(500).json({
            message: `${err}`
        })
    }
})

// endpoint - UPDATE COMMENT
//? PUT api/update/:id
router.put("/update/:id", (req,res) => {
    try {
        const { id } = req.params
        const api = read(apiPath)
        // Find te index of the comment that we need from the database
        const found = api.findIndex(comment => comment.post_id === id)
        
        api[found].title = req.body.title ?? api[found].title  // Update the title of the found element with the value from the request body, 
                                                               // or keep the original title if the request body does not contain a title
        api[found].author = req.body.author ?? api[found].author 
        api[found].body = req.body.body ?? api[found].body

        save(api, apiPath)

        res.status(200).json({
            message: 'Update successful',
            data: api[found]
        })
    } catch(err) {
        console.log(err)
        res.status(500).json({
            message: `${err}`
        })
    }
})

// endpoint - DELETE COMMENT
//? DELETE api/delete/:id
// router.delete("/:id", (req, res) => {
//     try{
//         const { id } = req.params
//         const api = read(apiPath)
//         const itemRequested = api.find(comment => comment.post_id === id)
//         if (!itemRequested) throw Error("No comment found")
//         const deleted = api.splice()
//         res.status(200).json({

//         })

//     }catch(err){}
// })



module.exports = router