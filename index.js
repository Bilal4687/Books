const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));

const CategoryRoutes = require('./Router/Category/Category');
const SubCategoryRoutes = require('./Router/Category/SubCategoryRoutes');
const ThirdCategoryRoutes = require('./Router/Category/ThirdCategoryRoutes');
const SliderRoutes = require('./Router/Slider/SliderRoutes');

app.use('/Category',CategoryRoutes);
app.use('/SubCategory', SubCategoryRoutes);
app.use('/ThirdCategory', ThirdCategoryRoutes);
app.use('/Slider', SliderRoutes);

app.listen(444,() => {
    console.log('Work Fine');
})