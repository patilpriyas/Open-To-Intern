const { default: mongoose } = require("mongoose")

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is required']
    },
    fullName: {
        type: String,
        required: [true, 'Fullname is required']
    },

    logoLink: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

collegeSchema.path('logoLink').validate((val) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('College', collegeSchema, 'colleges')