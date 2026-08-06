const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/register", (req, res) => {

    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.json({
            success:false,
            message:"Please fill all fields"
        });
    }

    console.log("New User");

    console.log("Username :",username);
    console.log("Email :",email);
    console.log("Password :",password);

    res.json({
        success:true,
        message:"User Registered Successfully"
    });

});

app.listen(PORT,()=>{

    console.log(`Server Running on http://localhost:${PORT}`);

});