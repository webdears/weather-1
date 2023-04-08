const express = require("express");
const app = express();
var cron = require('node-cron');
var axios = require("axios").default;
// const path = require("path");
const nodemailer=require('nodemailer')
// let formidable = require('formidable');
// let fs = require('fs');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");


app.use(bodyParser.json());
app.use(express.static('public'))
 


const conn = mysql.createPool({
	multipleStatements: true,
	// host: "localhost",
	// user: "root",
	// password: "",
	// database: "weather",


  	host: "blfmpuw893rmz180npmx-mysql.services.clever-cloud.com",
	user: "uaybaavs3rogjvxu",
	password: "Sz6VlRvmENZoqhDHkAxX",
	database: "blfmpuw893rmz180npmx",

});

// connect to database
conn.getConnection((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});

const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
  };




  app.post("/signup", (req, res) => {
    let sql = `SELECT * FROM user where Username="${req.body.User}" `;
    let query = conn.query(sql, (err, result) => {
      if (result.length!=0) {
      if (req.body.Pass==result[0].Pass) {
        res.send(JSON.stringify({ status: 200, error: null, response: result }));
      }
      else{
        res.send(JSON.stringify({ status: 500, error: null, response: result }));
        
      }
    }
    else{
      res.send(JSON.stringify({ status: 700, error: null, response: result }));
  
    }
    })
  
    })





  app.post("/mail", (req,res) => {
    async function mail(req,res){
    let transporter = nodemailer.createTransport({
      
      service: 'gmail', 
      auth: {
        user: 'webdearsproject@gmail.com', // generated ethereal user
        pass: 'iefrtrdbsudvpsyx', // generated ethereal password
      },
    });
    var digits = '1234567890';
    var otpp = ''
    for (i = 0; i < 4; i++) {
      otpp += digits[Math.floor(Math.random() * 10)];
    }
    var mailoptions={
    from:'webdearsproject@gmail.com',
    to:req.body.tomail,
    subject:'OTP FROM UID',
    html:`<p>One Time PASSWORD FOR UID IS <b>${otpp} </b> </p>`
    }
   await transporter.sendMail ( mailoptions,  function(err,info){
    if(err){
      res.send(JSON.stringify({ status: 500, error: null}))
  
    }
    else{
      
      let sqld = `DELETE FROM otp where email_Id="${req.body.tomail}" `;
      let queryd = conn.query(sqld, (err, result) => {
        if (err) throw err;
  
  
  
  
    
      let data = { email_Id:req.body.tomail, otp:otpp,phone:req.body.phone_no || 0};
      let sql = "INSERT INTO otp SET ?";
      let query = conn.query(sql, data, (err, result) => {
        if (err) res.send(JSON.stringify({ status: 500, error: null}));
        else{
  
          res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
        }
        // res.send(JSON.stringify({ status: 200, }))
      })
    })
    }
  
    })
  }
  mail(req,res)
  
  })
  
  
  
  app.get("/validateotp", (req, res) => {
    console.log(req.query.mail)
    console.log(req.query.mail)
    console.log(req.query.otpval)
 
  
    let sql = `SELECT * FROM otp where email_Id="${req.query.mail}" `;
    let query = conn.query(sql, (err, result) => {
      console.log(result[0].otp)
      if (req.query.otpval!=result[0].otp) {
        res.send(JSON.stringify({ status: 500, error: null, response: result }));
      }
  
      else if(req.query.otpval==result[0].otp){
      
  
            res.send(JSON.stringify({ status: 200, error: null, response: result }));
            
          }
          else if(err){
        res.send(JSON.stringify({ status: 800, error: null, response: result }));

      }
      else{
        res.send(JSON.stringify({ status: 700, error: null, response: result }));
        
      }
      
    });
  });




  app.post("/insertdata", (req, res) => {
    var digits = '1234567890';
    var uid = ''
    for (i = 0; i < 6; i++) {
      uid += digits[Math.floor(Math.random() * 10)];
    }

  let sql4=`INSERT INTO user(uid,Username,Pass,Phone,Email) values ('${uid}','${req.body.Username}','${req.body.Pass}',"${req.body.Phone}","${req.body.Email}" )`;
  let query4 = conn.query(sql4, async (err,result) => {
  if (err) {
    console.log(err)
    res.send(JSON.stringify({ status: 500, error: null, response: "New Record is Added successfully" }));

    
  }
  else{

    res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));

  }
})

})









app.get("/qr", (req, res) => {
console.log(req.query.Email)
 let sql = `SELECT Pass FROM user where Email="${req.query.Email}"`;
    let query = conn.query(sql, (err, result) => {
     
      console.log(result)
      if(result.length !=0){
    
      if ( result[0].Pass) {
         
        ty(req.query.Email,result[0].Pass)
        res.send(JSON.stringify({ status: 200, error: null, response: "qr sent" }));
      }
  
    
      else{
        res.send(JSON.stringify({ status: 700, error: null, response: result }));
        
      }
      
    }else{
      res.send(JSON.stringify({ status: 800, error: null, response: "New Record is Added successfully" }));
    }
    });



})


