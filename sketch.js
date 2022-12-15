// const Voronoi = require("./libraries/rhill-voronoi-core");


// TODO:
// make a line-width slider
// make image drawer
// make dots/stars

let DPI = 60;
let inch_per_mm = 0.0393701;
let image_size_mm = 290;
let w = DPI*inch_per_mm*image_size_mm;
let radius = 10;
let N = 30*3;

let make4 = true;

let imgn = 0;

let should_update = true;

let sel;
let bgsel;
let button;
let bgitem = "white";
let item = "imperfect circles";

let randomness = 0.5;

let mouseScale = 20;
// random grey colors
let bw_random_colors = [];
let leafs = [];

for(var i = 0; i < 4; i++){
  bw_random_colors.push(i/6*255+50, i/6*255+50, i/6*255+50);
}
let random_colors = ["#FFE9A0", "#367E18", "#F57328", "#CC3636"];

let last_mousex = 0;


function preload(){
  leaf1 = loadImage("image_atoms/leaf1.png");
  leaf2 = loadImage("image_atoms/leaf2.png");
  leaf3 = loadImage("image_atoms/leaf3.png");
  leaf4 = loadImage("image_atoms/leaf4.png");
  leafs = [leaf1, leaf2, leaf3, leaf4];

  logo1 = loadImage("image_atoms/logo_rockwool.png");
  logo2 = loadImage("image_atoms/logo_domino.png");
  logos = [logo1, logo2];
}


function setup() {
  createCanvas(w, w);
  button = createButton("Save image!");
  button.mouseClicked(moveButton);
  button.size(200,50);
  button.position(w,50);
  button.style("font-family", "Bodoni");
  button.style("font-size", "32px");


  
  bgsel = createSelect();

  bgsel.position(w, 112);
  bgsel.size(200, 25);
  bgsel.style("font-family", "Bodoni");
  bgsel.style("font-size", "16px");
  bgsel.option('white');
  bgsel.option('black');
  bgsel.option('gradient');
  bgsel.selected('white');
  bgsel.changed(changeType);


  sel = createSelect();
  sel.position(w, 150);
  sel.size(200, 25);
  sel.option('imperfect circles');
  sel.option('b&w flowers');
  sel.option('coloured flowers');
  sel.option('slashes');
  sel.option('stars');
  sel.option('pattern');
  sel.option('leafs');
  sel.option('logos');
  sel.selected('pattern');
  sel.changed(changeType);
  sel.style("font-family", "Bodoni");
  sel.style("font-size", "16px");

  randomness_slider = createSlider(0, 1, 0.5, 0.01);
  randomness_slider.position(w, 200);
  // change text color
  randomness_slider.style('color', '#000000');

  textBox = createInput('');
  textBox.position(w,20)
  textBox.size(85)
  textBox.style("font-family", "Bodoni");
  textBox.value(mouseScale);
  button = createButton('Change scale');
  button.position(textBox.x + textBox.width+10, textBox.y);
  // button.mousePressed(updateValue);
  

  update();  
}

function changeType(){
  item = sel.value();
  bgitem = bgsel.value();
  update();
}

function map_x_and_y(x, y){
  return [floor(mouseX/w*x), floor(mouseY/w*y)];
}
function moveButton(){
  save(item + ".png");
}

function update(){
  mouseScale = textBox.value();
  randomness = randomness_slider.value();
  // background("#6D9886");
  // console.log("update");
  bgitem = bgsel.value();
  item = sel.value();
  if(bgitem == "white"){
    background(255);
  } else if(bgitem == "black"){
    background(0);
  } else if(bgitem == "gradient"){
    background(255);
    let c2 = color(150);
    let c1 = color(255);
    for(let y=0; y<w; y++){
      let n = map(y,0,w,0,1);
      let newc = lerpColor(c1,c2,n);
      stroke(newc);
      line(0,y,width, y);
    }
  }

  // make_flowers(floor(mouseY/w*10), w/7 * mouseX/w);
  // art_deco(floor(w/50 * mouseX/w), floor(mouseY/w*10) );
  let mouse = map_x_and_y(mouseScale, mouseScale);

  // choose which function to run based on the dropdown menu
  if(item == "imperfect circles"){
    make_imperfect_circles(1+mouse[0],4 + mouse[1]);
  } else if(item == "b&w flowers"){
    make_flowers(floor(mouseY/w*10), w/7 * mouseX/w, "bw");
  } else if(item == "coloured flowers"){
    make_flowers(floor(mouseY/w*10), w/7 * mouseX/w, "colour");
  } else if(item == "black circles"){
    make_black_circles(floor(mouseY/w*10), w/7 * mouseX/w);
  } else if(item == "slashes"){
    make_slashes(mouse[0]*10+1);
  } else if(item == "stars"){
    make_stars(mouse[0]);
  } else if(item == "leafs"){
    make_images(mouse[0], "leafs");
  } else if(item == "logos"){
    make_images(mouse[0], "logos");
  } else if(item == "pattern"){
    make_pattern(mouse[0], mouse[1]);
    // make_noise_squares(mouse[0], mouse[1]);
  }
  // make_circs(w/70 * mouseX/w);
  // make_slashes(mouse[0]*10+1);
  // console.log("update");
  // make_stars(mouse[0]);
  
  // make_voronoi(200);
  // make_better_triangles(100);
  // run_conway();
  // save("final_gradient_test_2.png")

  // draw image


}

function draw() {
  // save("final_voronoi_1.png");
  // updatePixels();
  if (mouseX != last_mousex && mouseX < w){
    last_mousex = mouseX;
    if(should_update){
      update();
    }
    // print("update");
  }
  if(mouseIsPressed ){
    // run_conway();
    // save("final_final/color_flowers" + str(imgn) + ".png")
    // imgn++;
  }

}

function mousePressed() {
  if (mouseX < w){
    should_update = !should_update;
  }
}
