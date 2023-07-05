const express = require('express');

const db = require('../../DB/db');

const joi = require('joi');

exports.ThirdCategoryFetch = (req, res) => {
    db.query("SELECT * FROM category__third", (err, data) => {
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

exports.ThirdCategoryStore = (req,res) => {
    var ThirdCategory = req.body;

    var query;
    var cond;
    
    if(ThirdCategory.third_category_id){
        query = "UPDATE category__third SET ? WHERE third_category_id = ?";
        cond = [ThirdCategory, ThirdCategory.third_category_id];
    }else{
        query = "INSERT INTO category__third SET ? ";
        cond  = [ThirdCategory];
    }

    if(ThirdCategory.third_category_id){
        executeQuery(query, cond);
    }else{
        var JoiSchema = joi.object({
            third_category_name : joi.string().required()
        });

        var validate = JoiSchema.validate({
            third_category_name:  ThirdCategory.third_category_name 
        })
        if(typeof validate.error !== 'undefined'){         
            return res.json({validate : false, message : validate.error.details[0].message });
        }else{
            executeQuery(query, cond);
        }
    }
    function executeQuery(query,cond){
        ThirdCategory.third_category_slug = ThirdCategory.third_category_name.replace(/[\s?\.\-]/g, '_');
        db.query(query, cond, (err, data) => {
            if(err){
                return res.json({success : false, message : err});
            }else{
                return res.json({success : true, message : `Third Category ${ThirdCategory.third_category_id ? "Updated" : "Created"} Successfully`});
            }
        });
    }
}

exports.ThirdCategoryEdit = (req, res) => {
    var third_category_id = req.query.third_category_id;
    db.query("SELECT * FROM category__third WHERE third_category_id = ?",third_category_id, (err, data) => {
        if(err){
            return res.json({success : false, message : err});
        }else{
            if(!data.length){
                return res.json({success : false, message : `Data Not Found With This Id ${third_category_id}`});
            }else{
                return res.json({success : true, message : data});
            }
        }
    });
}
exports.ThirdCategoryRemove = (req, res) => {
    
    db.query("DELETE FROM category__third WHERE third_category_id = ? ", [req.query.third_category_id], (err, data) => {
        if(err){
            return res.json({success : false, message : err})
        }else{
            if(data.affectedRows){
                return res.json({success : true, message : "Third Category Remove Successfully...!"});
            }else{
                return res.json({success : false, message : "Data Not Available to Delete."})
            }
        }
    })
}