function ty(mail,pass){
  console.log(mail+"p")
  let transporter = nodemailer.createTransport({
          
    service: 'gmail',
    auth: {
      user: 'webdearsproject@gmail.com', // generated ethereal user
      pass: 'iefrtrdbsudvpsyx', // generated ethereal password
    },
    });
    var mailoptions={
    from:'webdearsproject@gmail.com',
    to:mail,
    subject:'Password For Login',
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        *
        {
          margin:0px;
          padding:0px;
          
        }
      
        
        
    
        .qr img
        {
          
          height:180px;
          width:180px;
          margin:20px;
          background-color:white;
          
        }
        
       
      </style>
       
    </head>
    <body>
   
        
    
            <div class="qr" style="position:absolute;right:10px;bottom:10px">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pass}" alt="">
            </div>
          
        
         
     
    </body>
    </html>`,
  
    }
  
    
    transporter.sendMail ( mailoptions,  function(err,info){
    if(err){
          console.log(err)
          console.log("888888")
          console.log(info)
  
    }
    else{
      console.log("sent")
    }
  })
}





app.post("/filter", (req, res) => {

let sql4=`INSERT INTO notif(uid,rain,clear,cloudy,snow,location) values ('${req.body.Uid}','${req.body.Rain}',"${req.body.Clear}",'${req.body.Cloudy}','${req.body.Snow}','${req.body.Loc}')`;
			let query4 = conn.query(sql4, async (err,result) => {
			if (err) {
				console.log(err)
				res.send(JSON.stringify({ status: 500, error: null, response: "New Record is Added successfully" }));
			}
      else{
        res.send(JSON.stringify({ status: 200, error: null, response: "Filter Added" }));
      }
    })
})


app.post("/bookmark", (req, res) => {

console.log(req.body.User)
  let sql = `SELECT Preference FROM user where uid="${req.body.User}"`;
  let query = conn.query(sql, async (err,result) => {

    console.log(result)
   
   let arr  = result[0].Preference.split(",")
    if(arr.includes(req.body.Loc)){
      res.send(JSON.stringify({ status: 500, error: null, response: "Already added" }));
    }
  
    else{
      var ar;
      if(result[0].Preference!=''){
         ar = result[0].Preference.split(",")

      }
      else{
          ar=[];
      }
         ar.push(req.body.Loc);
         let str=ar.join();
         let sql4=`UPDATE user SET Preference = '${str}' where uid="${req.body.User}"`;
         let query4 = conn.query(sql4, async (err,result) => {
    if (err) {
              console.log(err)
              res.send(JSON.stringify({ status: 700, error: null, response: "New Record is Added successfully" }));
            }
            else{
              res.send(JSON.stringify({ status: 200, error: null, response: "Preference Added" }));
            }
          })
          } 
    console.log(err)
  })

  })


  app.post("/loadpreference", (req, res) => {

    let sql = `SELECT Preference FROM user where uid="${req.body.Uid}"`;
          let query4 = conn.query(sql, async (err,result) => {
          if (err) {
            console.log(err)
            res.send(JSON.stringify({ status: 500, error: null, response: "New Record is Added successfully" }));
          }
          else{
            res.send(JSON.stringify({ status: 200, error: null, response: result[0].Preference.split(",")}));
          }
        })
    })


    app.post("/delbookmark", (req, res) => {

      let sql = `SELECT Preference FROM user where uid="${req.body.User}"`;
            let query4 = conn.query(sql, async (err,result) => {
              console.log(result)
              let arr  = result[0].Preference.split(",")
              if(arr.includes(req.body.Loc)){
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i] ===req.body.Loc ) {
                      var spliced = arr.splice(i, 1);
                     
                  }
              }

          let str=arr.join();
         let sql4=`UPDATE user SET Preference = '${str}' where uid="${req.body.User}"`;
         let query4 = conn.query(sql4, async (err,result) => {
          if (err) {
              console.log(err)
              res.send(JSON.stringify({ status: 700, error: null, response: "New Record is Added successfully" }));
            }
            else{
              res.send(JSON.stringify({ status: 200, error: null, response: "Preference Added" }));
            }
          })
              }
          })
      })


      app.post("/delalert", (req, res) => {


              
  
           let sql4=`DELETE FROM notif where id="${req.body.Id}"  AND uid="${req.body.Uid}"`;
           let query4 = conn.query(sql4, async (err,result) => {
            if (err) {
                console.log(err)
                res.send(JSON.stringify({ status: 700, error: null, response: "New Record is Added successfully" }));
              }
              else{
                res.send(JSON.stringify({ status: 200, error: null, response: "Preference Added" }));
              }
            })
                
           
        })



 cron.schedule('0 * * * *', () => {
  let options = {method: 'GET'};
  let sql = `SELECT * FROM notif`;
  let query = conn.query(sql, async (err,result) => {
    for(let item of result){
      let ref=false;
      let notif='';
      
     
        

         

var options = {
  method: 'GET',
  url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${item.location}`,
  params: {unitGroup: 'us', key: 'R86J89WUP99QYVYUYRXTEQNV6', contentType: 'json'}
};

