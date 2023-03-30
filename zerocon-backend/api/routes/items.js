const express = require("express");
const router = express.Router();
const conn = require('./../../db_conn');

router.get("/", (req, res, next) => {
    const qry = `SELECT items.*, item_images.image_url  FROM items LEFT JOIN item_images ON items.id=item_images.item_id`;
    conn.query(qry, (err, result) => {
        if (err) {
            return res.status(501).json({
                error: err.message
            })
        }

        var newData = [];
        result.forEach(item => {
            let ary = [];
            if (item.image_url) {
                ary.push(item.image_url);
            }
            let data = item;
            data.image_url = ary

            newData.push(data);
        });

        // console.log(newData);

        const arrayHashmap = newData.reduce((obj, item) => {
            obj[item.id] ? obj[item.id].image_url.push(...item.image_url) : (obj[item.id] = { ...item });
            return obj;
        }, {});
        const mergedArray = Object.values(arrayHashmap);
        //   console.log(mergedArray);

        return res.status(200).json({
            data: mergedArray,
            total_item: result.length
        })
    })

})

router.get("/featured/items", (req, res, next) => {
    const qry = `
    SELECT items.*, item_images.image_url  
    FROM items 
    LEFT JOIN item_images ON items.id=item_images.item_id 
    INNER JOIN featured_items ON items.id=featured_items.item_id`;
    conn.query(qry, (err, result) => {
        if (err) {
            return res.status(501).json({
                error: err.message
            })
        }

        var newData = [];
        result.forEach(item => {
            let ary = [];
            if (item.image_url) {
                ary.push(item.image_url);
            }
            let data = item;
            data.image_url = ary

            newData.push(data);
        });

        const arrayHashmap = newData.reduce((obj, item) => {
            obj[item.id] ? obj[item.id].image_url.push(...item.image_url) : (obj[item.id] = { ...item });
            return obj;
        }, {});
        const mergedArray = Object.values(arrayHashmap);
        //   console.log(mergedArray);

        return res.status(200).json({
            data: mergedArray,
            total_item: result.length
        })
    })

})


module.exports = router;