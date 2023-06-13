const express = require("express")
const router = express.Router()

const collageController = require("../controller/collegeController")
const internController = require('../controller/internController')

router.post('/functionup/colleges',collageController.createCollage)

router.post('/functionup/interns',internController.createIntern)

router.get('/functionup/collegeDetails', internController.getdata)



router.all("/*", function (req, res) {
    res.status(400).send({ status: false, message: "Please Input valid URL." });
});



module.exports = router