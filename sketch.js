

let pts;
let caslon;
let colorPicker; 
let input;
let img; 
let nval=0.1; 
let sel; 
let recording = false 
let col;
let rot; 
let alpha;



function preload(){
  caslon = loadFont('36days-Light.ttf');
}

function setup() {
 
  createCanvas(windowWidth, windowHeight); 
  
  
  
  colorPicker = createColorPicker('#ffffff');
  colorPicker.position(10, 25); 
  
  colorPickerfill = createColorPicker('#ffffff');
  colorPickerfill.position(10, 85);  
  
  colorPickerol = createColorPicker('#000000');
  colorPickerol.position(10, 145); 
  
  nslider = createSlider(0, 4,1.2, 0.01);
  nslider.position(10, 210);
  nslider.style('width', '100px');  
 
 // nslider.addClass('slider');
  
  
  cslider = createSlider(20, 600, 140, 10);
  cslider.position(10, 265);
  cslider.style('width', '100px');
 // cslider.addClass('slider');
  
  wslider = createSlider(0, 8, 1.7, 0.25);
  wslider.position(10, 320);
  wslider.style('width', '100px'); 
//  wslider.addClass('slider');
  
  rslider = createSlider(0, 4*PI, 0, 0.05);
 rslider.position(10, 375);
rslider.style('width', '100px'); 
  

  sel = createSelect();
  sel.position(8, 435);
  sel.option('square');
  sel.option('circle');
  sel.option('image');
  sel.changed(mySelectEvent);
  sel.addClass('button');
  
  
  input = createFileInput(handleFile);
  input.position(10, 480);
  
  selmouse = createSelect();
  selmouse.position(8, 540);
  selmouse.option('none');
  selmouse.option('points');
  selmouse.option('scale');
  selmouse.option('stroke');
   selmouse.option('rotate');
  selmouse.changed(mySelectEvent);
  selmouse.addClass('button');
 
   button = createButton('save jpg');
  button.position(8, 610);
  button.mousePressed(saveJPG); 
  button.addClass('button'); 
  button.mouseOver(changeGray); 
  button.mouseOut(changeAlpha);
  
 //  button = createButton('save svg');
 // button.position(10, 580);
//  button.mousePressed(saveSVG); 
  //let col = color('grey'); //use color instead of fill
 
 
} 



function draw() { 
  
  let wval = wslider.value();
  let cval = cslider.value();
  let rval = rslider.value();
  let val = sel.value();
  let valmouse = selmouse.value();
  let scalex = (mouseX/5)+5;  
 // let alpha = 255; 
  
  
 
  
  
 // button = createButton('save mp4');
  //let col = color('grey'); //use color instead of fill
//  button.position(8, 625);
//  button.mousePressed(saveMP4);
//  button.style('font-size', '15px');
//  button.style('background-color', col);
//  button.style('color', 'white');
//  button.style('border', 'none');
//  button.style('padding', '8px 15px');
//  button.style('width', '100px');
//  button.addClass('button');
  
  input.style('display', 'none');
   let nval = nslider.value(); 
   let nval2= nval/10; 
  
   print (nval);
  
   if(valmouse != 'points'){  
     nval2= nval/10; 
   } else if(valmouse == 'points'){  
     nval2= (mouseX/(2500)); 
   }
  
   pts = caslon.textToPoints('n', (windowWidth/2)-250, (windowHeight/2)+150, 1100,{
    sampleFactor: nval2,
    simplifyThreshold: 0
  });
  
  
  
  translate (0,0)
  background(colorPicker.color());
  textSize(15); 
  fill(128,128,128,alpha);
  noStroke(); 
  text('Background', 10, 20);
  text('Fill', 10, 80);
  text('Stroke', 10, 140);
  text('Points', 10, 205);
  text('Scale', 10, 260);
  text('Stroke weight', 10, 315);
   text('Rotate', 10, 370); 
  text('Brush shape', 10, 430);
  text('Animate letter', 10, 535);
//  text('Click to start/stop recording ', 10, 620);
  
  fill(colorPickerfill.color());
  stroke(colorPickerol.color()); 
  
  translate(width*0.25, height*0.35)
   scale(0.5);
 
   if(valmouse != 'stroke'){   
  strokeWeight(wval); 
   } else if (valmouse == 'stroke'){ 
     strokeWeight(mouseX/100); 
   }
   
  if(valmouse != 'rotate'){  
     rot = rval; 
   } else if (valmouse == 'rotate'){ 
      rot = mouseX/100; 
   }
  
   if(valmouse != 'scale'){  
     sca = cval; 
   } else if (valmouse == 'scale'){ 
      sca = scalex; 
   }
  
  
  
  for(let i =0; i< pts.length; i++){
 
      
    
  if(val == 'circle'){ 
     push()
    translate((pts[i].x) ,(pts[i].y))
     rotate(rot);
    ellipse(0, 0, sca, sca); 
    input.style('display', 'none'); 
    pop()
  } else if(val == 'square'){
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * 0.03);
    // rotate(rot);
   	rect(-sca/2, -sca/2, sca, sca);  
    input.style('display', 'none');
    pop()
  } else if(val == 'image'){
    push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * 0.03);
    // rotate(rot);
   	input.style('display', 'block');
    if (img) {
    image(img, -sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    noFill();
    rect(-sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    } 
    pop()
  }  

    
    
    
  
  }
  return false;
} 

function mySelectEvent() {
}



function handleFile(file) {
    print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
} 


function changeGray() {
  alpha = 0;
  }
  
function changeAlpha() {
  alpha = 255;
  }


function saveJPG() {
   console.log("saving")
    save();
    console.log("saved...?") 
   
}


//function saveSVG() {
//   save("mySVG.svg"); // give file name
//  print("saved svg");
//}


function saveMP4() {
     if (recording) {
       col = color('grey'); 
    stopRecording()
    recording = false
  } else { 
    col = color('red');
    startRecording()
    recording = true
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
} 

