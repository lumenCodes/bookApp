const {Router} =  require('express') 
const appRoutes = Router()
const { ulid } = require('ulid')


let db = []
appRoutes.get('/home', (req, res) => {

    res.send(`
    <h3>This book app will be used to display the list of books that a user has created</h3>
    <ul>
        ${db.map((book) => `<li> ${book.name}</li>`).join(" ")}
    </ul>
    `
    )}
)

appRoutes.post('/createBook', (req, res) => {
    const index = db.length - 1
    const newBook =
    {
        // id: index + 1,
        id: ulid(),
        name: req.body.name,
        createdAt: new Date()
    }

    
    db.push(newBook)
    res.send(db)
})

appRoutes.patch('/updateBook', (req, res) => {
    let incomingUpdate = req.body

    incomingUpdate.name = req.body.name
    incomingUpdate.id = req.body.id

    let updateItem = db.filter(((x) => x.id == incomingUpdate.id))
    updateItem[0].name = req.body.name
    db.push(updateItem)
    res.send(updateItem)


})

appRoutes.post('/search', (req, res) => {
    const myRegex = /jhj/
    let searchTerm  = req.body.search// or param?
    const searchAction = searchTerm.exec(db)
    {
        const returnedBooks= db.filter(myRegex)

        res.send(returnedBooks)
    }
})

appRoutes.delete('/deletebook', (req, res) => {
    if (req.body !== Number && req.body == 0) {
        res.send('invalid request')
    }
    const updatedBooks = db.filter((book) => book.id !== req.body.id)
    db = updatedBooks

    res.send(db)
})

module.exports = appRoutes