angular.module('AuthServices',['firebase'])

.service('AuthService',function($state,$firebaseAuth,$rootScope,$ionicLoading){
    var config = {
    apiKey: "AIzaSyBckjCXBZS5OCnYEdBBhUw_3ymvi15wk2g",
    authDomain: "knockster-21ace.firebaseapp.com",
    databaseURL: "https://knockster-21ace.firebaseio.com",
    storageBucket: "knockster-21ace.appspot.com",
    messagingSenderId: "132920329374"
   };
  
   firebase.initializeApp(config);
   var database = firebase.database();
   var Auth = $firebaseAuth();
    var auth = firebase.auth();
    var storage = firebase.storage();


   var login = function(email,password){
       Auth.$signInWithEmailAndPassword(email,password).then(function(user){
        //database.ref("/users/"+user.uid).on('value',function(snapshot){
        //$rootScope.name=snapshot.val().name;
        //$rootScope.email=snapshot.val().email;
        //$rootScope.photo=snapshot.val().photo;
        //});
           //$ionicLoading.hide();
           $rootScope.uid=user.uid;
       }).catch(function(error){
           $rootScope.err=error;
           console.log(error);
           $ionicLoading.hide();
       });
   };

   var signup = function(email,password,displayName,picURL,branch,batch,age,gender){
       var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

       var emailMD5 = MD5(email);
       picURL = "https://www.gravatar.com/avatar/"+emailMD5+"?d=retro";

       Auth.$createUserWithEmailAndPassword(email,password).then(function(user){
           user.updateProfile({
               displayName : displayName,
               photoURL: picURL
           }).catch(function(error){
               $rootScope.err=error;
               console.log(error);
               $ionicLoading.hide();
           });
           database.ref("/users/"+user.uid).set({
               name : displayName,
               uid : user.uid,
               email : user.email,
               photo : picURL,
               branch : "Not yet specified.",
               batch : "Not yet specified.",
               gender : gender,
               age : age,
               followers : 0,
               following : 0
           }).catch(function(error){
               console.log(error);
               $rootScope.err=error.message;
               $ionicLoading.hide();
           });
           $ionicLoading.hide();
       })
       .catch(function(error){
           $ionicLoading.hide();
           $rootScope.err=error;
           console.log(error);
       });
   };

   var signout = function(){
       Auth.$signOut().catch(function(error){
           console.log(error);
       });
   };
    
   var follow = function(userUid,friendUid){
       //var newKey = database.ref().child('followers').push().key;
       //var fnewKey = database.ref().child('following').push().key;
       var updates={};
       updates["/followers/"+friendUid+"/"+userUid]=true;
       updates["/following/"+userUid+"/"+friendUid]=true;
       database.ref().update(updates).then(function(){
           var fcountRef=database.ref("/users/"+userUid).child("following");
           fcountRef.transaction(function(following){
               return (following || 0) + 1;
           });
           var followerRef=database.ref("/users/"+friendUid).child("followers");
           followerRef.transaction(function(followers){
               return (followers || 0) + 1;
           });
       }).catch(function(err){
           console.log(err);
       });
   }

var increment_topic_followers=function(tid){
var fcountRef=database.ref("/topics/"+tid).child("topic_followers");
           fcountRef.transaction(function(topic_followers){
               return (topic_followers || 0) + 1;
           });
}
   
   var unfollow = function(userUid,friendUid){
       //var newKey = database.ref().child('followers').push().key;
       //var fnewKey = database.ref().child('following').push().key;
       var updates={};
       updates["/followers/"+friendUid+"/"+userUid]=null;
       updates["/following/"+userUid+"/"+friendUid]=null;
       database.ref().update(updates).then(function(){
           var fcountRef=database.ref("/users/"+userUid).child("following");
           fcountRef.transaction(function(following){
               return (following) - 1;
           });
           var followerRef=database.ref("/users/"+friendUid).child("followers");
           followerRef.transaction(function(followers){
               return (followers) - 1;
           });
       }).catch(function(err){
           console.log(err);
       });
   }

   var addInterest = function(interests,uid){
       for(var i=0;i<interests.length;i++){
           if(interests[i].checked==true){
               var newKey = database.ref().child('interests').push().key;
              // var updates={};
              // updates["/interests/"+uid+"/"+newKey]=interests[i];
              // database.ref().update(updates);
              database.ref("/interests/"+uid+"/"+newKey).set({
                  interest : interests[i].text
              });
           }
       }
   };
    
 var create_topic=function(uid,name,email,photo,title){
     var ref = database.ref("/topics/");
     var newKey = ref.push().key;
     ref.child(newKey).set({
         topic_id : newKey,
         createdBy : uid,
         ownerPhoto : photo,
         ownerEmail : email,
         ownerName : name,
         topic_title : title,
         topic_followers : 0,
         createdAt : firebase.database.ServerValue.TIMESTAMP
     }).catch(function(err){
         console.log(err);
         return false;
     });
     return true;
  };
    
 var following_list = function(uid){
    var ref=database.ref("/following/"+uid);
    var followingArr = new Array;
    var tempFollowingArr = new Array;
    ref.on('value',function(snapshot){
        tempFollowingArr=[];
        snapshot.forEach(function(childShot){
            database.ref("/users/"+childShot.key).on('value',function(snapshot){
                tempFollowingArr.push(snapshot.val());
            });
        });
    });
    followingArr=tempFollowingArr;
    return followingArr;
    };
    
    var editProfile = function(uid,name,gender,age,batch,branch,email,followers,following,photo){
      var ref = database.ref("/users/"+uid);
        ref.set({
            name : name,
            gender : gender,
            age : age,
            batch : batch,
            branch : branch,
            uid : uid,
            email : email,
            followers : followers,
            following : following,
            photo : photo
        }).then(function(){$ionicLoading.hide();}).catch(function(err){console.log(err);});
    };

   return{
       Auth : Auth,
       login : login,
       signup : signup,
       signout : signout,
       database : database,
       follow : follow,
       unfollow : unfollow,
       create_topic : create_topic,
       following_list : following_list,
       storage : storage,
       editProfile : editProfile,
       auth : auth,
       increment_topic_followers : increment_topic_followers
   }
})

