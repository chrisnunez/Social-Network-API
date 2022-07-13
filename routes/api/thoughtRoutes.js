const router = require('express').Router();
const {
    gettAllThoughts,
    getSingleThought,
    postNewThought,
} = require('../../controllers/thoughtController')

router.route('/').get(gettAllThoughts).post()