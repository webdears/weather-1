$("#signup").on("click",function(){
    let user=$("#signinuser").val();
    let pass=$("#signinpass").val();

    var condition=true;

    if(user==''|| user.trim() ==''){
        toastr.warning("Please Provide valid user name", "Username Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(pass==''|| pass.trim() ==''){
        toastr.warning("Please Provide valid Password", "password Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }

    if(condition){
       
                if(user!=''  && pass!=''){
                    $.ajax({
                                url:"https://weather-1.vercel.app/signup",
                                type:"post",
                                dataType: "json",
                                data: { User:user,Pass:pass
                                },
                                success: function(res){
                                    console.log(res.response)
                                    if(res.status==200){
                                        swal("Logged In Successfully")
                                        setTimeout(function(){
                                            window.location.href='index.html'
                                            localStorage.setItem('weather',res.response[0].uid)

                                        
                                        },2000)
                                    }
                                    else if(res.status==500){
                                        swal("Error...", "Please Enter Valid Credentials !!", "error");

                                    }
                                    else{
                                        alert("No user exist")
                                    }

                                }
                            })

                }
                else{
                    alert('Please Enter Correct Details')
                }
    }
})

$("#save").on("click",function(){
    var condition=true;
    let username=$("#val-username").val()
    let pass=$("#val-password").val()
    let confirm=$("#val-confirm-password").val()
    let phone=$("#val-phone").val()
    let mail=$("#val-email").val()
    var nump= /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    var epat=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // var patt= /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;


    if(username==''|| username.trim() =='' || !(username.length >= 5)){
        toastr.warning("Please Provide valid Username with atleast 5 characters", "username Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(pass==''|| pass.trim() ==''){
        toastr.warning("Please Provide valid Password", "Password Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(confirm==''|| confirm.trim() ==''){
        toastr.warning("Please Provide valid confirm Password", "confirm password Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }

    if(phone==''|| phone.trim() =='' || !(nump.test(phone))){
   
        toastr.warning("Please Provide valid Phone number", "Phone Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(mail==''|| mail.trim() =='' || !(epat.test(mail))){
        toastr.warning("Please Provide valid mail", "Email Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(!(pass===confirm)){
        toastr.warning("Password and confirm password doesn't match", "Password Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(condition){
        $.ajax({
            url:"https://weather-1.vercel.app/mail",
            type:"post",
            dataType: "json",
            data: { tomail:mail,phone_no:phone
            },
            beforeSend:function(){ 
                $("#save").attr("disabled","disabled");
                $("#save").html('Sending...');
            },
            success: function(res){
                if(res.status==200){
                    toastr.success("Check Your Mail Inbox","OTP SENT",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
                    $("#save").css({"display":"none"})
                    $("#validate_section").slideDown();
                }
                else if(res.status==500){
                    alert('error')
                }
            }
        })
    }



})

$("#submit").on("click",function(){
    let mail=$("#val-email").val()
    var condition=true;
    let otp=$("#val-otp").val();
    if(otp==''|| otp.trim() ==''){
        toastr.warning("Please Provide valid OTP", "otp Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
        condition=false
    }
    if(condition){
    
  
        $.ajax(`https://weather-1.vercel.app/validateotp?mail=${mail}&otpval=${otp} `, {
            type: 'GET',
            dataType: 'json',
         
      
            success: function(res){
                // console.log(res)
                if(res.status==200){
                    console.log(res)
                    // alert(0000)
                  var conf= confirm("Press this confirm button!");
                  if(conf){
                    let username=$("#val-username").val()
                    let pass=$("#val-password").val()
                   
                    let phone=$("#val-phone").val()
                    let mail=$("#val-email").val()
                            $.ajax({
                                url:"https://weather-1.vercel.app/insertdata",
                                type:"post",
                                dataType: "json",
                                data: { Username:username,Pass:pass,Phone:phone,Email:mail
                                },
                                success: function(res){
                                    if(res.status==200){
                                        swal("Data Saved Successfully")
                                        // $("#otpbutton").css({"display":"none"})
                                        console.log(res)
                                        setTimeout(function(){
                                            window.location.reload()
                                        },3000)
                                        // alert("Success")
                                        // $("#validate_section").slideDown();
                                    }
                                    else if(res.status==500){
                                        console.log(res)
                                        console.log("poo")
                                      
                                        swal("Oops...", "Something went wrong !!", "error");
                                        // alert("error")

                                    }
                                    
                                }
                            })
                        }
                }
                else if(res.status==500){
                    // alert('error')
                    console.log(res)
                                        // console.log(res)
                     swal("Invalid OTP","Please Enter valid OTP","error")
                    // sweetAlert("In Correct","Enter Valid OTP!!","Error")
                    

                }
                else if(res.status==700){
                    console.log(res)
                    // console.log(res)
                 swal("Something went wrong","Please Try later","error")
                                    }
                
            }
        })
    }
})


$("#sendotp").on("click",function(){
   let mail= $("#forgotemail").val();
   if(mail != ""){
    $.ajax({
        url:"https://weather-1.vercel.app/mail",
        type:"post",
        dataType: "json",
        data: { tomail:mail
        },
        beforeSend:function(){ 
            $("#sendotp").attr("disabled","disabled");
            $("#sendotp").html('Sending...');
        },
        success: function(res){
            if(res.status==200){
                toastr.success("Check Your Mail Inbox","OTP SENT",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
                $("#sendotp").css({"display":"none"})
                
                $("#otpdiv").slideDown();
            }
            else if(res.status==500){
                alert('NO user Exist for the given Email')
            }
        }
    })

   }

})
$("#sendqr").on("click",function(){
    let mail= $("#forgotemail").val();
    let otp= $("#forgototp").val();
    
    $.ajax(`https://weather-1.vercel.app/validateotp?mail=${mail}&otpval=${otp} `, {
            type: 'GET',
            dataType: 'json',
         
      
            success: function(res){
                // console.log(res)
                if(res.status==200){
                    console.log(res)
                    // alert(0000)
            
                            $.ajax({
                                url:"https://weather-1.vercel.app/qr",
                                type:"get",
                                dataType: "json",
                                data: { Email:mail
                                },
                                success: function(res){
                                    if(res.status==200){
                                        swal("Password sent to Email")
                                        
                                        console.log(res)
                                        setTimeout(function(){
                                            window.location.url="login.html"
                                        },3000)
                                       
                                    }
                                    else if(res.status==500){
                                
                                     
                                      
                                        swal("Oops...", "Something went wrong !!", "error");
                                        // alert("error")

                                    }
                                    else if(res.status==800){
                                        swal("Oops...", "Please Create Account First", "error");
                                    }
                                    
                                }
                            })
                        
                }
                else if(res.status==500){
                    // alert('error')
                    console.log(res)
                                        // console.log(res)
                     swal("Invalid OTP","Please Enter valid OTP","error")
                    // sweetAlert("In Correct","Enter Valid OTP!!","Error")
                    

                }
                else if(res.status==700){
                    console.log(res)
                    // console.log(res)
                 swal("Something went wrong","Please Try later","error")
                                    }
                
            }
        })
})
