const mongoose = require("mongoose");
const formSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
        
    },
    fatherName:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },

})


const Register = new mongoose.model("Register", formSchema);

module.exports = Register;
