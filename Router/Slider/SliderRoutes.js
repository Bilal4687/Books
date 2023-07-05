const express = require('express');

const SliderController = require('../../Controller/Slider/SliderController');

const route = express.Router();

route.get('/SliderFetch',SliderController.SliderFetch);
route.post('/SliderStore', SliderController.SliderStore);

module.exports = route;