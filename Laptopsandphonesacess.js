//Libraries
const express = require("express");
const Router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
// variables
var sites=["https://www.flipkart.com", "https://www.amazon.in", "https://www.ebay.com"];
    // search queries
var sf="/search?q=";
var sa="/s?k=";
var se="/sch/i.html?_nkw=";
//scrapping route
Router.post('/',(req,res)=>{
    var word = req.body.item;
    sites.forEach((site)=>{
        if(site==="https://www.flipkart.com"){
            let fword = word.replace(/ /g,"%20");
            let option = site+sf+fword;
            axios.get(option).then(res=>{
                const $ = cheerio.load(res.data);
                $("div._4ddWXP").each((i, ele)=>{
                    if(i==0){
                            let linkadrr=$(ele).find("a._2rpwqI").attr("href");
                            let option = site+linkadrr;
                            axios.get(option).then(res=>{
                                const $ = cheerio.load(res.data);
                                console.log($("span.B_NuCI").text());
                                console.log($("div._30jeq3._16Jk6d").text());
                                console.log($("div._2d4LTz").text());
                                console.log("-----------");
                            });
                    }
                });
            });
        }
        if(site==="https://www.ebay.com"){
            let eword = word.replace(/ /g,"+");
            console.log(site+se+eword);
        }
        if(site==="https://www.amazon.in"){
            let aword = word.replace(/ /g,"+");
            let option=site+sa+aword;
            axios.get(option).then(res=>{
                const $ = cheerio.load(res.data);
                $("h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2").each((i, ele)=>{
                    if(i==0){
                            let linkadrr=$(ele).find("a").attr("href");
                            console.log(site);
                            let option = site+linkadrr;
                            axios.get(option).then(res=>{
                                const $ = cheerio.load(res.data);
                                console.log($("#productTitle").text());
                                $("span.a-price").each((i,ele)=>{
                                    if(i==0){
                                    console.log($(ele).find("span.a-offscreen").text());
                                    }
                                });
                                console.log($("span.a-size-medium.a-color-base").text());
                            });
                    }
                });
            });
        }
    });

});
module.exports = Router;