const express = require('express');

const SubCategoryController = require('../../Controller/Category/SubCategoryController');

const route = express.Router();

route.get('/SubCategoryFetch',SubCategoryController.SubCategoryFetch);
route.post('/SubCategoryStore',SubCategoryController.SubCategoryStore);
route.get('/SubCategoryEdit',SubCategoryController.SubCategoryEdit);
route.get('/SubCategoryRemove',SubCategoryController.SubCategoryRemove);

module.exports = route;