/*
Ma esquerra:
1 dit= canvi de color fondo a gris a negre
2 dit= afegir cercles
3 dit=treure cercles
4 dit= canvi de color fons de negre a gris


Ma dreta:
Primer estat dit 2:

En aquest mode a la part dreta es veu com el cercle 1 esta pintat de color random i el cercle 2 té un random a l’stroke.
Si els cercles van cap a la part esquerra nomes se’ls hi veu el stroke. Blanc per el cercle 1 i random per el cercle 2.
A part de que es van fent petits i grans.
A part d’això surt el rectangle pintat de color random i es fa petit i gran

Segon estat dit 3:
Aquest mode es similar al anterior però amb la variant que els rectangles no estan pintats per dins i nomes es veu la línia de color random.
A part d’això el cercle 2 i el rectangle canviant de tamany més ràpidament.
Per la part del cercle 1 el canvi de tamany es més lent que el cercle 2.
A la part dreta es veu el cercle 1 amb stroke de color blanc i a la part dreta es veu el cercle pintat de color random.

Tercer estat dit 4:
En aquest mode només es veuen els rectangles sense estar pintats de dintre. Fent-se petits i grans.

*/

// Landmark indexes for fingertips [pointer, middle, ring, pinky]...these are the same for both hands
let fingertips = [8, 12, 16, 20]

//variables
let c1=[];
let c2=[];
let num=20;
let idMode=0;
let changeBackground=0;


function setup () {
  sketch = createCanvas(800, 450)
  

  handsfree = new Handsfree({
    showDebug: false, // Comment this out to hide the default webcam feed with landmarks
    hands: true
  })
  handsfree.enablePlugins('browser')
  handsfree.plugin.pinchScroll.disable()
  
  // Add webcam buttons under the canvas
  // Handsfree.js comes with a bunch of classes to simplify hiding/showing things when things are loading
  // @see https://handsfree.js.org/ref/util/classes.html#started-loading-and-stopped-states
  buttonStart = createButton('Start Webcam')
  buttonStart.class('handsfree-show-when-stopped')
  buttonStart.class('handsfree-hide-when-loading')
  buttonStart.mousePressed(() => handsfree.start())

  // Create a "loading..." button
  buttonLoading = createButton('...loading...')
  buttonLoading.class('handsfree-show-when-loading')

  // Create a stop button
  buttonStop = createButton('Stop Webcam')
  buttonStop.class('handsfree-show-when-started')
  buttonStop.mousePressed(() => handsfree.stop())
  
  
  //Create circle
  noSmooth();
   for (let i=0; i<num; i++) {
     c1.push(new cercle(width/2, height/2,random(-5, 5),random(-5, 5)));
     c2.push(new cercle2(random(width/2),random(height/2),random(-1, 1),random(-1, 1)));
  }
  

}






/**
 * Main draw loop
 */
function draw () {
 
  //funcio per detectar els dits i aplicar els canvis de color, modes i fons de pantalla
  //ma dreta son els canvis de estat es a dir els 3 modes i
  //ma esquerra son afegir cercles, treure cercles i canvis de color entre negre i gris clar
  fingerPaint()
  
  //fons de pantalla
  //si es 0 negre si es 1 gris clar
  switch(changeBackground){
      case 0:
              background(0);
      break;
    case 1:
       background(155,155,155);
      break;
  }

  //Modes
   switch(idMode){
    case 0:
          //background(0);
          crearCercle();
          crearCercle2();
          collision(); 
          break;
    case 1:
         // background(0);
          crearCercle();
          crearCercle2();
          collision(); 
          break; 
          
    case 2:
          //background(135,206,250);
          crearCercle();
          crearCercle2();
          collision(); 
          break; 
          
   case 3:
          //background(0);
          crearCercle();
          crearCercle2();
          collision(); 
          break; 
    
  }

}

//funcio per crear els cercles
function crearCercle(){
  if(idMode==0){
   for (let i = 0; i < c1.length; i++) {    
    c1[i].run();
    
  }
}else if(idMode==1){
   for (let i = 0; i < c1.length; i++) {    
    c1[i].run2();
     
  }
}else if(idMode==2){
   for (let i = 0; i < c1.length; i++) {    
    c1[i].run3();
     
  }
}else if(idMode==3){
    for (let i = 0; i < c1.length; i++) {    
    c1[i].run4();
    
  }
}
 
}



