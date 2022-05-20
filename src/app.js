const express = require('express');
const fs = require('fs');
const hbs=require('hbs')
const path = require('path');
const app = express();
require("./db/conn");
const Register = require('./models/abdulwahab');
const port = process.env.PORT || 8000;
const staticPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.use(express.static(staticPath));
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
app.use(express.urlencoded({ extended: false }));
const indexPath=path.join(__dirname, '../templates/views/index.hbs');
const index = fs.readFileSync(indexPath, "utf-8");
app.get('/', (req, res) => {
    res.render("index");
});
app.get('/index', (req, res) => {
    res.render("index");
});
app.get('/getData', (req, res) => {
    res.send("I recieved Data");
})
const replaceVal = (file,val) => {
    let temprature = file.replace("{%name%}", val.name);
    temprature = temprature.replace("{%fatherName%}", val.fatherName);
    temprature = temprature.replace("{%email%}", val.email);
    return temprature;
}
app.post('/getData', async (req, res) => {
    try {
        const email =await req.body.getEmail;
        const getemail = await Register.findOne({ email: email });

//         fs.writeFile("Raza.txt", getemail, (err) => {
//     if (!err) {
//         console.log("Completed");
//     }
// })
                const arrJson = [getemail];
                const realTimeData = arrJson.map((val) => replaceVal(index, val)).toString();
        res.send(realTimeData);
    }
    catch (e)
    {
        console.log(e);
        res.status(400).send(e);
    }
})
app.post('/register', async (req, res) => {
    try {
        console.log("Hello I am here ",req.body.username);
        const registerForm = new Register({
            name: req.body.username,
            fatherName: req.body.fatherName,
            email: req.body.getEmail,
        })
        const registered = await registerForm.save();
        res.status(200).redirect("index");
    }
    catch(err) {
        console.log(err);
        res.status(400).render('index');
    }
})
app.listen(port, () => {
    console.log(`listning to port ${port}`);
})