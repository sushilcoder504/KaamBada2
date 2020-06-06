module.exports = (app, Swal, path, knex) => {
    app.post("/register", (req, res) =>{
        if (req.body.name === "" || req.body.email === "" || req.body.mobile === "" || req.body.profession === "" || req.body.gender === "" || req.body.age === "" || req.body.state === ""){
            console.log({"suggetion": "please fill all contents!"});
            res.send({"suggetion": "please fill all contents!"})
        }else{
            knex
            .select('*').from('users')
            .where({"name": req.body.name, "email": req.body.email, "mobile": req.body.mobile, "profession": req.body.profession, "gender": req.body.gender, "age": req.body.age, "state": req.body.state})
            .then((data) =>{
                console.log(data);
                if (data.length<1){
                    knex('users')
                    .insert(req.body)
                    .then((result) =>{
                        knex
                        .select('*')
                        .from('users')
                        .where('email', req.body.email)
                        .then((data) =>{
                            console.log({"success": "signup successfully..."})
                            console.log({"data": data});
                            // res.send({"success": "signup successfully..."});
                            res.sendFile((path.join(__dirname, '../style/submit.html')));
                            // res.send('<script>alert("Register Successfully")</script>')
                            // res.redirect("/style/main_page");

                        }).catch((err) =>{
                            console.log(err);
                        })
                    }).catch((err) =>{
                        console.log(err);
                    })
                }else{
                    console.log({"exist": "this user alredy exists.."});
                    res.send({"exist": "this user alredy exists.."})
                    // res.sendFile((path.join(__dirname, '../animadrive/exist.html')));
                }
            }).catch((err) =>{
                console.log(err);
            })
        }
    })

    app.get("/hello",(req,res)=>{
        res.send("hi      ,,,,")
    })
}