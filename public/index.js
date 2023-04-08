





function sendNotification (data) {
  if (data == undefined || !data) { return false }
  var title = (data.title === undefined) ? 'Notification' : data.title
  var clickCallback = data.clickCallback
  var message = (data.message === undefined) ? 'null' : data.message
  var icon = (data.icon === undefined) ? 'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png' : data.icon
  var sendNotification = function (){
      var notification = new Notification(title, {
          icon: icon,
          body: message
      })
      if (clickCallback !== undefined) {
          notification.onclick = function () {
              clickCallback()
              notification.close()
          }
      }
  }

  if (!window.Notification) {
      return false
  } else {
      if (Notification.permission === 'default') {
          Notification.requestPermission(function (p) {
              if (p !== 'denied') {
                  sendNotification()
              }
          })
      } else { sendNotification();
      }}}


setInterval(function (){
user_notif();
},30000)
function user_notif(){
  let uid=localStorage.getItem("weather")

$.ajax({
    url:"http://localhost:1123/notif",
    type:"post",
    dataType: "json",
    data: { Uid:uid
    },
    
    success: function(res){
        if(res.status==200){
          for( let i of res.response){
          sendNotification({
            title: `Weather Alert on ${i.add}`,
            message: `Its ${i.no} in ${i.add} as per updated at ${i.dt}.`,
            icon:'https://cdn2.iconfinder.com/data/icons/mixed-rounded-flat-icon/512/megaphone-64.png',
            clickCallback: function () {
              alert('do something when clicked on notification');
            }
          });
        }
          
         
        console.log(res)
        console.log("ppoo")
        
         }
        else if(res.status==500){
          console.log(res)
        }
    }
})
}



$(document).on("click","#profile",function(){
load_profile()
load_alerts()
})
function load_profile(){
  let uid=localStorage.getItem("weather");
  $.ajax({
    url:"http://localhost:1123/loadprof",
    type:"post",
    dataType: "json",
    data: { Uid:uid
    },
    
    success: function(res){
        if(res.status==200){
          $("#val-username").val(res.response.Username)
          $("#val-email").val(res.response.Email)
          $("#val-phone").val(res.response.Phone)
          $("#val-password").val(res.response.Pass)
          console.log(res)
          
        
         }
        else if(res.status==500){
          console.log(res)
        }
    }
})

}

