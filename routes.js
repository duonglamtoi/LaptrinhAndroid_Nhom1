var users = require('../models/users');

var appRouter = function (app) {

  app.get("/", function (req, res) {
    res.status(200).send("Welcome to DuongLamToi- RESTFUL API - NODEJS - TINK39");
  });

    app.post("/login", function (req, res) {  
        //console.log(req.body);
        var user = req.body.username;
        var pass = req.body.password;
        console.log('Tai khoan: ' + user);
        console.log('Mat khau: ' + pass);
        var bFound = false;
        var key = '';
        if (user === 'vvdung' && pass === '123456') {
            key = JSON.stringify({user:user});
            bFound = true;
        }

        var dateRet = { r: bFound, key: key };
        
        res.status(200).send(dateRet);
    });

    app.post("/register", function (req, res) {
        var data = {
            uname: req.body.uname,
            pass: req.body.pass,
            email: req.body.email
        }

        users.AddUser(data, function (ret) {
            console.log('AddUser() => ' + ret);
            if (ret === 1)
                res.status(200).send("Add User OKIE");
            else
                res.status(200).send("Can't AddUser- FAIELD :" + ret);
        });
    });
    /*dang nhap*/
    app.post("/login1", function(req, res){
        var data = {
            username: req.body.username,
            password: req.body.password,
        }

        users.login1(data, function(ret){
            console.log('login1() => ' + ret);
            if(ret ===1)
                res.status(200).send("Logged in successfully - OKIE");
            else
                res.status(200).send("Login failed - Wrong Information - FAIELD! "+ ret);
        });
    });


    app.post("/getinfo", function (req, res) {
        //1.Nhan tham so tu client
        var key = req.headers['token'];
        if (!key) {
            res.status(302).send("CHUA DANG NHAP");
            return;
        }
        
        //console.log(req.body);
        //console.log(' TEN TAI KHOAN: ' + req.body.username);
        //2. xu ly, truy xuat du lieu.......

        //3. Gui ket qua theo cau truc JSON
        var ret = JSON.stringify("{r:'API GETINFO - NODEJS - TINK39', key2: 'value 2', key3: true}");
        res.status(200).send(ret);
    });
}

module.exports = appRouter;