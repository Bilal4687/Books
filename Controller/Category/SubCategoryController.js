const express = require('express');

const db = require('../../DB/db');

const Joi = require('joi');

exports.SubCategoryFetch = (req, res) => {
    
    var SubCategory = req.body;

    db.query("SELECT * FROM category__sub ",(err, data) => {
        if(err){
            return res.json({success : false, message : err});
        }else{
            return res.json({success : true, message : data});
        }
    })

}

exports.SubCategoryStore = (req, res) => {

    var SubCategory = req.body;
    
    var query;
    var cond;
    
    
    if(SubCategory.sub_category_id){
        var query = "UPDATE category__sub SET ? WHERE sub_category_id = ?";
        var cond = [SubCategory, SubCategory.sub_category_id];
    }else{    
        var query = "INSERT INTO category__sub SET ?";
        var cond = [SubCategory];
    }
    if(SubCategory.sub_category_id){
        executeQuery(query, cond)
    }else{
        var JoiSchema = Joi.object({
            sub_category_name: Joi.string()
            .required()
        });
        var validate = JoiSchema.validate({
            sub_category_name: SubCategory.sub_category_name 
        })
        if (typeof validate.error !== 'undefined')
        {
            return res.json({ validate: false, message: validate.error.details[0].message });
        }else{
            SubCategory.sub_category_slug = SubCategory.sub_category_name.replace(/[\s?\.\-]/g, '_');   
            executeQuery(query, cond);
        }
    }
    
    function executeQuery(query, cond){

        db.query(query,cond,(err, data) => {
            if(err){
                return res.json({success : false, message : err});
            }else{
                return res.json({success : true, message : `Sub Category ${SubCategory.sub_category_id ? "Update" : "Create"} Successfully..!`, data : SubCategory});
            }
        });    
    }
}

exports.SubCategoryEdit = (req, res) => {
    db.query("SELECT * FROM category__sub WHERE sub_category_id = ?",[req.query.sub_category_id], (err, data) => {
        if(err){
            return res.json({success : false, message : err});
        }else{
            if(!data.length){
                return res.json({success : false, message : "Data Not Found"});
            }else{
                return res.json({success : true, message : data});
            }
        }
    })
}

exports.SubCategoryRemove = (req, res) =>{
    
    db.query("DELETE FROM category__sub WHERE sub_category_id = ?", [req.query.sub_category_id], (err, data) => {

        if(err){
            return res.json({success : false, message : err});
        }else{
            if(data.affectedRows == 0){
                return res.json({success : false, message : "Data Not Found...!"});
            }else{
                return res.json({success : true, message : "Sub Category Remove Successfully...!"});
            }
        }
    })
}