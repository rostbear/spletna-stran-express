const express = require('express')
const app = express()
const expbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.engine('handlebars', expbs.engine({defaultLayout: "main"}))
app.set('view engine', 'handlebars')

var cors = require('cors')
const { Script } = require('vm')
app.use(cors())

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.render('home', {
        css: "stylehome.css"
        
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        css:"stylelogin.css"
    })
})

var vsiMaili = ["admin@urnik.com", "dijak@urnik.com", "profesor@sola.edu.it"]
var vsaGesla = ["urnik123", "dijak456", "Prof.zizi"]

app.post('/form-submit', (req, res) => {
    var email = req.body.email
    var password = req.body.password

    console.log("Email:", email, "Password:", password)

    if (vsiMaili.includes(email)) {
        var index = vsiMaili.indexOf(email)
        console.log(index)

        if (password == vsaGesla[index]) {
            res.render('afterlogin', {
                email: email,
                css:"afterlogin.css"
            })
        } else {
            res.render('login', {
                napaka: true,
                sporocilo: "Geslo ni pravilno",
                css:"stylelogin.css"
            })
        }
    } else {  
        res.render('login', {
            napaka: true,
            sporocilo: "Mail ne obstaja",
            css:"stylelogin.css"
        })
        console.log("Mail ne obstaja")
    } 
})

app.get('/signin', (req, res) => {
    res.render('signin', {
        css:"stylesignin.css"
    })
})

app.post('/form-submit-signin', (req, res) => {
    var email = req.body.email
    var password = req.body.password

    console.log("Email:", email, "Password:", password)

    if (vsiMaili.includes(email)) {
        var index = vsiMaili.indexOf(email)

        if (email == vsiMaili[index]) {
            res.render('signin', {
                css:"stylesignin.css",
                napaka: true,
                sporocilo: "E-mail ze v rabi"
            })
        }
        if ((email == vsiMaili[index]) && (password == vsaGesla[index])) {
            res.render('signin', {
                css:"stylesignin.css",
                napaka: true,
            })
        }
    }
    else {
        res.render('afterlogin', {
            css:"afterlogin.css",
            email:email
        })
    }
})

app.listen(3000, () => {
    console.log("Dela")
})