var S = {};

   S._quad = function(f, u0, v0, u1, v1) {
      return [
         f(u0, v0),
         f(u1, v0),
         f(u1, v1),
         f(u0, v1),
         f(u0, v0)
      ];
   }

   S.parametricMesh = function(f, nu, nv) {
      var i, j, u, v, C = [];
      for (j = 0 ; j < nv ; j++) {
         v = j / nv;
         for (i = 0 ; i < nu ; i++) {
            u = i / nu;
	    C.push(S._quad(f, u, v, u + 1/nu, v + 1/nv));
         }
      }
      return C;
   }

   S.tube = function(u, v) {
      //console.log("uuuuuuvvvvv",u,v)
      var theta = 2 * Math.PI * u;
      var phi = v;

      return [
         (1-v)*Math.cos(theta),v*Math.sin(theta),
         (2*v - 1)];
   }
//return [ Math.cos(theta),
//   Math.sin(theta),
//   (2*v -1)/10 ];

S.sphere = function(u, v) {
   "use strict";
   var theta = 2 * Math.PI * u;
   var phi = Math.PI * (v - .5)
   return [
      Math.cos(theta) * Math.cos(phi),
      Math.sin(theta) * Math.cos(phi),
      Math.sin(phi)
   ];
}

S.torus = function(u, v){
   "use strict";
   var theta = 2 * Math.PI * u;
   var phi = 2 * Math.PI * v;
   var r = 0.02;
   let a;
   //for(a = 0; a < 2*Math.PI; a += 0.2) {

      //return [
      //   Math.cos(theta) * (1 + (r * Math.cos(phi))),
      //   Math.sin(theta) * (1 + (r * Math.cos(phi))),
      //   r * Math.sin(phi)
      //];
   return [
      Math.cos(theta) * (1 + ( r* Math.cos(phi))),
      Math.sin(theta) * (1 + ( r * Math.cos(phi))),
      r * Math.sin(phi)
   ];


}

S.torus1 = function(u, v){
   "use strict";
   var theta = 2 * Math.PI * u;
   var phi = 2 * Math.PI * v;
   var r = 0.02;
   let a;
   //for(a = 0; a < 2*Math.PI; a += 0.2) {

   //return [
   //   Math.cos(theta) * (1 + (r * Math.cos(phi))),
   //   Math.sin(theta) * (1 + (r * Math.cos(phi))),
   //   r * Math.sin(phi)
   //];
   return [
      Math.cos(theta) * (1 + ( r* Math.cos(phi))),
      Math.sin(theta) * (1 + ( r * Math.cos(phi))),
      r * Math.sin(phi)
   ];

}