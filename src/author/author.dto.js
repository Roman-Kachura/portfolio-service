module.exports = function (author){
    return {
        id:author._id,
        name:author.name,
        email: author.email,
        phone:author.phone,
        location:author.location
    }
}