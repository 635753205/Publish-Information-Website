const express = require('express')
const router = express.Router()

//reuqire controller modules
const info_controller = require('../controllers/informationController')

const author_controller = require('../controllers/authorController')

const genre_controller = require('../controllers/genreController')

const info_instance_controller = require('../controllers/informationInstanceController')

const login_controller = require('../controllers/loginController')

const signup_controller = require('../controllers/signupController')
//config the routes

//information routes

router.get('/', info_controller.index)

router.get('/informations', info_controller.information_list)

router.get('/information/create', info_controller.information_create_get)

router.post('/information/create', info_controller.information_create_post)

router.get('/information/:id/delete', info_controller.information_delete_get)

router.post('/information/:id/delete', info_controller.information_delete_post)

router.get('/information/:id/update', info_controller.information_update_get)

router.post('/information/:id/update', info_controller.information_update_post)

router.get('/information/:id', info_controller.information_detail)


//auther routes

router.get('/authors', author_controller.author_list)

router.get('/author/create', author_controller.author_create_get)

router.post('/author/create', author_controller.author_create_post)

router.get('/author/:id/delete', author_controller.author_delete_get)

router.post('/author/:id/delete', author_controller.author_delete_post)

router.get('/author/:id/update', author_controller.author_update_get)

router.post('/author/:id/update', author_controller.author_update_post)

router.get('/author/:id', author_controller.author_detail)


//genre routes
router.get('/genres', genre_controller.genre_list)

router.get('/genre/create', genre_controller.genre_create_get)

router.post('/genre/create', genre_controller.genre_create_post)



router.get('/genre/:id/delete', genre_controller.genre_delete_get)

router.post('/genre/:id/delete', genre_controller.genre_delete_post)

router.get('/genre/:id/update', genre_controller.genre_update_get)

router.post('/genre/:id/update', genre_controller.genre_update_post)
router.get('/genre/:id', genre_controller.genre_detail)


//information instance routes
router.get('/informationinstances', info_instance_controller.infoInstance_list)

router.get('/informationinstance/create', info_instance_controller.infoInstance_create_get)

router.post('/informationinstance/create', info_instance_controller.infoInstance_create_post)


router.get('/informationinstance/:id/delete', info_instance_controller.infoInstance_delete_get)

router.post('/informationinstance/:id/delete', info_instance_controller.infoInstance_delete_post)

router.get('/informationinstance/:id/update', info_instance_controller.infoInstance_update_get)

router.post('/informationinstance/:id/update', info_instance_controller.infoInstance_update_post)

router.get('/informationinstance/:id', info_instance_controller.infoInstance_detail)



// router.get('/signup',signup_controller.user_signup_get)

// router.get('/signup',signup_controller.user_signup_post)

// router.get('/login',login_controller.user_login_get)

// router.post('/login',login_controller.user_login_post)

// router.post('/user/signup',login_controller.user_signup_form)

module.exports = router
