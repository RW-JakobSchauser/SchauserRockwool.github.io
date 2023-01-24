
function fourier(){
  reset();

    let N_sines = 3;
    for(var sine = 0; sine <= N_sines; sine++){
      // for each x pixel in the image
      let freqs = [];
  
      // choose a random number of frequencies
      let N_freqs = floor(random(1, 15));
      for(let i = 0; i < N_freqs; i++){
        freqs.push(floor(random(1, 10)));
      }
      console.log(freqs);
  
  
      for(var x = 0; x < w; x++){
        // draw a sine wave
        let y = 0;
        for(var i = 0; i < freqs.length; i++){
          var freq = freqs[i];
          y += sin(x * freq*PI/w);
        }
  
        y *= w/(3*N_freqs*N_sines);
        y += sine*w/N_sines + w/(2*N_sines);
        // draw a point
        stroke(0);
        circle(x, y, 0.4);
  
      }
    }
  }
  
  function make_stars(N){
    reset();
    if(bgitem == "white"){
      fill(0);
    } else {
      fill(255);
    }
    noStroke();
    for(var i = 0; i <= N; i++){
      for(var ii = 0; ii <= N; ii++){
        let xx = i*w/N +  w/N/2;
        let yy = ii*w/N +  w/N/2;
  
        let rr = random((1 - randomness)*w/N/2,(randomness + 1) * w/N/2)
        circle(xx,yy,rr);
    }    
  }
  }
  
  
  function make_mondrian(){
    reset();

    // make a list of random points
    let points = [];
     // add the corners
     points.push([0,0]);
     points.push([w,0]);
     points.push([0,w]);
     points.push([w,w]);
    for(var i = 0; i <= N; i++){
      points.push([random(0, w), random(0, w)]);
    }
    // copy the list
   
  
    // make a list of random colors
  
  
    for(var i = 0; i < N+4; i++){
      let p1 = points[i];
  
      // choose two random points
      let p2 = random(points.filter(x => x != p1));
      let p3 = random(points.filter(x => x != p1));
  
      // choose a random color
      let c = random(random_colors);
      fill(c);
      // draw a rectangle
      rect(p1[0], p1[1], p2[0]-p1[0], p3[1]-p1[1]);
  
      
  
    }
  }

  function make_lines(){
    reset();

    let N_seams = floor(random(2, 3));
    let N_lines = 10;
    let x0 = 0;
    let x1 = 0;
  
    // let ys0 = randomys(N_lines);
    let boundary = [5, 10, 17, 30, 45, 50, 67, 80, 85, 96].map(x => x*w/100)
    let ys0 = boundary;
    let ys1 = randomys(N_lines);
  
    for(let i = 0; i < N_seams; i++) {
      if (i == N_seams-1) {
        x1 = w;
        ys1 = boundary;
      } else {
        x1 = random(x0, w);
        ys1 = randomys(N_lines);
      }
  
  
      for(let j = 0; j < N_lines; j++) {
        // thicker lines
      strokeWeight(random(1,2));
  
        line(x0, ys0[j], x1, ys1[j]);
        // console log the coordinates
        // line(x0, y1, x1, y2);
      }
      ys0 = ys1;
      x0 = x1;
    }
  
  }

function make_voronoi(N){
  reset();

    // make a list of random points
    voronoiClearSites();
    let points = [];
    for(var i = 0; i <= N; i++){
      points.push([random(0, w), random(0, w), random(random_colors)]);
    }
    
    voronoiSites(points);
    voronoi(w, w, false);
    voronoiDraw(0, 0, true, false);
    
}
  
  function make_slashes(N){
    reset();
    strokeWeight(3);

    if(bgitem == "black"){
      stroke(200);
    } else {
      stroke(100);
    }
    for(var i = 0; i <= N; i++){
      for(var ii = 0; ii <= N; ii++){
        let xx = i*w/N;
        let yy = ii*w/N;
        let rr = (2 * floor(random(2))-1)
  
        line(xx, yy, xx +  w/N * rr, yy + w/N);
    }    
  }
  }
  
  function make_circs(N){
    reset();
    fill(0);
    for(var i = 0; i <= N; i++){
      for(var ii = 0; ii <= N; ii++){
        let rr = random(w/N/2)
        let xx = i*w/N + 0.5*w/N + rr/2 ;//+ random(w/N - rr) ;
        let yy = ii*w/N + 0.5*w/N + rr/2 ;//+ random(w/N - rr) ;
        circle(xx,yy,rr);
    }    
  }
  }
  

