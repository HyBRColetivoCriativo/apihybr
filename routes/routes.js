const express = require("express");
const router = express.Router()
const course = require("./course.js")
const api = require("./controllers")
const path = require('path');

router.get("/", course.getCourse)
// router.post("/", course.postCourse)

////////endpoints Júlio///////

router.post("/course", api.postCourse)
router.get('/courses', api.getCourse)
router.put("/course/:id", api.updateCourse)
router.get('/embed', api.getEmbed)  /////
router.get('/course/:search', api.getSearch)





router.delete("/course/:id", api.deleteCourse)
router.delete("/question/:id", api.deleteQuestion)
router.delete("/alternative/:id", api.deleteAlternative)
router.delete("/image/:id", api.deleteImage)

router.get("/test", api.getTest)

router.get("/lesson", api.getLesson)
router.post("/lesson/:id", api.postLesson)
router.post("/question/:id", api.postQuestion)
router.post("/alternative/:id", api.postAlternative)
router.post("/updateCorrectAlternative/:id", api.updateCorrectAlternative)
router.post("/updateAlternativeName/:id", api.updateAlternativeName)
router.post("/updateQuestionName/:id", api.updateQuestionName)
router.post("/updateEmbed/:id", api.updateEmbed)
router.post("/updateTimer/:id", api.updateTimer)
router.post("/updateTheme/:id", api.updateTheme)

router.post("/image/:id", api.postImage)

router.post('/resposta', api.postResposta)
router.get("/resposta", api.getGrades)

module.exports = router;