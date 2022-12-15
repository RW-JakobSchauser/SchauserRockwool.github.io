
function background_gradient(){
    for(var i = 0; i <= w; i++){
      let c = map(i, 0, w, 155, 200);
      stroke(c);
      line(i, 0, i, w);
    }
  }

  

// check if two line segments intersect
function intersect(p1, p2, p3, p4){
    let x1 = p1[0];
    let y1 = p1[1];
    let x2 = p2[0];
    let y2 = p2[1];
    let x3 = p3[0];
    let y3 = p3[1];
    let x4 = p4[0];
    let y4 = p4[1];
    
    let denom = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4);
    if(denom == 0){
      return false;
    }
    let t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / denom;
    let u = -((x1-x2)*(y1-y3) - (y1-y2)*(x1-x3)) / denom;
    if(t > 0 && t < 1 && u > 0 && u < 1){
      return true;
    }
    return false;
  }

  
// check if a point is inside a triangle
// https://stackoverflow.com/questions/2049582/how-to-determine-if-a-point-is-in-a-2d-triangle
function inside_triangle(p, p1, p2, p3){
    let x = p[0];
    let y = p[1];
    let x1 = p1[0];
    let y1 = p1[1];
    let x2 = p2[0];
    let y2 = p2[1];
    let x3 = p3[0];
    let y3 = p3[1];
    
    let denom = (y2-y3)*(x1-x3) + (x3-x2)*(y1-y3);
    let a = ((y2-y3)*(x-x3) + (x3-x2)*(y-y3)) / denom;
    let b = ((y3-y1)*(x-x3) + (x1-x3)*(y-y3)) / denom;
    let c = 1 - a - b;
    if(a > 0 && b > 0 && c > 0){
      return true;
    }
    return false;
  }


  
function randomys(N){
  let ys = [];
  for(let i = 0; i < N; i++){
    ys.push(random(w));
  }
  return ys;
}
