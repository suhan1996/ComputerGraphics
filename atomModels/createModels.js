function createHModel(canvas) {
    var vs = '\
    attribute vec3 aPos, aNor;\n\
    attribute vec2 aUV;\n\
    varying   vec3 vPos, vNor;\n\
    varying   vec2 vUV;\n\
    uniform   mat4 matrix, invMatrix;\n\
    void main() {\n\
    vec4 pos = matrix * vec4(aPos, 1.);\n\
    vec4 nor = vec4(aNor, 0.) * invMatrix;\n\
    gl_Position = pos;\n\
    vPos = pos.xyz;\n\
    vNor = nor.xyz;\n\
    vUV  = aUV;\n\
    }\n\
    ';

    var fs1 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    uniform sampler2D uSampler;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    //    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    vec4 texture = texture2D(uSampler, vUV);\n\
    c *= texture.rgb;\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var fs2 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    uniform sampler2D uSampler;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(.7,.7,1.) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    c += vec3(.5,.3,.1) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    vec4 texture = texture2D(uSampler, vUV);\n\
    c *= texture.rgb;\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var fs3 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(.0,.0,1.) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    //    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var obj1, obj2, obj3, obj4;

    var scene = new Scene();

    var material1 = new Material(vs, fs1);
    material1.setTexture('imgs/proton.jpg');

    var material2 = new Material(vs, fs2);
    material2.setTexture('imgs/thunder.jpeg');

    var material3 = new Material(vs, fs3);

    //    var material4 = new Material(vs, fs2);
    //    material4.setTexture('imgs/thunder.png');

    obj1 = new SceneObject();
    obj1.setVertices(SHAPE.sphere(80));
    obj1.setMaterial(material1);
    scene.addObject(obj1);

    obj2 = new SceneObject();
    obj2.setVertices(SHAPE.sphere(80));
    obj2.setMaterial(material2);
    scene.addObject(obj2);

    obj3 = new SceneObject();
    obj3.setVertices(SHAPE.torus(80));
    obj3.setMaterial(material3);
    scene.addObject(obj3);

    //    obj4 = new SceneObject();
    //    obj4.setVertices(SHAPE.sphere(80));
    //    obj4.setMaterial(material4);
    //    scene.addObject(obj4);

    canvas.scene = scene;

    var m = M.identityMatrix();

    gl_start(canvas,
    function(time) {
        M.identity(m);
        M.rotateX(m, 10);
        M.rotateY(m, time);

        M.save(m);
            M.scale(m, .1);
            obj1.setMatrix(m);
        M.restore(m);

        M.save(m);
            M.rotateX(m, Math.PI/2);
            M.scale(m, .93);
            obj3.setMatrix(m);
        M.restore(m);

        M.save(m);
            M.translate(m, [0., 0. ,.5]);
            M.scale(m, .03);
            M.rotateX(m, 10 * time);
            M.rotateY(m, 10 * time);
            M.rotateZ(m, Math.tan(time));
            obj2.setMatrix(m);
        M.restore(m);
        
    }
    );
}