function make_flowers(N, size, colorinf){
  // reset();

  if(colorinf == "bw"){
    rnd_colors = bw_random_colors;
  } else {
    rnd_colors = random_colors;
  }
  for(var i = 0; i <= N; i++){
    for(var ii = 0; ii <= N; ii++){
      let xx = i*w/N  + size + random(w/N - size*2);
      let yy = ii*w/N + size + random(w/N - size*2);

      let ways = [[0,1], [1,0], [0,-1], [-1,0]];

      for(var j = 0; j < 4; j++){
        if(random(1) < 0.1){
          continue;
        }
        let edgex = (i+ways[j][0]*.5 +0.5)*w/N;
        let edgey = (ii+ways[j][1]*0.5 + 0.5)*w/N;
        // stalk(xx,yy, edgex, edgey, size, color(0))
        
        // fill(0);
        // noStroke();
        if(j<2){
          leaf(edgex, edgey, size, colorinf);
        }
        // circle((i+0.5)*w/N,(ii)*w/N,10);
        // circle((i)*w/N,(ii+0.5)*w/N,10);
      }

      let rr = random(size/2,size)
      // let rr = size;

      let c1 = random(rnd_colors);
      let c2 = random(rnd_colors.filter(x => x != c1));
      let c3 = random(rnd_colors.filter(x => x != c1 && x != c2));
     flower(xx, yy, rr, c1, c2, c3);
  }    
  }
}

function leaf(x,y, size, colorinf){
  // reset();

  // fill("black");
  // fill(random(random_colors));
  // fill("darkgreen");
  if(colorinf == "bw"){
    fill(100);
  } else {
    fill("darkgreen");
  }
  noStroke();
  let r = random(PI)
  if (random(1) < 0.5){
    arc(x, y, size, size, 0+r, PI/1.5+r, CHORD);
  }
  if (random(1) < 0.1){
    arc(x, y, size, size, PI+ PI/1.5+r, PI +PI/1.5 + r + PI/1.5, CHORD);
  }
}

function stalk(x0,y0, x1,y1, r, c1){
  // draw a stalk
  // stroke("darkgreen");
  strokeWeight(r/5);
  fill(0,0);
  curve(x0 + random(-300,300),y0 + random(-300,300), x0 ,y0, x1, y1, x1 + random(-300,300),y1 + random(-300,300));
  // line(x0, y0, x1, y1);
}

