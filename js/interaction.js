let facePos = "";
function main(){
    //let facePos = "";
    //setInterval(UpdatePos(),100);
    //console.log('facePos',facePos.innerHTML);
    //faceTracking();
    let eles = document.querySelectorAll('.element');
    //console.log(eles)
    eles.forEach(function(x){
        let name_info = x.childNodes[2];
        let idx = name_info.innerHTML.indexOf('<br');
        let name = name_info.innerHTML.slice(0,idx);
        console.log(name)
        x.addEventListener('mouseenter',function(evt){
           // console.log("this is ",x);
           // if(!SpeachSynthesis.speaking) speak(name);
            //speak(name);

            document.querySelector('#hidden').innerHTML = name;
        })
        //x.addEventListener('click',function(evt){
        //    // console.log("this is ",x);
        //    // if(!SpeachSynthesis.speaking) speak(name);
        //    //speak(name);
        //    //console.log("add canvas")
        //   // alert('jo')
        //    if(name == 'Hydrogen'){
        //        let div = document.createElement('div')
        //        let cvs = document.createElement('canvas');
        //        div.appendChild(cvs);
        //        document.body.appendChild(div);
        //        div.style.position = 'fixed';
        //        cvs.style.height = '3000px';
        //        cvs.style.weight = '3000px';
        //        cvs.style.backgroundColor = 'red';
        //        div.style.backgroundColor = 'red';
        //
        //        cvs.style.zIndex = '100000';
        //    }
        //})
    })
    "use strict";


}

function UpdatePos(){
    "use strict";
    (facePos=document.querySelector('#hidden').innerHTML)
    console.log('facePosUpdates',facePos)
}
function speak(word){
    "use strict";
    var synth = window.speechSynthesis;
    var voices = synth.getVoices();
    var utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = voices[0];

    synth.speak(utterThis);
}
//function faceTracking(){
//    "use strict";
//    var video = document.getElementById('video');
//    var canvas = document.getElementById('defaultCanvas0');
//    var context = canvas.getContext('2d');
//
//    var tracker = new tracking.ObjectTracker('face');
//    tracker.setInitialScale(4);
//    tracker.setStepSize(2);
//    tracker.setEdgesDensity(0.1);
//
//    tracking.track('#video', tracker, { camera: true });
//
//    tracker.on('track', function(event) {
//        context.clearRect(0, 0, canvas.width, canvas.height);
//
//        event.data.forEach(function(rect) {
//            context.strokeStyle = '#a64ceb';
//            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
//            context.font = '11px Helvetica';
//            context.fillStyle = "#fff";
//            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
//            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
//        });
//    });
//
//    //var gui = new dat.GUI();
//    //gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
//    //gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
//    //gui.add(tracker, 'stepSize', 1, 5).step(0.1);
//}
document.addEventListener('DOMContentLoaded', setTimeout(main,2000));