$(document).on("click","#profupdate",function(){
  toastr.success("Updated successfully","Alert Updated",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
})

$(document).on("click","#profupdate",function(){
  
  let uid=localStorage.getItem("weather");


          let username=$("#val-username").val()
          let mail=$("#val-email").val()
          let phone=$("#val-phone").val()
          let pass=$("#val-password").val()

          $.ajax({
            url:"http://localhost:1123/updateprof",
            type:"post",
            dataType: "json",
            data: { Uid:uid,Username:username,Pass:pass,Phone:phone,Email:mail
            },
            
            success: function(res){
                if(res.status==200){
                  
                  toastr.success("Updated successfully","Profile Updated",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
                  
                
                 }
                else if(res.status==500){
                  console.log(res)
                }
            }
        })



  })




function load_alerts(){
  let uid=localStorage.getItem("weather");
  $.ajax({
    url:"http://localhost:1123/loadalerts",
    type:"post",
    dataType: "json",
    data: { Uid:uid
    },
    
    success: function(res){
        if(res.status==200){
          $("#tbody").html('')
          for(let i of res.response){
          $("#tbody").append(
            `<tr>
                <td id="td">${i.location} <i id="delalert" onclick="delalert(${i.id})"data-id="${i.id}"class="fas fa-trash-alt"></i></td>
                
                
                

                
            </tr>`
            )
          }
         
          console.log(res)
          
        
         }
        else if(res.status==500){
          console.log(res)
        }
    }
})
    }



function hel(i){
$(`#viewdet${i}`).css({"display":"block"})
$(`#weathercard__content${i}`).css({"display":"none"})
$(`#weathercard__image${i}`).css({"display":"none"})


 
}
function vi(i){
$(`#weathercard__image${i}`).css({"display":"block"})
$(`#weathercard__content${i}`).css({"display":"block"})
$(`#viewdet${i}`).css({"display":"none"})
}

$("#filters").on("click",function(){

    if($(this).attr("data-loc")==""){
        toastr.warning("Please search the location to apply filters", "Filter Error", { positionClass: "toast-top-right", timeOut: 5e3, closeButton: !0, debug: !1, newestOnTop: !0, progressBar: !0, preventDuplicates: !0, onclick: null, showDuration: "300", hideDuration: "1000", extendedTimeOut: "1000", showEasing: "swing", hideEasing: "linear", showMethod: "fadeIn", hideMethod: "fadeOut", tapToDismiss: !1 }) 
    }
    else{
        $("#savenotif").removeAttr("disabled")
        $("#modaltog").attr("data-toggle","modal")
        $(".modal-title").html($("#filters").attr("data-loc"))



    }
})
$("#savenotif").on("click",function(){
    let clear=0;
        let rain=0;
        let cloudy=0;
        let snow=0;
        let arr=[];
    $("input:checkbox[name='whet']:checked").each(function(){ 
        arr.push($(this).val());
        
        console.log($(this).val());    		
});

if(arr.includes("clear")){
    clear=1;
}
if(arr.includes("rain")){
    rain=1;
}
if(arr.includes("snow")){
        snow=1;
}
if(arr.includes("cloudy")){
    cloudy=1;
}
let uid=localStorage.getItem("weather")
let loc=$("#locsearch").val();
$.ajax({
    url:"http://localhost:1123/filter",
    type:"post",
    dataType: "json",
    data: { Uid:uid,Clear:clear,Rain:rain,Snow:snow,Cloudy:cloudy,Loc:loc
    },
    
    success: function(res){
        if(res.status==200){
            toastr.success("Added successfully","Notification Set",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
           $("#savenotif").attr("disabled","disabled")
        }
        else if(res.status==500){
            alert('error')
        }
    }
})
})


function preference(){
  $("#preferences").html('')
  let userp=localStorage.getItem("weather");
  $.ajax({
    url:"http://localhost:1123/loadpreference",
    type:"post",
    dataType: "json",
    data: { Uid:userp
    },
    
    success: function(res){
      console.log(res)
        if(res.status==200){
          const options = {method: 'GET'};
          if(1){
          for (let [index,item] of res.response.entries()){

            fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${item}?unitGroup=us&key=R86J89WUP99QYVYUYRXTEQNV6&contentType=json`, options)
.then(respo => respo.json())
.then(function(respo){
            var i=respo.currentConditions;



var tm=i.temp;
var Celsius = Math.round((tm-32) * 5 / 9);
var image=''
switch(i.icon){
    case 'clear-day': image='clear.png'
    break;
    case 'rain': image='rain.png'
    break;
    case 'partly-cloudy-day' || "partly-cloudy-night": image='cloud.png'
    break;
    case 'snow': image='snow.png'
    break;
    case 'cloudy': image='cloudy.png'
    break;
    default:image='404.png'
}
index=index+1;``

$(".swiper-wrapper").append(`

<div class="weathercard swiper-slide" id="in${index}" data-cardw="${i.icon}" >
    <div id ="viewdet${index}" class="viewdet">
        
        <p>Sunrise : ${i.sunrise} </p>
        <p>Sunset  : ${i.sunset}</p>
        <p> Cloud cover : ${i.cloudcover }</p>
        <p>Wind-speed: ${i.windspeed}</p>
        <p>UV-index : ${i.uvindex}</p>
      
        <p>UV-index : ${i.uvindex}</p>
                    <button type="button" id="closeview" onclick="vi(${index})" class="btn mb-1 btn-rounded btn-secondary">close</button>
      </div>              
                    

    <div class="weathercard__image" id="weathercard__image${index}">
        <img src="/images/${image}" alt="card image">
    </div>

    <div class="weathercard__content" id="weathercard__content${index}">
    <h4>${item}</h4>
        <span class="weathercard__name" id="celcius">${Celsius}<sup>c</sup></span>
      <span class="weathercard__title">${i.datetime}</span>
      <span class="weathercard__name">${i.conditions}</span>
      
       
      
       <button id="viewq" onclick="hel(${index})" class="weathercard__btn">View More</button>
    </div>
  </div>

`)
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
})
            $("#preferences").append(`<li> <p>${item}<p> <p><i id="delpref" onclick="prfe('${item}')"data-pref="${item}"class="fas fa-trash-alt"></i></p></li>`)
          }
        }
        }
        else if(res.status==500){
            console.log('preference error')
        }
    }
})
}
function curloc(){

 preference()
 $("#filters").attr("data-loc",'')
 $("#lochead").html(`Weather App`)

  
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition,showError);
} else { 
 alert( "Geolocation is not supported by this browser.");
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      preference();
      $(".swiper-wrapper").html('')
   alert( "Owner has disabled the request for Geolocation beacuse its not HTTPS and home page may act a bit different.")
      break;
    case error.POSITION_UNAVAILABLE:
   alert( "Location information is unavailable.")
      break;
    case error.TIMEOUT:
   alert( "The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
   alert( "An unknown error occurred.")
      break;
  }
}

function showPosition(position) {



        const options = {method: 'GET'};

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${position.coords.latitude},${position.coords.longitude}?key=R86J89WUP99QYVYUYRXTEQNV6&contentType=json`, options)
  .then(response => response.json())
  .then(function(response){
    console.log(response)


    

  $(".swiper-wrapper").html('')
 

var i=response.currentConditions;



var tm=i.temp;
var Celsius = Math.round((tm-32) * 5 / 9);
var image=''
switch(i.icon){
    case 'clear-day': image='clear.png'
    break;
    case 'rain': image='rain.png'
    break;
    case 'partly-cloudy-day' || "partly-cloudy-night": image='cloud.png'
    break;
    case 'snow': image='snow.png'
    break;
    case 'cloudy': image='cloudy.png'
    break;
    default:image='404.png'
}


$(".swiper-wrapper").append(`

<div class="weathercardo  swiper-slide"  id="zero" data-cardw="${i.icon}">
    <div id ="viewdet0" class="viewdet">
        
        <p>Sunrise : ${i.sunrise} </p>
        <p>Sunset  : ${i.sunset}</p>
        <p>Humidity : ${i.humidity}</p>
        <p> Cloud cover : ${i.cloudcover }</p>
        <p>Wind-speed: ${i.windspeed}</p>
        <p>UV-index : ${i.uvindex}</p>
        <button type="button" id="closeview" onclick="vi(0)" class="btn mb-1 btn-rounded btn-secondary">close</button>

    </div>  
    <div class="weathercard__image" onclick="hel(0)" id="weathercard__image0">
        <img src="../images/${image}" alt="card image">
    </div>

    <div class="weathercard__content0" id="weathercard__content0">
    <h4>Current IP Location</h4>
        <span class="weathercard__name" id="celcius">${Celsius}<sup>c</sup></span>
      <span class="weathercard__title" >${i.datetime}</span>
      <span class="weathercard__name" id ="title">${i.conditions}</span>
      <div id="grp">
        <h5 id="hcur"></h5>
       
       </div>
    
    </div>
  </div>`)


  const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '0d3f28c30fmsh9fe617d8ee72490p1c02f7jsn4340c04a5211',
        'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
    }
};

fetch(`https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&accept-language=en&polygon_threshold=0.0`, options)
    .then(resp => resp.json())
    .then(function(resp){
        console.log(resp)
        $("#hcur").html(`<i class="fas fa-map-marker"></i> ${resp.address.amenity} ,${resp.address.road},${resp.address.city}.`);
    })
    .catch(err => console.error(err));


var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
// console.log(response.days)

var bg=$(`#zero`).data("cardw")

  switch(bg){
    case 'clear-day': $("body").css({ "background-image": `url(images/bg-clear.jpg)`})
    break;
    case 'rain': $("body").css({ "background-image": `url(images/bg-rain.jpg)`})
    break;
    case 'partly-cloudy-day':  $("body").css({ "background-image": `url(images/bg-cloud.jpg)`})
    break;
    case 'snow': $("body").css({ "background-image": `url(images/bg-snow.jpg)`})
    break;
    case 'cloudy': $("body").css({ "background-image": `url(images/bg-cloudy.jpg)`})
    break;

}


swiper.on('slideChange', function () {
  console.log(swiper.activeIndex);
  console.log($(`#in${swiper.activeIndex}`).data("cardw"))
  if(swiper.activeIndex==0){
    var bg=$(`#zero`).data("cardw")
  }
  else{

      var bg=$(`#in${swiper.activeIndex}`).data("cardw")
  }
  switch(bg){
    case 'clear-day': $("body").css({ "background-image": `url(images/bg-clear.jpg)`})
    break;
    case 'rain': $("body").css({ "background-image": `url(images/bg-rain.jpg)`})
    break;
    case 'partly-cloudy-day':  $("body").css({ "background-image": `url(images/bg-cloud.jpg)`})
    break;
    case 'snow': $("body").css({ "background-image": `url(images/bg-snow.jpg)`})
    break;
    case 'cloudy': $("body").css({ "background-image": `url(images/bg-cloudy.jpg)`})
    break;

}

});

      })

.catch(err => console.error(err));

}

    
}
if(!(localStorage.getItem('weather'))){
  window.location.href='login.html'

}
else{
  curloc();
}
$("#sclose").css({
  "display":"none"
})

$("#sclose").on("click",function(){
  $("#locsearch").val('');
  $("#locsearch").attr('placeholder', 'Search Location');
   $(this).hide();
   
   curloc();

});


$("#locsearch").on("keyup",function(){
  var item =$(this).val();
  
  if(item ==""){
      $("#sclose").hide();
  }
  else{
      $("#sclose").show();
  }
})

$(document).on("click","#bookmark",function(){
  let v=$("#filters").attr("data-loc").split(",")
  var loc=$("#locsearch").val() || v[0];
  var user=localStorage.getItem("weather");

  
    $.ajax({
      url:"http://localhost:1123/bookmark",
      type:"post",
      dataType: "json",
      data: { Loc:loc,User:user
      },
      
      success: function(res){
          if(res.status==200){
              toastr.success("Added successfully","Preference Set",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
              $("#bookmark").attr("class","fas fa-bookmark")
              $("#preferences").html('')
              preference();
              
          }
          else if(res.status==500){
              alert("Location Already Added")
          }
          else if(res.status==700){
            alert("Some Error Occured")
          }
      }
  })
  
})




function prfe(i){

        var user = localStorage.getItem("weather")

       
        $.ajax({
          url:"http://localhost:1123/delbookmark",
          type:"post",
          dataType: "json",
          data: { Loc:i,User:user
          },
          
          success: function(res){
              if(res.status==200){
                  toastr.success("Preference Deleted successfully","Preference Set",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
                 
                  $("#preferences").html('')
                  curloc()
            
                  
              }
              else if(res.status==500){
                  alert("Some Error Occured")
              }
              else if(res.status==700){
                alert("Some Error Occured")
              }
          }
      })

}

function delalert(i){

  var user = localStorage.getItem("weather")

 
  $.ajax({
    url:"http://localhost:1123/delalert",
    type:"post",
    dataType: "json",
    data: { Id:i,Uid:user
    },
    
    success: function(res){
        if(res.status==200){
            toastr.success("Alert Deleted successfully","Alert Updated",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
           
           
            load_alerts()
      
            
        }
        else if(res.status==500){
            alert("Some Error Occured")
        }
        else if(res.status==700){
          alert("Some Error Occured")
        }
    }
})

}