function flower(x, y, r, c1, c2, c3){
  // reset();

  // draw the petals
  noStroke();
  fill(c2);
  let n_petals = floor(random(3, 8));
  for(var i = 0; i < n_petals; i++){
    let angle = i*2*PI/n_petals;
    circle(x + r/2*cos(angle), y + r/2*sin(angle), r + random(r/3));
    
  }
  // draw a flower
  strokeWeight(r/8);
  stroke(c3);
  fill(c1);
  circle(x, y, r/1.5);

}
function make_triangles(){
  reset();

  // make a list of random points
  let points = [];
  // add the corners
  points.push([0,0]);
  points.push([w,0]);
  points.push([0,w]);
  points.push([w,w]);
  stroke(0);
  // strokeWeight(2);
  line(points[0][0], points[0][1], points[1][0], points[1][1]);
  line(points[0][0], points[0][1], points[2][0], points[2][1]);
  line(points[2][0], points[2][1], points[3][0], points[3][1]);
  line(points[3][0], points[3][1], points[1][0], points[1][1]);

  for(var i = 0; i <= N; i++){
    points.push([random(0, w), random(0, w)]);
  }
  let lines = [];
  let p1 = points[0];
  let p2 = random(points.filter(x => x != p1));
  let p3 = random(points.filter(x => x != p1 && x != p2));
  for(var i = 0; i < N+4; i++){
    p1 = p2;
    p2 = p3;
    p3 = random(points.filter(x => x != p1 && x != p2));

    // check if the line intersects any other lines
    let intersects = false;
    for(var ii = 0; ii < lines.length; ii++){
      let l = lines[ii];
      if(intersect(p1, p2, l[0], l[1]) || intersect(p1, p3, l[0], l[1]) || intersect(p2, p3, l[0], l[1]) || l == [p1, p2] || l == [p1, p3] || l == [p2, p3]){
        intersects = true;
        break;
      }
    }
    if(intersects){
      i--;
      continue;
    }
    // choose a random color
    let c = random(30)+180;
    fill(c,c,c, random(255));
    triangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
    lines.push([p1, p2]);
    lines.push([p2, p3]);
    lines.push([p3, p1]);

    // remove any points that are inside the triangle
    points = points.filter(x => !inside_triangle(x, p1, p2, p3));

    
  }
  
  }

function make_better_triangles(N){
  reset();

  let points = [];
  points.push([random(0, w), random(0, w)]);
  points.push([random(0, w), random(0, w)]);

  // add the corners
  points.push([0,0]);
  points.push([w,0]);
  points.push([0,w]);
  points.push([w,w]);

  // add random points along the edges
  for(var i = 0; i < N/50; i++){
    points.push([random(0, w), 0]);
    points.push([random(0, w), w]);
    points.push([0, random(0, w)]);
    points.push([w, random(0, w)]);
  }

  let max_dist = w/3;

  for(let i = 0; i < 3*N; i++){
    p = [random(0, w), random(0, w)]

    // find points that are close to p
    let p1 = points[0];
    let p2 = points[1];
    let d1 = dist(p[0], p[1], p1[0], p1[1]);
    let d2 = dist(p[0], p[1], p2[0], p2[1]);
    for(let ii = 2; ii < points.length; ii++){
      let d = dist(p[0], p[1], points[ii][0], points[ii][1]);
      if(d < d1){
        d2 = d1;
        p2 = p1;
        d1 = d;
        p1 = points[ii];
      }
      else if(d < d2){
        d2 = d;
        p2 = points[ii];
      }
    }
    if(d1 > max_dist || d2 > max_dist){
      continue;
    }

    fill(random(55)+200);
    triangle(p[0], p[1], p1[0], p1[1], p2[0], p2[1]);
    points.push(p);

  }

}


function rndtile(N,NN, _random = 4){

  let r = w/N
  for(var i = 0; i < N+1; i++){
    for(var ii = 0; ii < 2*N; ii++){
      mktile(i*r, ii*r, r, _random);
    }
  }
  
}

