const { default: mongoose } = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
        trim: true,
        lowercase: true,
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is Required"],
        unique: true,
        validate: {
            validator:
                function (m) { return /^(\()?\d{3}(\))?(|\s)?\d{3}(|\s)\d{4}$/.test(m) },
            message: "Please Enter 10 digit Mobile Number",
        },
    },
    collegeId: {
        type: ObjectId,
        ref: "College",
        required: [true, "College ID is Required"],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("intern", internSchema)

