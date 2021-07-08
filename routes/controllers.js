const db = require("../db/db")
const puppeteer = require('puppeteer');



////////////////
const idCourses = 1
const idLessons = 1

module.exports = {
    getSearch: (req, res) => {
        const { search } = req.params
        db.query(`SELECT 
        JSON_OBJECT(
        'idCourse', idCourses,
        'courseDescription', courseDescription,
        'courseName', courseName,
        'courseDescription', courseDescription,
        'Lessons', (SELECT JSON_ARRAYAGG(
                            JSON_OBJECT(
                            'idLesson', idLessons, 
                            'lessonName', lessonName
                            ))FROM Lessons WHERE Lessons.courseID = Courses.idCourses ))
     as Cursos FROM Courses  where courseName LIKE "%${search}%"`, (err, result) => {
            if (err) {
                console.log('erro ao fazer consulta')
            }
            res.send({ result })
        })
    },

    getEmbed: (req, res) => {
        const embedLink = req.query.link
        let embed = async () => {
            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            // await page.goto('https://scorm.telesapiens.com.br/EMPREE/L1/Aula-01/');
            await page.goto(embedLink);
            return await page.evaluate(() => {
                // return dataGeniallyOffline
                return dataBase64

            })
            //   await browser.close();
        }

        embed().then((result) => {
            res.header("Access-Control-Allow-Origin", "*");
            if (result == undefined) {
                res.send("carregando")
            } else {
                res.json(result)
            }
        })
    },


    getTest: (req, res) => {

        // const sqlSelect = "SELECT * From Courses"

        /////////////////////////////////////////// SELECT CORRETO PARA DB HOSTGATOR
        const sqlSelect = `SELECT JSON_OBJECT
        ('Courses',JSON_ARRAYAGG(
        	JSON_OBJECT(
            'courseName', courseName,
            'courseDescription', courseDescription,
            'idCourses', idCourses,
        	'Lessons', (SELECT JSON_ARRAYAGG(
        						JSON_OBJECT(
                                'lessonDescription', lessonDescription,
                                'embed', embed,
                                'timer', timer,
                                'theme', theme,
                                'lessonName', lessonName,
                                'idLesson', idLessons,
        						'Questoes', (SELECT JSON_ARRAYAGG(
        												JSON_OBJECT(
                                                        'idQuestion', idQuestions,
                                                        'questionName', questionName,
                                                        'questionType', questionType,
                                                        'correctAlternative', correctAlternative,
        												'Alternativas', (SELECT JSON_ARRAYAGG(
        																JSON_OBJECT(
                                                                        'alternativeName', alternativeName,
                                                                        'Images', (SELECT JSON_ARRAYAGG(
        																		JSON_OBJECT(
                                                                                'imageName', imageName,    
        																		'File',  TO_BASE64(file) )
        																							) FROM Images WHERE Images.alternativeID = Alternatives.idAlternatives ))
                                                                        ) FROM Alternatives WHERE Alternatives.questionID = Questions.idQuestions ))
        												)FROM Questions WHERE Questions.lessonID = Lessons.idLessons ))
        						)FROM Lessons WHERE Lessons.courseID = Courses.idCourses AND idLessons = ? ))
        )) as Cursos FROM Courses WHERE idCourses = ?`



        // AND idLessons = ?
        // WHERE idCourses = ? 

        db.query(sqlSelect, [idLessons, idCourses], (err, result) => {
            //console.log(result)
            res.send(result)
        })
    },


    getLesson: (req, res) => {
        const idLesson = req.query.idLesson
        const idCourse = req.query.idCourse
        //console.log("Requsitou idLesson" + idLesson)
        //console.log("Requisitou idCourse" + idCourse)

        const sqlSelect = `SELECT JSON_OBJECT
        ('Courses',JSON_ARRAYAGG(
        	JSON_OBJECT(
            'courseName', courseName,
            'courseDescription', courseDescription,
            'idCourse', idCourses,
        	'Lessons', (SELECT JSON_ARRAYAGG(
        						JSON_OBJECT(
                                'lessonDescription', lessonDescription,
                                'embed', embed,
                                'timer', timer,
                                'theme', theme,
                                'lessonName', lessonName,
                                'idLesson', idLessons,
        						'Questoes', (SELECT JSON_ARRAYAGG(
        												JSON_OBJECT(
                                                        'idQuestion', idQuestions,
                                                        'questionName', questionName,
                                                        'questionType', questionType,
                                                        'correctAlternative', correctAlternative,
        												'Alternativas', (SELECT JSON_ARRAYAGG(
        																JSON_OBJECT(
                                                                        'idAlternative', idAlternatives,
                                                                        'alternativeName', alternativeName,
                                                                        'Images', (SELECT JSON_ARRAYAGG(
        																		JSON_OBJECT(
                                                                                'imageName', imageName,    
        																		'File', TO_BASE64(file) )
        																							) FROM Images WHERE Images.alternativeID = Alternatives.idAlternatives ))
                                                                        ) FROM Alternatives WHERE Alternatives.questionID = Questions.idQuestions ))
        												)FROM Questions WHERE Questions.lessonID = Lessons.idLessons ))
        						)FROM Lessons WHERE Lessons.courseID = Courses.idCourses AND (idLessons) = (?) ))
        )) as Cursos FROM Courses WHERE (idCourses) = (?)`

        db.query(sqlSelect, [idLesson, idCourse], (err, result) => {
            // console.log("OLHA AQUI: " + result.data)
            res.send(result)
        })
    },

    getImage: (req, res) => {
        const sqlSelect =
            "SELECT * From Images"
        db.query(sqlSelect, (err, result) => {
            // console.log(result.data)
            res.send(result)
        })
    },

    postImage: (req, res) => {
        const alternativeID = req.params.id
        if (req.files) {

            const sqlInsert = "INSERT INTO Images (imageName, file, alternativeID) VALUES (?,?,?);"
            db.query(sqlInsert, [req.files.file.name, req.files.file.data, alternativeID], (err, result) => {
                if (err) {
                    res.send("Erro ao enviar arquivo")
                    console.log(err)
                    console.log(req.files)
                }
                res.send("Arquivo Recebido")
            })
        }
    },

    postResposta: (req, res) => {
        const userID = req.body.userID
        const questionID = req.body.questionID
        const resposta = req.body.resposta

        const sqlInsert = "INSERT INTO Grades (userID, questionID, grade) VALUES (?,?,?);"
        db.query(sqlInsert, [userID, questionID, resposta], (err, result) => {
            if (err) {
                res.send("Erro ao enviar resposta")
                console.log(err)
            }
            // res.send("Responta Enviada")
        })
    },

    ///////////////////////////////////////////// DELETE <<

    deleteQuestion: (req, res) => {
        const questionID = req.params.id
        const sqlDelete = "DELETE FROM Questions WHERE idQuestions = ?"
        db.query(sqlDelete, questionID, (err, result) => {
            if (err) console.log(err)
        })
    },

    deleteAlternative: (req, res) => {
        const alternativeID = req.params.id
        const sqlDelete = "DELETE FROM Alternatives WHERE idAlternatives = ?"
        db.query(sqlDelete, alternativeID, (err, result) => {
            if (err) console.log(err)
        })
    },

    deleteImage: (req, res) => {
        const imageID = req.params.id
        const sqlDelete = "DELETE FROM Images WHERE name = ?"
        db.query(sqlDelete, imageID, (err, result) => {
            if (err) console.log(err)
        })
    },


    ///////////////////////////////////////////// POST <<
    postCourse: (req, res) => {
        const courseName = req.body.courseName
        const courseDescription = req.body.courseDescription
        const sqlInsert = "INSERT INTO Courses (courseName, courseDescription) VALUES (?,?);"
        db.query(sqlInsert, [courseName, courseDescription], (err, result) => {
            // console.log(result)
        })
    },

    postLesson: (req, res) => {
        const lessonName = req.body.lessonName
        const lessonDescription = req.body.lessonDescription
        const courseID = req.params.id
        //console.log('recebeu ' + lessonName + ' e ' + lessonDescription + ' e ' + courseID)
        const sqlInsert = "INSERT INTO Lessons (lessonName, lessonDescription, courseID) VALUES (?,?,?);"
        db.query(sqlInsert, [lessonName, lessonDescription, courseID], (err, result) => {
            //console.log(err)
        })
    },

    postQuestion: (req, res) => {
        const questionName = req.body.questionName
        const questionType = req.body.questionType
        const correctAlternative = req.body.correctAlternative
        const lessonID = req.params.id
        const sqlInsert = "INSERT INTO Questions (questionName, questionType, lessonID, correctAlternative) VALUES (?,?,?,?);"
        db.query(sqlInsert, [questionName, questionType, lessonID, correctAlternative], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    postAlternative: (req, res) => {
        const alternativeName = req.body.alternativeName
        const questionID = req.params.id
        const sqlInsert = "INSERT INTO Alternatives (alternativeName,questionID) VALUES (?,?);"
        db.query(sqlInsert, [alternativeName, questionID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    updateCorrectAlternative: (req, res) => {
        const correctAlternative = req.body.correctAlternative
        const questionID = req.params.id
        const sqlInsert = "UPDATE Questions SET correctAlternative = ? WHERE idQuestions = ?"
        db.query(sqlInsert, [correctAlternative, questionID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    updateAlternativeName: (req, res) => {
        const newAlternativeName = req.body.newAlternativeName
        const alternativeID = req.params.id
        const sqlInsert = "UPDATE Alternatives SET alternativeName = ? WHERE idAlternatives = ?"
        db.query(sqlInsert, [newAlternativeName, alternativeID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    updateQuestionName: (req, res) => {
        const newQuestionName = req.body.newQuestionName
        const questionID = req.params.id
        const sqlInsert = "UPDATE Questions SET questionName = ? WHERE idQuestions = ?"
        db.query(sqlInsert, [newQuestionName, questionID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    updateEmbed: (req, res) => {
        const embed = req.body.embed
        const lessonID = req.params.id
        const sqlInsert = "UPDATE Lessons SET embed = ? WHERE idLessons = ?"
        db.query(sqlInsert, [embed, lessonID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    updateTimer: (req, res) => {
        const timer = req.body.timer
        const lessonID = req.params.id
        const sqlInsert = "UPDATE Lessons SET timer = ? WHERE idLessons = ?"
        db.query(sqlInsert, [timer, lessonID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },

    updateTheme: (req, res) => {
        const theme = req.body.theme
        const lessonID = req.params.id
        const sqlInsert = "UPDATE Lessons SET theme = ? WHERE idLessons = ?"
        db.query(sqlInsert, [theme, lessonID], (err, result) => {
            console.log(result)
            console.log(err)
        })
    },



    ///////////////////////////////////////////// GET <<
    // getCourse: (req, res) => {
    //     const sqlSelect =
    //         "SELECT * From Courses"
    //     db.query(sqlSelect, (err, result) => {
    //         console.log(result)
    //         res.send(result)
    //     })

    // },

    getCourse: (req, res) => {
        const sqlSelect =
            `SELECT 
        	JSON_OBJECT(
            'idCourse', idCourses,
            'courseDescription', courseDescription,
            'courseName', courseName,
            'courseDescription', courseDescription,
        	'Lessons', (SELECT JSON_ARRAYAGG(
        						JSON_OBJECT(
                                'idLesson', idLessons, 
                                'lessonName', lessonName
        						))FROM Lessons WHERE Lessons.courseID = Courses.idCourses ))
         as Cursos FROM Courses `
        db.query(sqlSelect, (err, result) => {
            //console.log(result)
            res.send(result)
        })

    },

    ///////////////////////////////////////////// DELETE <<
    deleteCourse: (req, res) => {
        const courseID = req.params.courseID
        const sqlDelete = "DELETE FROM Courses WHERE idCourses = ?"
        db.query(sqlDelete, courseID, (err, result) => {
            if (err) console.log(err)
        })
    },

    deleteLesson: (req, res) => {
        const lessonID = req.params.lessonID
        const sqlDelete = "DELETE FROM Lessons WHERE idLessons = ?"
        db.query(sqlDelete, lessonID, (err, result) => {
            if (err) console.log(err)
        })
    },

    ///////////////////////////////////////////// PUT <<
    updateCourse: (req, res) => {
        const courseDescription = req.body.courseDescription
        const courseID = req.params.id
        const sqlUpdate = "UPDATE Courses SET courseDescription = ? WHERE idCourses = ?"
        db.query(sqlUpdate, [courseDescription, courseID], (err, result) => {
            if (err) console.log(err)
        })
    },

    getGrades: (req, res) => {

        const sqlSelect = `
        SELECT nomeUser, grade, questionName FROM DBTelesapiens.Users
            INNER JOIN Grades
                INNER JOIN Questions
                     WHERE userID = idUsers AND questionID = idQuestions
            `
        db.query(sqlSelect, (err, result) => {
            //console.log(result)
            res.send(result)
        })
    }


}