function mktile(x, y, r, _random){
  strokeWeight(1);
  stroke(100);
  // square(x, y, r)
  noFill();
  strokeWeight(3);
  let d = 4;

  let kk = 6;


  let i = floor(random(_random));
  // i = 11;
  if(i == 0){
    arc(x, y, r, r, 0, PI/2);
    arc(x + r, y + r, r, r, PI, 3*PI/2);
  } else if(i == 1) {
    arc(x + r, y, r, r, PI/2, PI);
    arc(x, y + r, r, r, 3*PI/2, 2*PI);  
  } else if(i == 2) {
    line(line(x + r/2, y, x + r/2, y + r));

    line(line(x, y + r/2, x + r/2 - r/d, y + r/2));
    line(line(x + r/2 + r/d, y + r/2, x + r, y + r/2));
  } else if(i == 3) {
    line(line(x + r/2, y, x + r/2, y + r/2 - r/d));
    line(line(x + r/2, y + r/2 + r/d, x + r/2, y + r));

    line(line(x, y + r/2, x + r, y + r/2));
  } else if(i == 4) {
    arc(x + r, y, r, r, PI/2, PI);
    arc(x, y + r, r, r, 3*PI/2, 2*PI);  

    circle(x + r/2, y + r/2, r/4)
  } else if(i == 5) {
    arc(x + r, y, r, r, PI/2, PI);
    arc(x, y + r, r, r, 3*PI/2, 2*PI);  

    circle(x + r/2, y + r/2, r/4)
  } else if(i == 6) {
    line(line(x + r/2, y, x + r/2, y + r/2 - r/d));
    line(line(x + r/2, y + r/2 + r/d, x + r/2, y + r));
    
    line(line(x, y + r/2, x + r/2 - r/d, y + r/2));
    line(line(x + r/2 + r/d, y + r/2, x + r, y + r/2));
    
    circle(x + r/2, y + r/2, r/4)
  } else if(i == 7) {
    for(var k = 0; k < kk; k++){
      let xx = x + (k)/(kk)*r;
      line(line(xx, y, xx, y + r));
    }
    
  } else if(i == 8) {
    for(var k = 0; k < kk; k++){
      let yy = y + (k)/(kk)*r;
      line(line(x, yy, x + r, yy));
    }
    
  } else if(i == 9) {
    for(var k = 0; k < kk; k++){
      let yy = y + (k+1)/(kk)*r;
      let xx = x + (k+1)/(kk)*r;
      line(line(xx, y, xx, yy));
      line(line(x, yy, xx, yy));
    }
  } else if(i == 10) {
    for(var k = 0; k < kk; k++){
      let yy = y + r - (k+1)/(kk)*r;
      let xx = x + (k+1)/(kk)*r;
      line(line(xx, yy, xx, y + r));
      line(line(x, yy, xx, yy));
    }
  }  else if(i == 11) {
    for(var k = 0; k < kk; k++){
      let yy = y + (k+1)/(kk)*r;
      let xx = x + r -(k+1)/(kk)*r;
      line(line(xx, yy, xx, y));
      line(line(xx, yy, x+r, yy));
    }
  } else if(i == 12) {
    for(var k = 0; k < kk; k++){
      let yy = y + r - (k+1)/(kk)*r;
      let xx = x + r - (k+1)/(kk)*r;
      line(line(xx, yy, xx, y + r));
      line(line(xx, yy, x+r, yy));
    }
  }
 
}

function make_walktiles(N, NN){
  N = 20;
  stroke(0);
  fill(0);
  strokeWeight(1);
  var poss = new Array(N);
  for (var i = 0; i < N; i++) {
    poss[i] = new Array(N);
    for (var ii = 0; ii < N; ii++) {
      poss[i][ii] = [0,0];
    }
  }
  
  var rad = w/N;

  var maxnum = 0;


  let N_runs = 4;
  for(var i = 0; i < N_runs; i++){
    let x = floor(random(0,N));
    let y = floor(random(0,N));
    poss[x][y] = 1;
    let number = 2;
    all_ways = [[0,1], [0,-1], [1,0], [-1,0]];
    ways = all_ways;
    let r = [1,0];


    while(true){
      if(ways.length == 0){
        break;
      }
      r = random([r,random(ways)]);
      x += r[0];
      y += r[1];
      if(x < 0 || x >= N || y < 0 || y >= N){
        break;
      }
      if(poss[x][y][0] > 0){
        x -= r[0];
        y -= r[1];
        ways = ways.filter(function(value, index, arr){
          return value != r;
        });

        continue;
      }
      ways = all_ways;
      poss[x][y] = [number,i];
      number += 1;
    }
    if (number > maxnum) {
      maxnum = number;
    }
  }

  for(var i = 0; i < N; i++){
    for(var ii = 0; ii < N; ii++){
      if(poss[i][ii][0]>0){
        fill(poss[i][ii][1]*255/N_runs);
        circle(i*rad + rad/2, ii*rad + rad/2, rad*poss[i][ii][0]/maxnum);
      }
    }
  }
  console.log(poss); 
  console.log(maxnum);
}

