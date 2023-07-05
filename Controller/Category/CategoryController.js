const express = require('express');

const db = require('../../DB/db');

exports.CategoryStore = (req, res) => {
    var Category = req.body;

     
    if(!Category.category_name){
        return res.json({validate : true, message : "Category Name is required..."})
    }

    var slug = Category.category_name.replace(/[\s?\.\-]/g, '_')
    var query = "INSERT INTO category SET ? ";
    var cond = [Category]

    if(Category.category_id){

        query = "UPDATE category SET ? WHERE category_id = ?";
        cond = [Category, Category.category_id];
        
    }
    Category.category_slug = slug

    db.query(query, cond, (err, data) => {
        if(err){
            return res.json({success :  false, message : err});
        }else{
            return res.json({success : true, message : `Category ${Category.category_id ? "Updated" : "Created"} Successfully...! `})
        }
    })
}

// exports.CategoryEdit = (req, res) => {
//     db.query('SELECT * FROM category WHERE category_id = ? ', [req.query.category_id],(err, data) => {
//         if(err){
//             return res.json({success : false, message : err});
//         }else{
//             return res.json({success : true, data : data});
//         }
//     })
// }
exports.CategoryEdit = (req, res) => {
    db.query('SELECT * FROM category WHERE category_id = ?', [req.query.category_id], (err, data) => {
        if(err){
            return res.json({success : false, message : err});
        }else{
            if(!data.length){
                return res.json({success : false, message : "no data"});
            }
            return res.json({success : true, message : data});
        }
    })
}

exports.CategoryFetch = (req, res) => {
    db.query('SELECT * FROM category', (err, data) => {
        if(err){
            return res.json({sucess : false, message : err});
        }else{
            return res.json({success : true, message : data})
        }
    })
}
exports.CategoryRemove = (req, res) => {
    db.query('DELETE FROM category WHERE category_id = ?', [req.query.category_id] ,(err, data) => {
        if(err){
            return res.json({success : false, message : err});
        }else{
            return res.json({success : true, message : 'Category Remove Successfully'});
        }
    })
}