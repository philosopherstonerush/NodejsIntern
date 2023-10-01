const lodash = require('lodash')
const timekeyresolver = require('./stats').timekeyresolver

function returnBlogsWithQuery(blogs, query) {
    query = lodash.toLower(query)
    filteredBlogs = lodash.filter(blogs, (obj) => {
        title = lodash.toLower(obj.title)
        if(title.indexOf(query) > -1) {
            return true
        }
        return false
    })
    return filteredBlogs
}

let returnBlogsWithQueryM = lodash.memoize(returnBlogsWithQuery, timekeyresolver)

module.exports = {
    returnBlogsWithQueryM
}