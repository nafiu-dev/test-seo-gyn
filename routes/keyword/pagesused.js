const express = require('express')
const router = express.Router()
const request = require("request")
const cheerio = require("cheerio")
const pageusedURL = process.env.PAGESUSED

// pagesused KWYWORD | GET: /api/v1/pagesused?keyword= | public
router.get('/pagesused', (req, res) => {
    const {keyword} = req.query
    const url = pageusedURL+keyword

    let results =[]
    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            let $ = cheerio.load(html)
            links = $('a')
            $(links).each((i, link) => {
                let url = $(link).attr('href')
            
                url = url.replace("/url?q=", "").split("&")[0];
                url = url.replace(/(https?:\/\/)?(www.)?/i, ''); 
                url = url.split('?')[0];
                url = url.split('/')[0];
            
                if (url === "policies.google.com") return;
                if (url === "google.com") return
                if (url === "maps.google.com") return
                if (url === "accounts.google.com") return
                if (url === "support.google.com") return // add this
                if(url.length === 0) return
                    
                results.push(url)
                    
            });
            results = results.filter(function(item, pos) {
                return results.indexOf(item) == pos;
            })
            
            // RETURN REQUEST
            return res.json({
                success: true,
                result: results
            })
            
        }
    })

})

module.exports = router