function createOModel(canvas1) {
        var vs = '\
    attribute vec3 aPos, aNor;\n\
    attribute vec2 aUV;\n\
    varying   vec3 vPos, vNor;\n\
    varying   vec2 vUV;\n\
    uniform   mat4 matrix, invMatrix;\n\
    void main() {\n\
    vec4 pos = matrix * vec4(aPos, 1.);\n\
    vec4 nor = vec4(aNor, 0.) * invMatrix;\n\
    gl_Position = pos;\n\
    vPos = pos.xyz;\n\
    vNor = nor.xyz;\n\
    vUV  = aUV;\n\
    }\n\
    ';

    var fs1 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    uniform sampler2D uSampler;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    //    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    vec4 texture = texture2D(uSampler, vUV);\n\
    c *= texture.rgb;\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var fs2 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    uniform sampler2D uSampler;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(.7,.7,1.) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    c += vec3(.5,.3,.1) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    vec4 texture = texture2D(uSampler, vUV);\n\
    c *= texture.rgb;\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var fs3 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(.0,.0,1.) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    //    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';


    var protons = {}, neutrons = {}, orbits = {}, electrons = {};
    
    var protonPos = [[.05, .05, .05], [.05, .05, -.05], 
                        [.05, -.05, .05], [.05, -.05, -.05],
                        [-.05, .05, .05], [-.05, .05, -.05],
                        [-.05, -.05, .05], [-.05, -.05, -.05]];
    
    var neutronPos = [[.02, .02, .02], [-.02, -.02, -.02],
                        [0., 0., .07], [0., 0., -.07],
                        [0., .07, 0.], [0., -.07, 0.],
                        [.07, 0., 0.], [-.07, 0., 0.]];

    var electronPos = [[0., 0., .5], [0., 0., -.5],
                        [.75, 0., 0.], [-.75, 0., 0.],
                        [.375, 0., .6495], [.375, 0., -.6495],
                        [-.375, 0., .6495], [-.375, 0., -.6495]];

    var scene = new Scene();

    // protons material
    var material1 = new Material(vs, fs1);
    material1.setTexture('imgs/proton.jpg');
    // neutrons material
    var material4 = new Material(vs, fs2);
    material4.setTexture('imgs/neutron.jpeg')
    // electrons material
    var material2 = new Material(vs, fs2);
    material2.setTexture('imgs/thunder.jpeg');
    // orbit material
    var material3 = new Material(vs, fs3);

    // create protons
    for(let i = 0; i < 8; i++) {
        protons[i] = new SceneObject();
        protons[i].setVertices(SHAPE.sphere(20));
        protons[i].setMaterial(material1);
        scene.addObject(protons[i]);
    }

    // create neutrons
    for(let i = 0; i < 8; i++) {
        neutrons[i] = new SceneObject();
        neutrons[i].setVertices(SHAPE.sphere(20));
        neutrons[i].setMaterial(material4);
        scene.addObject(neutrons[i]);
    }
    
    // create electrons
    for(let i = 0; i < 8; i++) {
        electrons[i] = new SceneObject();
        electrons[i].setVertices(SHAPE.sphere(20));
        electrons[i].setMaterial(material2);
        scene.addObject(electrons[i]);
    }

    // create orbits
    for(let i = 0; i < 2; i++) {
        orbits[i] = new SceneObject();
        orbits[i].setVertices(SHAPE.torus(80));
        orbits[i].setMaterial(material3);
        scene.addObject(orbits[i]);
    }

    canvas1.scene = scene;

    var m = M.identityMatrix();

    gl_start(canvas1,
    function(time) {
        M.identity(m);
        M.rotateX(m, 10);
        M.rotateY(m, time);

        // place protons
        for(let i = 0; i < 8; i++) {
            M.save(m);
                M.rotateX(m, time);
                M.translate(m, protonPos[i]);
                M.scale(m, .04);
                protons[i].setMatrix(m);
            M.restore(m);
        }

        // place neutrons
        for(let i = 0; i < 8; i++) {
            M.save(m);
                M.rotateX(m, time);
                M.translate(m, neutronPos[i]);
                M.scale(m, .03);
                neutrons[i].setMatrix(m);
            M.restore(m);
        }

        // place orbits
        for(let i = 0; i < 2; i++) {
            M.save(m);
                M.rotateX(m, Math.PI/2);
                M.scale(m, .93 * (i * .5 + 1));
                orbits[i].setMatrix(m);
            M.restore(m);
        }

        // place electrons
        for(let i = 0; i < 8; i++) {
            M.save(m);
                M.translate(m, electronPos[i]);
                M.scale(m, .03);
                M.rotateX(m, 10 * time);
                M.rotateY(m, 10 * time);
                M.rotateZ(m, Math.tan(time));
                electrons[i].setMatrix(m);
            M.restore(m);
        }

    }
    );
}



