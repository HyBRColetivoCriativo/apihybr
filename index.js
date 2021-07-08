const app = require("express")();
const upload = require('express-fileupload')
const session = require('express-session')
const bodyParser = require("body-parser")
const cors = require("cors")
const routes = require("./routes/routes")
const PORT = 5000
const db = require("./db/db")
const puppeteer = require('puppeteer');
const path = require('path')

// Add headers



// app.get('/embed', (req, res) => {

//     

//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//      const idLesson = req.query.idLesson
//     const embedLink = ''
//     const sqlSelect =
//         "SELECT embed From Courses WHERE idCourses = ?"
//     db.query(sqlSelect, [idLesson], (err, result) => {
//         // console.log(result.data)
//         embedLink = result
//     })

//     let embed = async () => {
//         await page.goto(embedLink);
//         return await page.evaluate(() => {
//             return dataGeniallyOffline
//         })
//         //   await browser.close();
//     }
//     embed().then((result) => {
//         res.header("Access-Control-Allow-Origin", "*");
//         if (result == undefined) {
//             res.send("carregando")
//         } else {
//             res.json(result.Slides)
//         }
//     })
// })


app.use(session({
    secret: "ahdkshsnq133",
    cookie: {
        maxAge: 120000 * 24
    }

}))
app.use(bodyParser.json());
app.use(cors())
app.use(upload())
app.use("/api", routes)






// app.get('/genialy', function (req, res) {
//     res.sendFile(path.join('/Users/nectar/GitHub/telesapiens-workspace/apihybr/genialy' + '/genially.html'));
// });

app.listen(PORT, () => {
    console.log("running server...")
})
