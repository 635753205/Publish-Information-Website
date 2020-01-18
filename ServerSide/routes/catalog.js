const express = require('express')
const router  = express.Router()

//reuqire controller modules
const info_controller = require('../controllers/informationController')

const author_controller = require('../controllers/authorController')

const genre_controller = require('../controllers/genreController')

const info_instance_controller = require('../controllers/informationInstanceController')

//config the routes

//information routes

router.get('/',info_controller.index)

router.get('/infos',info_controller.information_list)


//auther routes

router.get('/authors',author_controller.author_list)


//genre routes
router.get('/genres',genre_controller.genre_list)


//information instance routes
router.get('/bookinstances',info_instance_controller.infoInstance_list)


module.exports = router
