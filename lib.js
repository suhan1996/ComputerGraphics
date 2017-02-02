
var fragmentShaderHeader = [''               // PREDEFINE NOISE AND TURBULENCE FUNCTIONS FOR FRAGMENT SHADERS
,'   precision highp float;'
,'   vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }'
,'   vec4 mod289(vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }'
,'   vec4 permute(vec4 x) { return mod289(((x*34.)+1.)*x); }'
,'   vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - .85373472095314 * r; }'
,'   vec3 fade(vec3 t) { return t*t*t*(t*(t*6.-15.)+10.); }'
,'   float noise(vec3 P) {'
,'      vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.)),'
,'           f0 = fract(P), f1 = f0 - vec3(1.), f = fade(f0);'
,'      vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy),'
,'           iz0 = i0.zzzz, iz1 = i1.zzzz,'
,'           ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1),'
,'           gx0 = ixy0 * (1. / 7.), gy0 = fract(floor(gx0) * (1. / 7.)) - .5,'
,'           gx1 = ixy1 * (1. / 7.), gy1 = fract(floor(gx1) * (1. / 7.)) - .5;'
,'      gx0 = fract(gx0); gx1 = fract(gx1);'
,'      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.)),'
,'           gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.));'
,'      gx0 -= sz0 * (step(0., gx0) - .5); gy0 -= sz0 * (step(0., gy0) - .5);'
,'      gx1 -= sz1 * (step(0., gx1) - .5); gy1 -= sz1 * (step(0., gy1) - .5);'
,'      vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),'
,'           g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),'
,'           g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),'
,'           g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);'
,'      vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3))),'
,'           norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));'
,'      g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;'
,'      g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;'
,'      vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),'
,'                         dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),'
,'                    vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),'
,'                         dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);'
,'      return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);'
,'   }'
,'   float turbulence(vec3 P) {'              // Turbulence is a fractal sum of abs(noise).
,'      float f = 0., s = 1.;'                // The domain is rotated after every iteration
,'      for (int i = 0 ; i < 9 ; i++) {'      //    to avoid any visible grid artifacts.
,'         f += abs(noise(s * P)) / s;'
,'         s *= 2.;'
,'         P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);'
,'      }'
,'      return f;'
,'   }'
].join('\n');
function gl_start(canvas, vertexShader, fragmentShader) {           // START WEBGL RUNNING IN A CANVAS

   setTimeout(function() {
      try { 
         canvas.gl = canvas.getContext('experimental-webgl');                 // Make sure WebGl is supported.
      } catch (e) { throw 'Sorry, your browser does not support WebGL.'; }

      canvas.setShaders = function(vertexShader, fragmentShader) {            // Add the vertex and fragment shaders:

         var gl = this.gl, program = gl.createProgram();                           // Create the WebGL program.

         function addshader(type, src) {                                           // Create and attach a WebGL shader.
            var shader = gl.createShader(type);
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if (! gl.getShaderParameter(shader, gl.COMPILE_STATUS))
               console.log('Cannot compile shader:\n\n' + gl.getShaderInfoLog(shader));
            gl.attachShader(program, shader);
         };

         addshader(gl.VERTEX_SHADER  , vertexShader  );                            // Add the vertex and fragment shaders.
         addshader(gl.FRAGMENT_SHADER, fragmentShaderHeader + fragmentShader);

         gl.linkProgram(program);                                                  // Link the program and report any errors.
         if (! gl.getProgramParameter(program, gl.LINK_STATUS))
            console.log('Could not link the shader program!');
         gl.useProgram(program);

         gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());                        // Create a square as a triangle strip
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(                          //    consisting of two triangles.
                       [ -1,1,0, 1,1,0, -1,-1,0, 1,-1,0 ]), gl.STATIC_DRAW);

         var aPos = gl.getAttribLocation(program, 'aPos');                         // Assign aPos attribute to each vertex.
         gl.enableVertexAttribArray(aPos);
         gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);

         gl.uTime = gl.getUniformLocation(program, 'uTime');                       // Remember address of uTime variable.
      }

      canvas.setShaders(vertexShader, fragmentShader);                        // Initialize everything,

      setInterval(function() {                                                // Start the animation loop.
         var gl = canvas.gl;

         if (gl.startTime === undefined)                                           // First time through,
            gl.startTime = Date.now();                                             //    record the start time.
         gl.uniform1f(gl.uTime, (Date.now() - gl.startTime)  / 1000);              // Set time for the shaders.

         gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);                                   // Render the square.
      }, 30);

   }, 100); // Wait 100 milliseconds after page has loaded before starting WebGL.
}

function addTextEditor(code, callback) {                                // Add a text editor to the web page:
   document.body.innerHTML = [''
      ,'<table><tr><td width=10></td><td valign=top>'                         // Insert new html for textArea into the page.
      ,'<textArea id=textArea '
      ,'style="font:13px courier;outline-width:0;border-style:none;resize:none;overflow:scroll;"'
      ,'></textArea>'
      ,'</td><td valign=top>' + document.body.innerHTML + '</td></tr></table>'
      ].join('');

   textArea.value = code;                                                    // Set its current text to user-provided code.

   var i = 0, text = textArea.value.split('\n');                             // Set the correct number of rows and columns.
   textArea.rows = Math.max(text.length, 50);
   while (i < text.length)
      textArea.cols = Math.max(textArea.cols, text[i++].length);

   textArea.style.backgroundColor = 'black';                                 // Set the text editor's text and bg colors.
   textArea.style.color = 'white';

   textArea.onkeyup = callback;                                              // User-provided callback function on keystroke.
}

