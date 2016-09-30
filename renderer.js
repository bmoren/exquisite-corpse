// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var top, middle, bottom;
var topPath, middlePath, bottomPath;
var pTop, pMiddle, pBottom;
var mainLoop;
var fadeSpeed = 200;

var $ = require("jquery");
var junk = require('junk');
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const {dialog} = require('electron').remote

var gui = new dat.GUI();

var S = {
  'speed': 3,
  'backgroundColor': [255,255,255],
  'hide' : function(){ dat.GUI.toggleHide();},

  'invert' : function(){
    var filterCheck = $('img').hasClass('invert')
    if( filterCheck){
      $('img').removeClass('invert')
      $('body').css('background-color', 'white');
    }
    if( filterCheck == false){
      $('img').addClass('invert')
      $('body').css('background-color', 'black');

    }
  },

  'getHeadFiles': function(){
    dialog.showOpenDialog({properties: ['openDirectory']}, function(path){
      topPath = path[0]

      fs.readdir(topPath, function(err,files){
        // console.log(files)
        top = files.filter(junk.not)
        console.log(top)
        console.log(topPath)
      })
    })
  },

  'getBodyFiles': function(){
    dialog.showOpenDialog({properties: ['openDirectory']}, function(path){
      middlePath = path[0]

      fs.readdir(middlePath, function(err,files){
        // console.log(files)
        middle = files.filter(junk.not)
        console.log(middle)
        console.log(middlePath)
      })
    })
  },

  'getLegFiles': function(){
    dialog.showOpenDialog({properties: ['openDirectory']}, function(path){
      bottomPath = path[0]

      fs.readdir(bottomPath, function(err,files){
        // console.log(files)
        bottom = files.filter(junk.not)
        console.log(bottom)
        console.log(bottomPath)
      })
    })
  },

  'go': function(){
    mainLoop = setInterval(draw, Math.round(S.speed) * 1000)
  }

}

gui.add(S, 'getHeadFiles').name('Select Head Files');
gui.add(S, 'getBodyFiles').name('Select Body Files');
gui.add(S, 'getLegFiles').name('Select Leg Files');
gui.add(S, 'go').name('Start!')
gui.add(S, 'invert');
var speedReset = gui.add(S, 'speed', 3, 60).name('speed (seconds)');
gui.add(S, 'hide').name("press 'h' to hide menu")


speedReset.onFinishChange(function(value){
  console.log(value)
  clearInterval(mainLoop);
  mainLoop = setInterval(draw, Math.round(S.speed) * 1000)
})

// mainLoop = setInterval(draw, Math.round(S.speed) * 1000) // init
function draw(){

  var topRand = Math.floor( Math.random() * top.length ); //get a rand
  while(topRand == pTop){
    topRand = Math.floor( Math.random() * top.length );
  }

  pTop = topRand;
  $('.top').fadeOut(fadeSpeed, function(){
      $('.top').attr('src', topPath + '/' + top[topRand] ).fadeIn(fadeSpeed)
  })


  var middleRand = Math.floor( Math.random() * middle.length ); //get a rand
  while(middleRand == pMiddle){
    middleRand = Math.floor( Math.random() * middle.length );
  }

  pMiddle = middleRand;
  $('.middle').fadeOut(fadeSpeed,function(){
    $('.middle').attr('src', middlePath + '/' + middle[middleRand] ).fadeIn(fadeSpeed)
  })

  var bottomRand = Math.floor( Math.random() * bottom.length ); //get a rand
  while(bottomRand == pBottom){
    bottomRand = Math.floor( Math.random() * bottom.length );
  }

  pBottom = bottomRand;
  $('.bottom').fadeOut(fadeSpeed,function(){
    $('.bottom').attr('src', bottomPath + '/' + bottom[topRand] ).fadeIn(fadeSpeed)
  })

}



