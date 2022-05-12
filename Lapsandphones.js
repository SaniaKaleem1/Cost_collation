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
const maindata=[];
Router.get('/',(req,res)=>{
    res.render('electronics');
});
//scrapping route
Router.post('/',(req,resopnse)=>{
    var word = req.body.item;
    
    sites.forEach((site)=>{
        if(site==="https://www.flipkart.com"){
            let fword = word.replace(/ /g,"%20");
            let option = site+sf+fword;
            axios.get(option).then(res=>{
                const $ = cheerio.load(res.data);
                $("div._2kHMtA").each((i, ele)=>{
                    if(i==0){
                            let linkadrr=$(ele).find("a._1fQZEK").attr("href");
                            let option = site+linkadrr;
                            axios.get(option).then(res=>{
                                const $ = cheerio.load(res.data);
                                maindata.push({
                                "Title": $("span.B_NuCI").text(),
                                "Price": $("div._30jeq3._16Jk6d").text(),
                                "Ratings": $("div._2d4LTz").text(),
                                "Image": $("img._396cs4._2amPTt._3qGmMb._3exPp9").attr("src"),
                                "Site": site
                                });
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
                            let option = site+linkadrr;
                            axios.get(option).then(res=>{
                                const $ = cheerio.load(res.data);
                                $("#productTitle").text();
                                var price;
                                var jrating;
                                $("span.a-price").each((i,ele)=>{
                                    if(i==0){
                                    price = $(ele).find("span.a-offscreen").text();
                                    }
                                    
                                });
                                $("i.a-icon.a-icon-star").each((i,ele)=>{
                                    if(i==0){
                                    var rating=  $(ele).find("span.a-icon-alt").text();
                                    jrating= rating.split(" ")[0];
                                    }
                                });
                                maindata.push({
                                    "Title": $("#productTitle").text(),
                                    "Price": price,
                                    "Ratings": jrating,
                                    "Image": $("#landingImage").attr("src"),
                                    "Site": site
                                    });
                                    resopnse.render("electronicsres", { results : maindata});     
                            });
                    }
                });
            });
        }
        
    });

});
module.exports = Router;