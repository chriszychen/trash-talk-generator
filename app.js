const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const generateTrashTalk = require('./util/generateTrashTalk.js')

const PORT = process.env.PORT || 3000

app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { role } = req.body
  if (!role) return res.render('index', { unselect: true })
  const trashTalk = generateTrashTalk(role)
  return res.render('index', { trashTalk })
})

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))