function art_deco(N, NN){
  reset();

  for(var i = 0; i < N+1; i++){
    for(var ii = 0; ii < 2*N; ii++){
      // draw semicircles
      let x = w/N * i + w/N/2*(ii%2);
      let y = w/N * ii/2 + w/N/2;
      let r = w/N;
      let c = color(0);
      // fill(c,c,c, random(255));
      stroke(0);
      fill(200,200,200,0);
      strokeWeight(2);
      arc(x, y, r, r, PI,0);
      
      for(let iii = 0; iii < NN+1; iii++){
        // draw lines from center to edge
        let x1 = x ;
        let y1 = y ;
        let x2 = x + r*cos(iii*2*PI/NN/2)/2.2;
        let y2 = y - r*sin(iii*2*PI/NN/2)/2.2;
        line(x1, y1, x2, y2);
      }
    }
  }
}

function make_imperfect_circles(N, N_rounds){
  reset();
  if(bgitem == "black"){
    stroke(255);
  } else {
    stroke(0);
  }
  noFill();
  for(var iii = 0; iii < N; iii++){
    for(var ii = 0; ii < N; ii++){
      N_rounds = 3;
      // find distance from edge
      let dx = min(iii, N-iii);
      let dy = min(ii, N-ii);
      _x = map(dx, 0, N/2, 5, 1);
      _y = map(dy, 0, N/2, 5, 1);
      N_rounds = max(_x, _y);


      let xx = w/N*ii + w/N/2;
      let yy = w/N*iii + w/N/2;
      let start = 0;
      let stop = start + random(PI/8,PI);
      // let rnd2 = random(0.1,1.8);
      let rnd_size = random(1 - randomness*0.9,1 + randomness*0.9);
      for(var i = 0; i < N_rounds; i++){
        // let rnd = random(0.9,1.1);
        let rnd = random(1 - randomness*0.2,1 + randomness*0.2);
        arc(xx, yy, w/N*rnd/2*rnd_size, w/N*rnd/2*rnd_size, start, stop, OPEN);
        start = stop;
        stop = start + random(PI/8,PI);
      }
    }
  }
}