function createFeModel(canvas1) {
        var vs = '\
    attribute vec3 aPos, aNor;\n\
    attribute vec2 aUV;\n\
    varying   vec3 vPos, vNor;\n\
    varying   vec2 vUV;\n\
    uniform   mat4 matrix, invMatrix;\n\
    void main() {\n\
    vec4 pos = matrix * vec4(aPos, 1.);\n\
    vec4 nor = vec4(aNor, 0.) * invMatrix;\n\
    gl_Position = pos;\n\
    vPos = pos.xyz;\n\
    vNor = nor.xyz;\n\
    vUV  = aUV;\n\
    }\n\
    ';

    var fs1 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    uniform sampler2D uSampler;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    //    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    vec4 texture = texture2D(uSampler, vUV);\n\
    c *= texture.rgb;\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var fs2 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    uniform sampler2D uSampler;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(.7,.7,1.) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    c += vec3(.5,.3,.1) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    vec4 texture = texture2D(uSampler, vUV);\n\
    c *= texture.rgb;\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';

    var fs3 = '\
    varying vec3 vPos, vNor;\n\
    varying vec2 vUV;\n\
    void main() {\n\
    vec3 normal = normalize(vNor);\n\
    vec3 c = vec3(.1,.1,.1);\n\
    c += vec3(.0,.0,1.) * max(0.,dot(normal, vec3( .7, .7, .7)));\n\
    //    c += vec3(1.,.0,.0) * max(0.,dot(normal, vec3(-.7,-.7,-.7)));\n\
    gl_FragColor = vec4(sqrt(c), 1.);\n\
    }\n\
    ';


    var protons = {}, neutrons = {}, orbits = {}, electrons = {};
    
    var protonPos = [[.05, .04714, .025], [.05, -.04714, .025],
                        [-.05, .04714, .025], [-.05, -.04714, .025],
                        [0., .04714, -.05], [0., -.04714, -.05]];

    var neutronPos = [[-.0866 * .6, 0, -.05 * .8], [.0866 * .6, 0, -.05 * .6],
                        [0., 0., .1 * .6], [0., .0707 * .6, 0.],
                        [0., -.0707 * .6, 0.], [0., .0414, 0.],
                        [0., -.0414, 0.]];

    //    var electronPos = [[0., 0., .5], [0., 0., -.5],
    //                       [.75, 0., 0.], [-.75, 0., 0.],
    //                       [.375, 0., .6495], [.375, 0., -.6495],
    //                       [-.375, 0., .6495], [-.375, 0., -.6495]];

    var electronPos = [];
    
    function electronCoordinate(r, n, i, diff) {
        const offset = typeof(diff) === "undefined" ? 0 : diff;
        return [r * Math.cos((i + offset) * 2 * Math.PI/n), 0., r * Math.sin((i + offset) * 2 * Math.PI/n)]
    }

    for(let i = 0; i < 26; i++) {
        let elePos;
        if(i < 2) {
            elePos = electronCoordinate(.5, 2, i);
        } else if(i < 10) {
            elePos = electronCoordinate(.75, 8, i - 2, .5);     
        } else if(i < 24) {
            elePos = electronCoordinate(1., 14, i - 10);
        } else {
            elePos = electronCoordinate(1.25, 2, i - 24, .5);
        }
        electronPos.push(elePos);
    }
    console.log(electronPos);

    var groupPos = [[.05 * 1.5, 0., 0.], [-.025 * 1.5, -.02165 * 1.5, -.0375 * 1.5],
                    [-.025 * 1.5, -.02165 * 1.5, .0375 * 1.5], [-.025 * 1.5, .0433 * 1.5, 0.]];

    var scene = new Scene();

    // protons material
    var material1 = new Material(vs, fs1);
    material1.setTexture('imgs/proton.jpg');
    // neutrons material
    var material4 = new Material(vs, fs2);
    material4.setTexture('imgs/neutron.jpeg')
    // electrons material
    var material2 = new Material(vs, fs2);
    material2.setTexture('imgs/thunder.jpeg');
    // orbit material
    var material3 = new Material(vs, fs3);

    // create protons
    for(let i = 0; i < 24; i++) {
        protons[i] = new SceneObject();
        protons[i].setVertices(SHAPE.sphere(10));
        protons[i].setMaterial(material1);
        scene.addObject(protons[i]);
    }

    // create neutrons
    for(let i = 0; i < 28; i++) {
        neutrons[i] = new SceneObject();
        neutrons[i].setVertices(SHAPE.sphere(8));
        neutrons[i].setMaterial(material4);
        scene.addObject(neutrons[i]);
    }
    
    // create electrons
    for(let i = 0; i < 26; i++) {
        electrons[i] = new SceneObject();
        electrons[i].setVertices(SHAPE.sphere(8));
        electrons[i].setMaterial(material2);
        scene.addObject(electrons[i]);
    }

    // create orbits
    for(let i = 0; i < 4; i++) {
        orbits[i] = new SceneObject();
        orbits[i].setVertices(SHAPE.torus(30));
        orbits[i].setMaterial(material3);
        scene.addObject(orbits[i]);
    }

    canvas1.scene = scene;

    var m = M.identityMatrix();

    gl_start(canvas1,
    function(time) {
        M.identity(m);
        M.rotateX(m, 10);
        M.rotateY(m, time);
        M.scale(m, .7);

        for(let j = 0; j < 4; j++) {
            M.save(m);
            M.translate(m, groupPos[j]);
                // place protons
                for(let i = j * 6; i < j * 6 + 6; i++) {
                    M.save(m);
                        M.rotateX(m, time);
                        M.translate(m, protonPos[i - j * 6]);
                        M.scale(m, .04);
                        protons[i].setMatrix(m);
                    M.restore(m);
                }

                // place neutrons
                for(let i = j * 7; i < j * 7 + 7; i++) {
                    M.save(m);
                        M.rotateY(m, time);
                        M.translate(m, neutronPos[i - j * 7]);
                        M.scale(m, .03);
                        neutrons[i].setMatrix(m);
                    M.restore(m);
                }
            M.restore(m);
        }

        // place orbits
        for(let i = 0; i < 4; i++) {
            M.save(m);
                M.rotateX(m, Math.PI/2);
                M.scale(m, .93 * (i * .5 + 1));
                orbits[i].setMatrix(m);
            M.restore(m);
        }

        // place electrons
        for(let i = 0; i < 26; i++) {
            M.save(m);
                M.translate(m, electronPos[i]);
                M.scale(m, .03);
                M.rotateX(m, 10 * time);
                M.rotateY(m, 10 * time);
                M.rotateZ(m, Math.tan(time));
                electrons[i].setMatrix(m);
            M.restore(m);
        }

    }
    );
}