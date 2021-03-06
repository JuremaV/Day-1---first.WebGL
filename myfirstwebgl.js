// Ju
const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`);
if(!webgl){ throw new Error("Webgl not available/suported");}
webgl.clearColor(0, 1.0, 0, 1); //r=0 g=1 b=0 a=1 values for red green blue and alfa
webgl.clear(webgl.COLOR_BUFFER_BIT);
const vertices = new Float32Array([0,1, -1,-1, 1,-1]);


const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader,
    `attribute vec2 pos;
    void main() { gl_Position = vec4(pos,0,1.0); }` );
webgl.compileShader(vertexShader);
if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS)){
    console.error("ERROR compiling vertex shader!", webgl.getShaderInfoLog(vertexShader))}

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader,
    `void main() { gl_FragColor = vec4(1.0,0.0,0.0,1.0); }`);
webgl.compileShader(fragmentShader);
if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS)){
    console.error("ERROR compiling fragment shader!", webgl.getShaderInfoLog(fragmentShader));}

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);

const positionLocation = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
webgl.useProgram(program);
webgl.drawArrays(webgl.TRIANGLES, 0, 3);
