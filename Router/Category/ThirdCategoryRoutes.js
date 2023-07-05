const express = require('express');

const ThirdCategoryController = require('../../Controller/Category/ThirdCategoryController');

const route = express.Router();

route.get('/ThirdCategoryFetch',ThirdCategoryController.ThirdCategoryFetch);
route.post('/ThirdCategoryStore', ThirdCategoryController.ThirdCategoryStore);
route.get('/ThirdCategoryEdit', ThirdCategoryController.ThirdCategoryEdit);
route.get('/ThirdCategoryRemove', ThirdCategoryController.ThirdCategoryRemove);

module.exports = route;