function crearCercle2(){
  if(idMode==0){
   for (let i = 0; i < c2.length; i++) {    
    c2[i].run();
  }
}else if(idMode==1){
   for (let i = 0; i < c2.length; i++) {    
    c2[i].run2();
  }
}else if(idMode==2){
   for (let i = 0; i < c2.length; i++) {    
    c2[i].run3();
  }
}else if(idMode==3){
    for (let i = 0; i < c2.length; i++) {    
    c2[i].run4();
  }
}
 
}


//si colisiona el cercle surt un rectangle
function collision(){
  
  for (let i = 0; i < c1.length; i++) {
    for (let j = 0; j < c2.length; j++) {      
        let hit=circleCircle(c1[i].posX,c1[i].posY,c1[i].size,c2[j].posX,c2[j].posY,c2[j].size);
        
          if (hit) {
            //dibuixar rectangle si toquen
            //stroke(random(200),random(200),random(200));
            if (idMode==2){              
              noFill();
              rect(c2[j].posX -10,c2[j].posY-10,c2[j].size,c2[j].size);
            }else if(idMode==3){
               noFill();
               rect(c2[j].posX,c2[j].posY,c2[j].size-10,c2[j].size-10);
            }else{
              fill(random(200),random(200),random(200));
              rect(c2[j].posX,c2[j].posY,c2[j].size,c2[j].size);
            }
              
          }
  
       }
    }
}

//colisio cercles
function circleCircle( c1x,  c1y,  c1r,  c2x,  c2y,  c2r) {

  
  let distX = c1x - c2x;
  let distY = c1y - c2y;
  let distance = sqrt( (distX*distX) + (distY*distY) );

 
  if (distance <= c1r+c2r) {
    return true;
  }
  return false;
}




function fingerPaint () {

  let bounds = document.querySelector('canvas').getClientRects()[0];
  const hands = handsfree.data?.hands;

  // Paint with fingers
  if (hands?.pinchState) {
    // Loop through each hand
    hands.pinchState.forEach((hand, handIndex) => {
      // Loop through each finger
      hand.forEach((state, finger) => {
        if (hands.landmarks?.[handIndex]?.[fingertips[finger]]) {
          
          // Landmarks are in percentage, so lets scale up
          let x = sketch.width - hands.landmarks[handIndex][fingertips[finger]].x * sketch.width
          let y = hands.landmarks[handIndex][fingertips[finger]].y * sketch.height

       
        
        }
      })
    })  
  } 
  
     // Start line on the spot that we pinched
          if (hands?.pinchState && hands.pinchState[1][1] === 'start') { //start = click //important
            //print("apreta un cop");
                      idMode=1;
                      print("Mode 1: " + idMode);

          // Add a line to the paint array
          } else if (hands?.pinchState && hands.pinchState[1][2] === 'start') { //manté apretat //important
            //print("apretant dit 3")
                      idMode=2;
                      print("Mode 2: " + idMode);

          }else if (hands?.pinchState && hands.pinchState[1][3] === 'start'){
                      idMode=3;
                     print("Mode 3: " + idMode);
          }

          
          
          
          if (hands?.pinchState && hands.pinchState[0][1] === 'start') { 
                 //Afegir mes cercles segon dit
            
            c1.push(new cercle(width/2, height/2,random(-5, 5),random(-5, 5)));
           c2.push(new cercle2(random(width/2),random(height/2),random(-1, 1),random(-1, 1)));
            print("Afegir");
      
          } else if (hands?.pinchState && hands.pinchState[0][2] === 'start') { 
             //treure cercles tercer dir
            c1.splice(0,1);
            c2.splice(0,1);
            print("Treure");

          }else if (hands?.pinchState && hands.pinchState[0][0] === 'start'){
                  //canvi de color background negre  primer dit
                 changeBackground=0;
                      print("Canvi color fons :" + changeBackground);
          }else if (hands?.pinchState && hands.pinchState[0][3] === 'start'){
                  //canvi de color background gris dit petit
             changeBackground=1;            
            print("Canvi color fons :" + changeBackground);
                
          }
}
  



function keyPressed(){
  if(key=='a'){
           
    idMode=1;
  }
  
    if(key=='s'){
          
    idMode=2;
  }
  
    if(key=='d'){
     
    idMode=3;
  }
  
}







//Classe cercle

class cercle {

