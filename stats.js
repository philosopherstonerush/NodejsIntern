const lodash = require('lodash')

function computeNumberOfBlogs(blogs) {
    return lodash.size(blogs)
}

function findTheLongestTitle(blogs) {
    let currTitle = "";

    lodash.each(blogs, (obj) => {
        if(obj.title.length > currTitle.length) {
            currTitle = obj.title
        }
    })

    return currTitle
}

function findTheNumberOfBlogsWithWord(blogs, word) {
    let currTitleCount = 0;

    lodash.each(blogs, (obj) => {
        title = lodash.toLower(obj.title)
        word = lodash.toLower(word)
        if(title.includes(word) == true) {
            currTitleCount = currTitleCount + 1
        }
    })

    return currTitleCount
}

function uniqueBlogTitles(blogs) {
    uniqBlogs = []
    lodash.each(blogs, (obj) => {
        uniqBlogs.push(obj.title)
    })

    return lodash.uniq(uniqBlogs)
}

// Adding a time limit of 1 minute with the key.
function timekeyresolver(...args) {
    const time = (new Date()).getMinutes();
    args.push({time})
    const cacheKey = JSON.stringify(args);
    return cacheKey
}

let computeNumberOfBlogsM = lodash.memoize(computeNumberOfBlogs, timekeyresolver)
let findTheLongestTitleM = lodash.memoize(findTheLongestTitle, timekeyresolver)
let findTheNumberOfBlogsWithWordM = lodash.memoize(findTheNumberOfBlogsWithWord, timekeyresolver)
let uniqueBlogTitlesM = lodash.memoize(uniqueBlogTitles, timekeyresolver)

module.exports = {
    computeNumberOfBlogsM, findTheLongestTitleM, findTheNumberOfBlogsWithWordM, uniqueBlogTitlesM
}