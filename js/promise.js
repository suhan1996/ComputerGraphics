//say there're 3 files, you want to read them sequentially

const fs = require('fs');

function readFl(nameStr){
    return new Promise(function(fulfill,reject){
    fs.readFile(nameStr,{encoding:'utf-8'},function(err,data){
    "use strict";
        if(err) reject(err);
        else fulfill(data);
    })
    })
}

let p1=readFl('data1.txt')
let p2 = p1.then(function(val){
    "use strict";
    console.log(val)
})
//readFl('data1.txt').then(console.log)
//p2.then(function(){return readFl('data1.txt').then(console.log)})

function main(){
    "use strict";
    const req = new XMLHttpRequest();
    req.open('GET','/students');
    req.addEventListener('load', function(){
        if(req.status>=200&&req.status<400){
            const students = JSON.parse(req.responseText);

        }
    })
    req.send();


    const Req = new XMLHttpRequest();
    Req.open('POST','/students');

    //important
    Req.setRequestHeader(
        'Content-Type','application/x-www-form-urlencoded'
    )
    req.addEventListener('load',function(){
        if(req.status>=200&&req.status<400){
            console.log('success',req.responseText);
        }
    })

    //important
    req.send('foo=bar&baz=qux');







}







var express = require('express');
var router = express.Router;

const students = ['a','f'];

router











/*
how to call a function//and what's this

1.normally function call //this:global object
2.callback//
3.apply,call(bind)//set to first argument to apply and call
3.method//this is the object




*/

class Clicker{
    constructor(){
        this.handleClick = this.handelClick.bind(this);
        this.greeting = 'hi';
    }
    foo(){
        "use strict";
        ['alick', 'bob', 'carol'].forEach(function(name){
            console.log(this.greeting,name)
        }).bind(this);//important

        ['alick', 'bob', 'carol'].forEach(x=>console.log(this.greeting,x));
    }

}



class Foo{
    bar(){
        "use strict";

    }
}

//is equals to below

function Foo(){
    "use strict";

}
Foo.prototype.bar = function(){
    "use strict";

}