  constructor( x,  y, velX,  velY) {
    this.posX=x;
    this.posY=y;
    this.velX=velX;
    this.velY=velY;
    this.sizeSpeed = random(0.025,0.01);
    this.maxSize = random(80);
    this.size=10;
    this.minSize=10;
    this.tick=1;
  }

   run() {  
  
    //actualitzem posicions
    
    this.posX += this.velX;
    this.posY += this.velY;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();
       stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
      
       circle(this.posX, this.posY, this.size);
       //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 50);
          //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 20);
      
    }else{
     
       fill(255);     
      circle(this.posX, this.posY, this.size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
  
  
  
  
    run2() {   
  
    //actualitzem posicions
    
    this.posX += this.velX;
    this.posY += this.velY;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();
       stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
      
       circle(this.posX, this.posY, this.size);
       //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 50);
          //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 20);
      
    }else{
     
       
       noFill();
        stroke(255);
      circle(this.posX, this.posY,this.size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
    run3() {   
  
    //actualitzem posicions
    
    this.posX += this.velX;
    this.posY += this.velY;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed-20),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();
       stroke(random(200),random(200),random(200));
      fill(random(200),random(200),random(200));
      
       circle(this.posX, this.posY, this.size);
       //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 50);
          //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 20);
      
    }else{
     
      
       noFill();
        stroke(255);
      circle(this.posX, this.posY, this.size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
     run4() {   
  
    //actualitzem posicions
    
    this.posX += this.velX;
    this.posY += this.velY;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();
      // stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
      
       //circle(posX, posY, size);
       //fill(random(200),random(200),random(200));
       //circle(posX,posY,size - 50);
          //fill(random(200),random(200),random(200));
       //circle(posX,posY,size - 20);
      
    }else{
     
       //fill(255);
       noFill();
        //stroke(255);
      //circle(posX, posY, size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
}

//classe cercle 2
class cercle2 {
  

  constructor( x,  y, velX,  velY) {
    this.posX=x;
    this.posY=y;
    this.velX=velX;
    this.velY=velY;
    this.sizeSpeed = random(0.025,0.01);
    this.maxSize = random(80);
    this.minSize=10;
    this.tick=1;
    this.size=10;
  }

   run() {   
  
    //actualitzem posicions
    
    this.posX += this.velX +1;
    this.posY += this.velY +1;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();       
       stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
     
      //rect(posX,posY,size,size);
       circle(this.posX, this.posY, this.size);
       //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 50);
          //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 20);
      
    }else{
     
        fill(255,0,0);     
        circle(this.posX, this.posY, this.size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
 run2() {   
  
    //actualitzem posicions
    
    this.posX += this.velX +1;
    this.posY += this.velY +1;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();       
       stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
     
      //rect(posX,posY,size,size);
       circle(this.posX, this.posY, this.size);
       //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 50);
          //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 20);
      
    }else{
     
        noFill();     
        circle(this.posX, this.posY, this.size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
    run3() {   
  
    //actualitzem posicions
    
    this.posX += this.velX +1;
    this.posY += this.velY +1;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed*10),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();       
       stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
     
      //rect(posX,posY,size,size);
       circle(this.posX, this.posY, this.size);
       //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 50);
          //fill(random(200),random(200),random(200));
       circle(this.posX,this.posY,this.size - 20);
      
    }else{
     
        noFill();     
        circle(this.posX, this.posY, this.size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
  
  
      run4() {   
  
    //actualitzem posicions
    
    this.posX += this.velX +1;
    this.posY += this.velY +1;

    this.tick++;
    this.size = map(sin(this.tick * this.sizeSpeed),-1.0,1.0,this.minSize,this.maxSize);
    //dibuixem
     if(this.posX >=450){
        noFill();       
       //stroke(random(200),random(200),random(200));
      //fill(random(200),random(200),random(200));
     
      //rect(posX,posY,size,size);
       //circle(posX, posY, size);
       //fill(random(200),random(200),random(200));
       //circle(posX,posY,size - 50);
          //fill(random(200),random(200),random(200));
       //circle(posX,posY,size - 20);
      
    }else{
     
        noFill();     
        //circle(posX, posY, size);
    }    
    if (this.posX<0) this.posX = width;
    if (this.posX>width) this.posX = 0;
    if (this.posY<0) this.posY = height;
    if (this.posY>height) this.posY = 0;
       
    
  }
}