.service('historyService',function(AuthService,$firebaseArray,$rootScope){
    var history_ref=AuthService.database.ref("/history/"+$rootScope.uid);
    var history=$firebaseArray(history_ref);
    return {
        history : history
    }
})

.service('modalService',function($ionicModal,$rootScope){
    var init = function(tpl, $scope) {

    var promise;
    $scope = $scope || $rootScope.$new();

    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
       $scope.modal.show();
     };
     $scope.closeModal = function() {
       $scope.modal.hide();
     };
     $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });

    return promise;
  }

  return {
      init : init
  }
})
.service('catService',function(){
    var categories = [
        {text:"Technology",checked:false},
        {text:"Science",checked:false},
        {text:"Movies",checked:false},
        {text:"Music",checked:false},
        {text:"Books",checked:false},
        {text:"Health",checked:false},
        {text:"Education",checked:false},
        {text:"Food",checked:false},
        {text:"Business",checked:false},
        {text:"Traveling",checked:false},
        {text:"Psychology",checked:false},
        {text:"History",checked:false},
        {text:"Design",checked:false},
        {text:"Photo",checked:false},
        {text:"Sports",checked:false},
        {text:"Economy",checked:false},
        {text:"Politics",checked:false},
        {text:"Fashion",checked:false},
        {text:"Philosophy",checked:false},
        {text:"Maths",checked:false},
        {text:"Finance",checked:false},
        {text:"Marketing",checked:false},
        {text:"Literature",checked:false},
        {text:"Journalism",checked:false},
        {text:"Fine Arts",checked:false},
        {text:"Television",checked:false}
        ];
    return function(){
        this.getCategories = function(){
            return categories;
        };
    };
})
;