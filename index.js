const express = require('express')
const app = express()
const blogInfo = require('./external_api')
const port = 3000
const stats = require('./stats')
const search = require('./search')

app.get('/', (req, res) => {
    res.send('API endpoints - /api/blog-stats and /api/blog-search?query=<substring>')
})

app.get('/api/blog-stats', (req, res) => {

    let content = blogInfo.getBlogPostInfos()
    content.then(result => {
        numOfBlogs = stats.computeNumberOfBlogsM(result.blogs)
        longestTitle = stats.findTheLongestTitleM(result.blogs)
        blogsWithWord = stats.findTheNumberOfBlogsWithWordM(result.blogs, "privacy")
        blogsWithUniqTitles = stats.uniqueBlogTitlesM(result.blogs)
        response = {
            "NumOfBlogs": numOfBlogs,
            "LongestTitle": longestTitle,
            "NumOfBlogsPrivacy": blogsWithWord,
            "uniqBlogs": blogsWithUniqTitles
        }
        res.json(response)
    }).catch(error => {
        res.status(500).json(
            {
                "error": error
            }
        )
    })
})

app.get('/api/blog-search', (req, res) => {
    query = req.query["query"]
    content = blogInfo.getBlogPostInfos()
    content.then(result => {
        filteredBlogs = search.returnBlogsWithQueryM(result.blogs, query)
        response = {
            "blogsFiltered": filteredBlogs
        }
        return res.json(response)
    }).catch(error => {
        res.status(500).json(
            {
                "error": error
            }
        )
    })

})

app.listen(port, () => {
    console.log(`Example app listening on ${port}`)
})