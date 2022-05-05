

const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const isValid = function(value) {
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
const isValidRequestBody = function(requestBody) {
    return Object.keys(requestBody).length > 0
}

const createCollege = async function (req, res) {

    try {
        const requestBody = req.body;
        if(!isValidRequestBody(requestBody)) {
            res.status(400).send({status: false, message: 'Invalid request parameters. Please provide College details'})
            return
        }

        // Extract body
        const {name, fullName, logoLink} = requestBody; // Object destructing

        // Validation starts
        if(!isValid(name)) return res.status(400).send({status: false, message: 'College name is required'})
        if(!isValid(fullName)) return res.status(400).send({status: false, message: 'College fullname is required'})
        if(!isValid(logoLink)) return res.status(400).send({status: false, message: 'logolink is required'})


        const isValidUrl = function(v) {return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(v)}
        if(!isValidUrl(logoLink)) return res.status(400).send({status: false, message: 'logolink is not valid'})

        
        const allData = {name, fullName, logoLink}
        const newData = await collegeModel.create(allData);
        return res.status(201).send({status: true, message: `Created successfully`, data: newData});

    } catch (error) {
        res.status(500).send({status: false, message: error.message});
    }
}

const getData = async function (req, res) {
    try {
        const collegeName = req.query.name
        if (!collegeName) return res.status(400).send({ status: false, message: 'College name is required to access data' })
      
        const newCollege = await collegeModel.findOne({ name: collegeName }, { name: 1, fullName: 1, logoLink: 1 });
        if (!newCollege) return res.status(404).send({ status: false, message: `College does not exit` });
        
        //const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false }, { __v: 0, isDeleted: 0, collegeId: 0 });
        const interns = await internModel.find({ collegeId: newCollege._id, isDeleted: false }, { name: 1, email: 1, mobile: 1 });
        if(!interns) return res.status(404).send({ status: false, message: `Interns does not exit`});
        res.status(200).send({ data: { name: newCollege.name, fullName: newCollege.fullName, logoLink: newCollege.logoLink, interns: interns}})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}




module.exports.createCollege = createCollege
module.exports.getData = getData