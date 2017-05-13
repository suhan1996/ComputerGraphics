var SHAPE = (function() {
   var my = {};

   function addMeshVertices(V, m, n, func) {
      function append(A) {
         for (let i = 0 ; i < A.length ; i++)
            V.push(A[i]);
      }
      for (let j = 0 ; j < n ; j++)
      for (let i = 0 ; i < m ; i++) {
         let A = func( i   /m,  j   /n),
	     B = func((i+1)/m,  j   /n),
             C = func( i   /m, (j+1)/n),
	     D = func((i+1)/m, (j+1)/n);
         append(A); append(B); append(D); // Lower right of square.
         append(D); append(C); append(A); // Upper left of square.
      }
      return V;
   }

   function addDiskVertices(V, n, zSign, z) {
      function f(i) {
         let theta = zSign * 2 * Math.PI * i / n;
	 V.push(Math.cos(theta),Math.sin(theta),z, 0,0,zSign, 0,0);
      }
      for (let i = 0 ; i < n ; i++) {
         f(i  );
         f(i+1);
         V.push(0,0,z, 0,0,zSign, 0,0);
      }
      return V;
   }

   function addTubeVertices(V, n) {
      return addMeshVertices(V, n, 1, function(u, v) {
         let theta = 2 * Math.PI * u;
         let z     = 2 * v - 1;
         let c     = Math.cos(theta);
         let s     = Math.sin(theta);
         return [c,s,z, c,s,0, u,v];
      });
   }

   function addSphereVertices(V, n) {
      return addMeshVertices(V, n, 80, function(u, v) {
         let theta = 2 * Math.PI * u;
         let phi = Math.PI * (v - .5);
         let z = Math.sin(phi);
         let c = Math.cos(theta) * Math.cos(phi);
         let s = Math.sin(theta) * Math.cos(phi);
         return [c,s,z, c,s,0, u,v];
      });
   }

   function addTorusVertices(V, n) {
      return addMeshVertices(V, n, 20, function(u, v) {
         let theta = 2 * Math.PI * u;
         let phi = 2 * Math.PI * v;
         let r = .001;
         let z = r * Math.sin(phi);
         let c = Math.cos(theta) * Math.cos(1 + r * phi);
         let s = Math.sin(theta) * Math.cos(1 + r * phi);
         return [c,s,z, c,s,0, u,v];
      });
   }

   my.cylinder = function(n) {
      var V = [];
      addDiskVertices(V, n, -1, -1);
      addTubeVertices(V, n);
      addDiskVertices(V, n,  1,  1);
      return V;
   }

   my.sphere = function(n) {
      var V = [];
      addSphereVertices(V, n);
      return V;
   }

   my.torus = function(n) {
      var V = [];
      addTorusVertices(V, n);
      return V;
   }

   return my;
})();