function draw_rotated_image(img, img_x, img_y, img_width, img_height, img_angle){
  imageMode(CENTER);
  translate(img_x+img_width/2, img_y+img_width/2);
  rotate(img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(-img_angle);
  translate(-(img_x+img_width/2), -(img_y+img_width/2));
  imageMode(CORNER);
}

function make_images(N, type){
  images = leafs;
  if(type == "logos"){
    images = logos;
  } else if(type == "leafs"){
    images = leafs;
  }
  reset();
  for(var i = 0; i < N; i++){
    for(var ii = 0; ii < N; ii++){
      let x = w/N*ii;
      let y = w/N*i;
      
      let img = images[Math.floor(random(images.length))];
      let r = random(-PI/2, PI/2);
      let s = random(1 - 0.5*randomness, 1);
      draw_rotated_image(img, x, y, w/N*s, w/N*s, r);
    }
  }
}

function make_pattern(a,b){
  reset();
  rectMode(CENTER);
  // rect(0, 0, w/2, w/2);
  const d = width * 0.8;
  // make 10 random circles 

  let NN = 1;
  for(var i = 0; i < NN; i++){
    for(var ii = 0; ii < NN; ii++){
      let x = w/NN*ii + w/NN/2;
      let y = w/NN*i + w/NN/2;
      let r = w/NN+1;
      pattern(randPattern(d));

      rectPattern(x, y, r, r);
    }
  }
  // rectPattern(0, 0, w/2, w/2);'
  
}

function make_cool_rocks(N){
  // reset();
  for(var i = 0; i < N; i++){
    square_rock(random(100,w-100), random(100,w-100));
  }
}

function square_rock(x,y){
  stroke(0);
  strokeWeight(0);
  let size = random(20, 60);
  fill(255)
  let off = random(PI);
  let tri = [];
  for(var i = 0; i < 3; i++){
    let a = i*2*PI/3 + off;
    fill(200+ sin(a)*25);
    // tri.push([x + sin(a)*size, y + cos(a)*size]);
    beginShape();
    vertex(x, y);
    vertex(x + sin(a)*size, y + cos(a)*size);
    if(i <100){
      vertex(x + sin(a + PI/3)*size, y + cos(a + PI/3)*size);
    }
    // vertex(x + sin(a + *2PI/3)*size, y + cos(a + PI/3)*size);
    vertex(x + sin(a + 2*PI/3)*size, y + cos(a + 2*PI/3)*size);
    vertex(x, y);
    // vertex(x + sin(a)*size + cos(a)*size, y + cos(a)*size);
    endShape();
  }
  console.log("jey");

}

function make_waves(N, NN){
  reset();
  stroke(0);
  fill(0);
  beginShape();
  vertex(0)
  let XN = w/3;
  let rnd = random(100);
  let NNN = 40;
  for(var ii = 0; ii < NNN; ii++){
    
    for(var i = 0; i < XN; i++){
      y = noise((i/XN + rnd+ ii)*3)*w/4 + w/4;
      // line(i*w/XN + ii, y, i*w/XN, w);
      fill(255 -ii*255/NNN);
      stroke(255 - ii*255/NNN);
      circle(i*w/XN, y + ii*8, 3);

    }
  }
}

function make_eyes(N, NN){
  reset();
  
  for(var i = 0; i < N; i++){
    for(var ii = 0; ii < N; ii++){
      let r = random(w/N/2) + w/N/2;

      let x = w/N*ii + w/N/2 + random()*(w/N-r)/2;
      let y = w/N*i + w/N/2;

      let rnd = random(-r/8, r/8);
      stroke(0);
      fill(255);
      circle(x,y, r);
      fill(random(100,200));
      noStroke();
      circle(x+rnd,y+rnd, r/2);
      fill(0);
      circle(x+rnd,y+rnd, r/4);
      
    }
  }
}


  

function make_noise_squares(N, noiseoff){
  reset();
  noStroke();
  rectMode(CENTER);
  let scale = 400*(randomness);
  noiseoff /= 10;
  for(var i = 0; i < N; i++){
    for(var ii = 0; ii < N; ii++){
      let x = w/N*ii + w/N/2;
      let y = w/N*i + w/N/2;
      let s = w/N;


      let c = noise(x/scale + noiseoff, y/scale + noiseoff)*100+100;
      fill(c);
      rect(x, y, s+1, s+1);

      c = noise(x/scale*1.05 + noiseoff, y/scale*1.05 + noiseoff)*100+100;
      fill(c);
      rect(x, y, s/2, s/2);

      // c = noise(x/scale*2 + noiseoff, y/scale*2 + noiseoff)*100+100;
      // fill(c);
      // rect(x , y, s/4, s/4);
    }
  }
}

function dist(x1, y1, x2, y2){
  return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
}
  

function reset(){
  stroke(0);
  strokeWeight(1);
  noFill();
}




function randPattern(t)
{
	const ptArr = [
		PTN.noise(0.5),
		PTN.noiseGrad(0.4),
		PTN.stripe(t / int(random(6, 12))),
		PTN.stripeCircle(t / int(random(6, 12))),
		PTN.stripePolygon(int(random(3, 7)),  int(random(6, 12))),
		PTN.stripeRadial(TAU /  int(random(6, 30))),
		PTN.wave(t / int(random(1, 3)), t / int(random(10, 20)), t / 5, t / 10),
		PTN.dot(t / 10, t / 10 * random(0.2, 1)),
		PTN.checked(t / int(random(5, 20)), t / int(random(5, 20))),
		PTN.cross(t / int(random(10, 20)), t / int(random(20, 40))),
		PTN.triangle(t / int(random(5, 20)), t / int(random(5, 20)))
	]
	return random(ptArr);
}