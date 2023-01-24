function run_conway() {
    let inner =    [[0,1,0],[1,1,1],[0,1,0]];

    let outer =    [[0, 0, 0, 1, 0, 0, 0], 
                    [0, 1, 1, 1, 1, 1, 0],
                    [0, 1, 1, 0, 1, 1, 0],
                    [1, 1, 0, 0, 0, 1, 1],
                    [0, 1, 1, 0, 1, 1, 0], 
                    [0, 1, 1, 1, 1, 1, 0], 
                    [0, 0, 0, 1, 0, 0, 0]];
    // let kernel = [[0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [1, 1, 1, 1, 1], [0, 1, 1, 1, 0]];
    // let kernel = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];

    // sum whole kernel
    let norm = 0;
    for(let i = 0; i < kernel.length; i++) {
        for(let ii = 0; ii < kernel[i].length; ii++) {
            norm += kernel[i][ii];
        }
    }
    convolution(kernel, norm);

}


function set_pixel(x, y,  c) {
    let d = pixelDensity(); 
    let rc = int(255*c);
    // console.log(c);
    for (let i = 0; i < d; i++) { 
        for (let j = 0; j < d; j++) { 
            index = 4 * ((y * d + j) * width * d + (x * d + i));
            pixels[index]   = rc;  // red
            pixels[index+1] = rc;  // green
            pixels[index+2] = rc;  // blue
            pixels[index+3] = 255; // alpha
        } 
    }
}

function get_pixel(x, y){
    let d = pixelDensity(); 
    let index = 4 * ((y * d) * width * d + (x * d));
    return pixels[index]/255;
}

function convolution(kernel, norm){
    for(let x = 0; x < width; x++) {
        for(let y = 0; y < height; y++) {
            let n = 0;
            for(let i = 0; i < kernel.length; i++) {
                for(let j = 0; j < kernel.length; j++) {

                    if(kernel[i][j] == 0){continue;}
                    
                    let nx = (x + i - floor((kernel.length-1)/2) + width) % width;
                    let ny = (y + j - floor((kernel.length-1)/2) + height) % height;
                    n += kernel[i][j] * get_pixel(nx,ny)/255;
                }
                }
            
            n /= norm;
            
        }
    }
    print("done");
}