axios.request(options).then(function (response) {

  if(item.clear==1 && (response.data.currentConditions.conditions.includes('Clear'))){
      ref=true;
      notif="Clear"
     
  }
  if(item.cloudy==1 && (response.data.currentConditions.conditions.includes('Partially cloudy'))){
    ref=true;
    notif="Partially cloudy"
  }
  if(item.rain==1 && (response.data.currentConditions.conditions.includes('Rain'))){
    ref=true;
    notif="Rain"
  }
  if(item.rain==1 && (response.data.currentConditions.conditions.includes('Snow'))){
    ref=true;
    notif="Snow"
  }
 let body=`Its ${notif} in ${response.data.resolvedAddress} as per updated at ${response.data.currentConditions.datetime}.`
// console.log(response.data.currentConditions.conditions+" "+response.data.resolvedAddress)
 if(ref){
  let sql1 = `SELECT Email FROM user where uid=${item.uid}`;
  let query = conn.query(sql1, async (err,result) => {
    // console.log(result[0].Email)
    // console.log(body)

    let transporter = nodemailer.createTransport({
      
      service: 'gmail', 
      auth: {
        user: 'webdearsproject@gmail.com', // generated ethereal user
        pass: 'iefrtrdbsudvpsyx', // generated ethereal password
      },
    });

    var mailoptions={
      from:'webdearsproject@gmail.com',
      to:result[0].Email,
      subject:`Weather Alert on ${response.data.resolvedAddress}`,
      html:`<p>Its <b>${notif}</b> in ${response.data.resolvedAddress} as per updated at ${response.data.currentConditions.datetime}.</p>`
      }
     await transporter.sendMail ( mailoptions,  function(err,info){
      if(err){
        res.send(JSON.stringify({ status: 500, error: null}))
    
      }
      else{

        
        console.log("sent")

      }
    })
  })
 }


 
}).catch(function (error) {
  console.error(error);
});
          
          


    }

    



  })
});
  

        
       

app.post("/notif", (req, res) => {



  let sql = `SELECT * FROM notif where uid="${req.body.Uid}"`;
  let query = conn.query(sql, async (err,result) => {
    var obj=[];
     for(let [i,item] of result.entries()){
      let ref=false;
      let notif='';
      
     
        

         

var options = {
  method: 'GET',
  url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${item.location}`,
  params: {unitGroup: 'us', key: 'R86J89WUP99QYVYUYRXTEQNV6', contentType: 'json'}
};

 await axios.request(options).then( await function (response) {
  
  if(item.clear==1 && (response.data.currentConditions.conditions.includes('Clear'))){
    ref=true;
    notif="Clear"
    console.log(response.data.resolvedAddress)
     
  }
  if(item.cloudy==1 && (response.data.currentConditions.conditions.includes('Partially cloudy'))){
    ref=true;
    notif="Partially cloudy"
  }
  if(item.rain==1 && (response.data.currentConditions.conditions.includes('Rain'))){
    ref=true;
    notif="Rain"
  }
  if(item.snow==1 && (response.data.currentConditions.conditions.includes('Snow'))){
    ref=true;
    notif="Snow"
  }
 let body=`Its ${notif} in ${response.data.resolvedAddress} as per updated at ${response.data.currentConditions.datetime}.`
// console.log(response.data.currentConditions.conditions+" "+response.data.resolvedAddress)
if(ref){
  obj.push({
    'no':notif,
   'add':response.data.resolvedAddress,
   'dt':response.data.currentConditions.datetime
  })


 }
 

}).catch(function (error) {
  console.error(error);
});
          
          


    }
    
   if(obj.length != 0){
      
    
      res.send(JSON.stringify({ status: 200, error: null, response: obj }));
    
     }
     else{
      res.send(JSON.stringify({ status: 500, error: null, response:obj}));
     } 



  })
});


app.post("/loadprof", (req, res) => {

  let sql = `SELECT * FROM user where uid="${req.body.Uid}"`;
  let query = conn.query(sql, async (err,result) => {

if (err) {
            console.log(err)
            res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
          }
          else{
            res.send(JSON.stringify({ status: 200, error: null, response: result[0]}));
          }

  })


})    




app.post("/updateprof", (req, res) => {

  let sql =`UPDATE user SET Username= '${req.body.Username}',Email='${req.body.Email}',Phone='${req.body.Phone}',Pass='${req.body.Pass}' WHERE uid='${req.body.Uid}'`;
  let query = conn.query(sql, async (err,result) => {

if (err) {
            console.log(err)
            res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
          }
          else{
            res.send(JSON.stringify({ status: 200, error: null, response: "Updated"}));
          }

  })


}) 




app.post("/loadalerts", (req, res) => {

  let sql = `SELECT * FROM notif where uid="${req.body.Uid}"`;
  let query = conn.query(sql, async (err,result) => {

if (err) {
            console.log(err)
            res.send(JSON.stringify({ status: 500, error: null, response:"error" }));
          }
          else{
            res.send(JSON.stringify({ status: 200, error: null, response: result}));
          }

  })


})  

  const PORT = process.env.PORT || 1123;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });