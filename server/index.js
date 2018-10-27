var express = require('express');
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var bcrypt =require('bcrypt');
const saltRounds=10;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStatergy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
apple

app.listen(8100,()=>{
    console.log('Listening on port 8100');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressValidator());
app.use(cookieParser());
var options = {
    host: "localhost",
    user: "root",
    password: "",
    database: "bankingsystem"
};
var sessionStore = new MySQLStore(options);
app.use(session({
    secret:'appleball',
    resave: false,
    store:sessionStore,
    saveUninitialized:false
})
)
app.use(passport.initialize());
app.use(passport.session());


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bankingsystem"
});
con.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});
// passport.use(new LocalStatergy(
//     function(name,pwd,done){
//         console.log(name);
//         console.log(pwd);
//         con.query('Select * from user wher name="'+name+'"',function(res,err){
//             if(err)
//                 done(err);
//             if(results.length === 0)
//                 res.se
//         })
//         return done(null,'apple');
//     }
// ))

app.get('/', function (req, res) {
    // render to views/index.ejs template file
    res.json('Listening');
});

// router.post('/login',passport.authenticate('local'))
app.post('/login',function(req,res){
    console.log(req.body);
    var name = "'"+req.body.name+"'";
    var pass = req.body.pwd;
    var query = 'Select * from user where name='+name;
    console.log(query);
    con.query(query,function(err,results){
        console.log((results[0].pwd).toString());
        if(err)
            throw(err);
        if(results.length === 0)
            res.json('incorrect username');
        else {
            if(bcrypt.compareSync(pass,results[0].pwd.toString())) {
                res.json('successful login');
               } else {
                res.json('incorrect password');
               }
        }
    })
})
app.post('/register', function (req, res) {
    console.log(req.body);
    //validating the input field
    req.checkBody('name','Name field cannot be empty').notEmpty();
    req.checkBody('email','Email Cannot be empty').notEmpty();
    req.checkBody('email','Type has to be email').isEmail();
    req.checkBody('pwd','Password has to be length between 5 and 20').len(5,20);
    const error = req.validationErrors();
    if(error)
    {
        res.json(error);
        console.log(error);
    }
    var name = "'" + req.body.name + "'";
    var pwd =  req.body.pwd;
    var email = "'" + req.body.email + "'";
    let hash = bcrypt.hashSync(pwd, saltRounds);
    console.log(hash);
    hash="'"+hash+"'";
    var query1 = 'insert into user (name,pwd,email) values (' + name + ','+hash+',' + email + ')';
        con.query(query1, function (err, result) {
            if (err) {
                console.log(err);
                res.json('error registering');
            } 
            con.query('Select LAST_INSERT_ID() as uid',function(error,results){
             if(err)
                throw err;
             var uid=results[0].uid;
             req.login(uid,function(err){
                 console.log('passport login');
             })
             console.log('Successful Registration');
             res.json(uid);

            })
            
        })
    // });
});

passport.serializeUser(function(uid,done){
    done(null,uid);
});
passport.deserializeUser(function(uid,done){
    done(null,uid);
});

app.post('/accvalid', function (req, res) {
    var accid = req.body.accid;
    var query = 'select * from  account where accid=' + accid;
    con.query(query, function (err, result) {
        if (err)
            res.json(err);
        else if (result.length)
            res.json('Valid Account');
        else
            res.json('Invalid Account');
    })
})
app.get('/logout',function(req,res){
    req.logout();
    req.session.destroy();
    res.json("Logged out");
})
app.post('/checkavailable', function (req, res) {
    var accid = req.body.accid;
    var amount = req.body.balance;
    var query = "select * from account where accid=" + accid + " and balance>=" + amount;
    con.query(query, function (err, result) {
        if (err)
            res.json('Available-Error')
        else if (result.length)
            res.json('Sufficient Balance');
        else
            res.json('Insufficient Balance');
    })
})

app.get('/accounts', function (req, res) {
    console.log(req.isAuthenticated());
    console.log(req.user);
    var uid = req.get('uid');
    var query = "select accid from account where uid = " +uid;
    con.query(query, function (err, result) {
        if (err)
            res.json('Error')
        else
            res.json(result);
    })
})

app.get('/account-details', function (req, res) {
    var accid = req.get('accid');
    var query = "select * from account where accid = " + accid;
    con.query(query, function (err, result) {
        if (err)
            res.json('Error')
        else
            res.json(result);
    })
})

app.post('/otp', function (req, res) {
    
    var amount = req.body.amount;
    var accidben = req.body.accidben;
    var accidrem = req.body.accidrem;
    var query1 = "select email from user u, account a where a.accid = " + accidrem + " and a.uid = u.uid";
    // Generating random 4 digit otp
    var otp = Math.floor(1000 + Math.random() * 9000);
    con.query(query1, function (err, result) {
        const email = result[0]['email'];
        console.log(email);
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'freetransferservices@gmail.com',
                pass: 'spit@123'
            }
        });
        var text = "Your OTP is " + otp;
        let mailOptions = {
            from: 'freetransferservices@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'OTP for Fund Transfer', // Subject line
            text: text, // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

        });

        var query2 = "insert into transfers(accidben, accidrem, amount, otp, confirmed) values(" + accidben +
            "," + accidrem + "," + amount + "," + otp + ",0)";
        con.query(query2, function (err, result) {
            res.json(otp);
        })
    })
})

app.post('/transfer', function (req, res) {
    //sender
    //benificiary
    // var benificiary=;
    // var amount=req.body.amount;
    var query1 = 'select balance from account where accid=' + req.body.accidrem;
    con.query(query1, function (err, result) {
        if (err)
            res.json(err);
        else {
            var query2 = 'update account set balance =' + (Number(result[0].balance) - Number(req.body.amount)) + ' where accid=' + req.body.accidrem;
            con.query(query2, function (err, result) {
                if (err)
                    res.json(err);
                else {
                }
            });

        }
    });
    var query3 = 'select balance from account where accid=' + req.body.accidben;
    con.query(query3, function (err, result) {
        if (err)
            res.json(err);
        else {
            // res.send(result);
            var query4 = 'update account set balance=' + (Number(result[0].balance) + Number(req.body.amount)) + ' where accid=' + req.body.accidben;
            con.query(query4, function (err, result) {
                if (err)
                    res.json(err);
                else
                    res.json('Success');
            });
        }
    });
    var query5 = 'update transfers set confirmed = 1 where accidben = ' + req.body.accidben +
                        " and otp = " + req.body.otp + " and confirmed = 0";
                    con.query(query5, function (err, result) {
                        if (err)
                            res.json(err);
                    })
})