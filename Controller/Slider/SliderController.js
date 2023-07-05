const express = require('express');

const db = require('../../DB/db');

const joi = require('joi');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const { log } = require('console');



exports.SliderFetch = (req, res) => {
    db.query("SELECT * FROM sliders",(err, data) => {
      if(err){
        return res.json({success : false, message : err});
      }else{
        return res.json({success : true, message : data});
      }
    })
}

exports.SliderStore = (req, res) => {

  var form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
      var slider_id = fields.slider_id;
      delete fields.slider_id  

      // Validation Start
      const schema = joi.object({
        slider_heading: joi.required(),
        slider_caption: joi.required(),
        slider_link: joi.required(),
        slider_bg_color: joi.required(),
        slider_position : joi.required()
      })
      var validate = schema.validate(fields)
  
      if (typeof validate.error !== 'undefined') 
      {
         return res.json({ validate: false, message: validate.error.details[0].message });
      }
      // Validation End

      // Image Handling
      if (files.slider_image) {
          const image = files.slider_image;
          // fields.slider_image = (Math.random() + 1)+(image.originalFilename).toString(16).replace(/ /g,"_").trim();
          fields.slider_image = (Math.random() + 1).toString(16)+(image.originalFilename).replace(/ /g,"_").trim();
          const filePath = path.join(__dirname, '../../Public/Sliders/')+fields.slider_image;
          //Saving Image
          fs.rename(files.slider_image.filepath, filePath, (err) => {
              if (err) return res.json({success: false, err: err, message: "Oops Something went wrong"});
          });
          if(slider_id){
            db.query("SELECT * FROM sliders WHERE slider_id = ?",[slider_id], (err, data) => {
              fs.unlink(path.join(__dirname, '../../Public/Sliders/')+data[0].slider_image, (err,data) => {
                if(err){
                  return res.json({success : false, err : err, message : "Opps Something Went Wrong"});
                }
              })
            })
          }

      }else{
          if(!slider_id)
              return res.json({ validate: false, message: "Slider Image is Required"})
      }
      //saving data into database 
      if(slider_id){
        var query = "UPDATE sliders SET ? WHERE slider_id = ?";
        var cond = [fields, slider_id];
      }else{
        var query = "INSERT INTO sliders SET ?";
        var cond = [fields];
  
      }

      // Image Handling

      db.query(query,cond,(err, data) => {
        if(err){
          return res.json({success : false, message : err});
        }else{
          return res.json({success : true, message : `Slider ${slider_id ? "update" : "Stored"}  Successfully`});
        }
      })
      //Saving DB Record
    });
}