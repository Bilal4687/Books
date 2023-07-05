const express = require('express');

const route = express.Router();

const CategoryController = require('../../Controller/Category/CategoryController')


route.post('/CategoryStore',CategoryController.CategoryStore);
route.get('/CategoryEdit',CategoryController.CategoryEdit);
route.get('/CategoryFetch',CategoryController.CategoryFetch);
route.get('/CategoryRemove',CategoryController.CategoryRemove);

module.exports = route;    