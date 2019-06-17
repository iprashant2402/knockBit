angular.module('starter')

.controller('loginCtrl',function($ionicLoading,$ionicModal,$scope,$state,AuthService,$rootScope,ionicMaterialMotion,ionicMaterialInk){
    $scope.loginSpinner=false;
    
    $scope.login=function(email,pass){
       $scope.loginSpinner=true;
       AuthService.login(email,pass);
   };
    $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
    function validate_reset_email(email){
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            $scope.reset_err="Invalid Email address.";
            console.log("Invalid mail");
            return false;
        }
        return true;
    }
    $scope.reset_pass=function(email){
        if(validate_reset_email(email)){
            AuthService.auth.sendPasswordResetEmail(email).then(function(){
                $scope.modal.hide();
            }).catch(function(err){console.log(err);});
        }
        else{
            $scope.reset_alert=true;
        }
    };
})

.controller('signupCtrl',function($ionicPlatform,AuthService,modalService,$ionicLoading,$scope,$state,$rootScope,catService,$cordovaCamera,ionicMaterialMotion,ionicMaterialInk){
    $scope.pic="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";
   $scope.signupSpinner=false;
   $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
       $ionicPlatform.ready(function(){
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.pic=imageData;
        }, function(error) {
            alert(error);
        });});
    };
    
    $scope.showalertbox=false;
    function validate_form(email,pass,name,branch,batch,age,gender){
        var pass_valid=  /^[A-Za-z]\w{6,14}$/;
        if(email==""||pass==""||name==""||branch==""||batch==""||age==""||gender==""){
            $scope.error="One or more fields empty.";
            return false;
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            $scope.error="Invalid Email address.";
            console.log("Invalid mail");
            return false;
        }
        //if(!(/@vitstudent.ac.in\s*$/.test(email))){
        //    $scope.error="Sorry, currently you need a valid Vit student email address to register.";
        //    console.log("Invalid mail");
        //    return false;
        //}
        if(!(/^[a-zA-Z ]{2,50}$/.test(name))){
            $scope.error="Invalid name.";
            console.log("Invalid name");
            return false;
        }
        if(!(pass.match(pass_valid))){
            $scope.error="Invalid Password.(Password must be b/w 7 to 14 digits and first character must be a letter)";
            console.log("Invalid password");
            return false;
        }
        /*if(!(/^[a-zA-Z ]{2,50}$/.test(branch))){
            $scope.error="Invalid Education entry.";
            console.log("Invalid branch");
            return false;
        }
        if(/^[a-zA-Z ]{2,50}$/.test(batch)){
            $scope.error="Invalid Work Entry.";
            console.log("Invalid batch");
            return false;
        }*/
        if(parseInt(age)<13){
            $scope.error="You must be at least 13 years old to sign up.";
            console.log("Invalid age");
            return false;
        }
        return true;
    }
   $scope.signup=function(email,pass,name,pic,branch,batch,age,gender){
       if(validate_form(email,pass,name,branch,batch,age,gender)){
       $scope.signupSpinner=true;
       AuthService.signup(email,pass,name,pic,branch,batch,age,gender);
       
       }
       else{
           $scope.showalertbox=true;
       }
   };     
   
})

.controller('introCtrl',function($scope,$rootScope,AuthService,$ionicLoading,$state,ionicMaterialMotion,ionicMaterialInk){
    $scope.options = {
  loop: false,
  speed: 500
}

$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
  // data.slider is the instance of Swiper
  $scope.slider = data.slider;
});

$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
  console.log('Slide change is beginning');
});

$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
  // note: the indexes are 0-based
  $scope.activeIndex = data.slider.activeIndex;
  $scope.previousIndex = data.slider.previousIndex;
});
})

.controller('searchModalCtrl',function($scope,$rootScope,AuthService,$ionicLoading,$state,ionicMaterialMotion,ionicMaterialInk){
    //Swipe to navigate between tabs
    $scope.onDragRight=function(){
        $state.go('tab.feed');
    };
    $scope.onDragLeft=function(){
        $state.go('tab.history');
    };
    var tempUserArr=new Array;
    $scope.searchQuery;
    $scope.searchLoadingHide=false;
    //$ionicLoading.show();
    $scope.resultsPeopleArr=new Array;
    $scope.recommendationsArr=new Array;
    function loadRecommendation(arr){
        arr.sort(function(a,b){
            return b.followers-a.followers;
        });
        if(arr.length<20){
            var numRec=arr.length;
        }
        else{
            var numRec=20;
        }
        for(i=0;i<numRec;i++){
            if(arr[i].followers!=0){
            $scope.recommendationsArr[i]=arr[i];
            }
        }
    }
    var peopleRef=AuthService.database.ref("/users/");
    peopleRef.orderByChild("name").on('value',function(snapshot){
        if(snapshot.val()){
        $scope.$apply(function(){$scope.searchLoadingHide=true;});
        tempUserArr=[];
        snapshot.forEach(function(childSnapshot){
            tempUserArr.push(childSnapshot.val());
        });
        loadRecommendation(tempUserArr);
        }
    });
    $scope.searchPeople=function(){
        var q = $scope.searchQuery;
        $scope.resultsPeopleArr=[];
        var patt=new RegExp(q,"i");
        if(q.length>2){
            tempUserArr.forEach(function(data){
                if(data.uid!=$rootScope.uid && patt.test(data.name)){
                    $scope.resultsPeopleArr.push(data);
                }
            });
        }
        else{
            $scope.resultsPeopleArr=[];
            console.log("No");
        }
    };
})

.controller('profileCtrl',function($firebaseArray,$scope,AuthService,$rootScope,$state,$ionicLoading,$stateParams,$ionicActionSheet,ionicMaterialMotion,ionicMaterialInk){
    var userUid=$stateParams.uid;
    $ionicLoading.show();
    $scope.userProfile={};
    $scope.userProfile.uid=userUid;
    var userRef = AuthService.database.ref("/users/"+userUid);
    userRef.on('value',function(snapshot){
        if(snapshot.val()){
            $scope.userProfile.photo=snapshot.val().photo;
            $scope.userProfile.name=snapshot.val().name;
            $scope.userProfile.age=snapshot.val().age;
            $scope.userProfile.gender=snapshot.val().gender;
            $scope.userProfile.followers=snapshot.val().followers;
            $scope.userProfile.following=snapshot.val().following;
            $scope.userProfile.branch=snapshot.val().branch;
            $scope.userProfile.batch=snapshot.val().batch;
            $scope.userProfile.email=snapshot.val().email;
            $ionicLoading.hide();
        }
    });
    $scope.userProfile.numFollowers=parseInt($scope.userProfile.numFollowers);
    $scope.hideFollowButton;
    $scope.followOrUnfollow;
    var ref = AuthService.database.ref("/followers/"+$scope.userProfile.uid+"/"+$rootScope.uid);
    ref.on('value',function(snapshot){
        if(snapshot.val()){
            $scope.followOrUnfollow='Unfollow';
            $scope.hideFollowButton=true;
        }
        else{
            $scope.followOrUnfollow='Follow';
            $scope.hideFollowButton=false;
        }
    });
    $scope.follow=function(uid,friendUid,name,photo){
        AuthService.follow(uid,friendUid);
        var follower_ref=AuthService.database.ref("/followers/"+uid);
            follower_ref.once("value").then(function(snapshot){
                snapshot.forEach(function(childShot){
                    var notifBox_ref=AuthService.database.ref("/notifications/"+childShot.key);
                    var notif_arr=$firebaseArray(notifBox_ref);
                    var sendDate = new Date();
                    var sendTime = sendDate.getTime();
                    notif_arr.$add({
                        content : name+" started following you.",
                        photo : photo,
                        from : name,    
                        unread : 1,
                        time : sendTime
                    });
                });
            });
        //$scope.userProfile.numFollowers+=1;
    };
    $scope.unfollow=function(uid,friendUid){
      AuthService.unfollow(uid,friendUid);
      //if($scope.userProfile.numFollowers>0){$scope.userProfile.numFollowers-=1;}
    };
    $scope.hideSheet=function(){
        
        var sheet = $ionicActionSheet.show({
            buttons : [
                { text : "<b> "+$scope.followOrUnfollow+"</b>" }
            ],
            titleText : 'Would you like to '+$scope.followOrUnfollow+' ?',
            cancelText : 'Cancel',
            cancel : function(){
                return true;
            },
            buttonClicked : function(index){
                if(index==0){
                    if($scope.hideFollowButton){
                        $scope.unfollow($rootScope.uid,$scope.userProfile.uid);
                    }
                    else{
                        $scope.follow($rootScope.uid,$scope.userProfile.uid,$rootScope.name,$rootScope.photo);
                    }
                }
                return true;
            }
        });
    };
})

.controller('feedCtrl',function($scope,$ionicPlatform,$cordovaLocalNotification,$timeout,$ionicPopup,$rootScope,modalService,$state,$ionicModal,AuthService,$firebaseArray,ionicMaterialMotion,ionicMaterialInk){
   //Swipe to navigate between tabs
    $scope.onDragLeft=function(){
        $state.go('tab.search');
    };
    $scope.showLoading=false;
    function search_array(item,arr){
        for(i=0;i<arr.length;i++){
            if(arr[i].topic_id==item){
                console.log("Found Item"+arr[i]);
                return true;
            }
        }
        console.log("Didn't Find"+item);
        return false;
    }
    $scope.feedTopics=new Array;
    $scope.trendingTopics=new Array;
    /*var following_ref=AuthService.database.ref("/following/"+$rootScope.uid);
    console.log("Working");
    following_ref.on('value',function(snapshot){
        $scope.feedTopics=[];
        snapshot.forEach(function(childShot){
            var ref = AuthService.database.ref("/topics/");
            ref.on('value',function(snapShot){
                snapShot.forEach(function(child){
                    if(child.val().createdBy===childShot.key || child.val().createdBy===$rootScope.uid){
                        $timeout(function(){
                        if(!search_array(child.val().topic_id,$scope.feedTopics)){
                        $scope.feedTopics.push(child.val());
                        }
                    });
                 }
                
                });
            });
        });
    });*/
    $scope.showTrendLoading=false;

    $scope.refreshFeed=function(){
        var following_ref=AuthService.database.ref("/following/"+$rootScope.uid);
    following_ref.on('value',function(snapshot){
        $scope.feedTopics=[];
        snapshot.forEach(function(childShot){
            var ref = AuthService.database.ref("/topics/");
            ref.on('value',function(snapShot){
                $timeout(function(){$scope.showLoading=true;});
                snapShot.forEach(function(child){
                    if(child.val().createdBy===childShot.key || child.val().createdBy===$rootScope.uid){
                        $timeout(function(){
                        if(!search_array(child.val().topic_id,$scope.feedTopics)){
                        $scope.feedTopics.push(child.val());
                        }
                    });
                 }
                
                });
            });
        });
        $scope.$broadcast('scroll.refreshComplete');
    });
    };
    $scope.refreshFeed();
    $scope.topic_title;
    var history_ref=AuthService.database.ref("/history/"+$rootScope.uid);
    $scope.history=$firebaseArray(history_ref);
    $scope.addTopicHistory=function(post){
        var topic_followers_ref=AuthService.database.ref("/topic_followers/"+post.topic_id);
        var tFollowers = $firebaseArray(topic_followers_ref);
        function followerExists(uid){
            for(i=0;i<tFollowers.length;i++){
                if(tFollowers[i].uid==uid){
                    return true;
                }
            }
            return false;
        }
        function topicExists(){
            for(i=0;i<$scope.history.length;i++){
                if($scope.history[i].tid==post.topic_id){
                  return true;
                }
            }
            return false;
        }
        tFollowers.$loaded(function(x){
            if(!followerExists($rootScope.uid)){
                tFollowers.$add({
                    uid : $rootScope.uid
                });
            }
        });
        if(!topicExists()){
            
               $scope.history.$add({
                title : post.topic_title,
                creator : post.ownerEmail,
                tid : post.topic_id,
                unread : 0
             });

        if($rootScope.uid!=post.createdBy){
            var notif_ref=AuthService.database.ref("/notifications/"+post.createdBy);
            var notif_array=$firebaseArray(notif_ref);
            var sendDate=new Date();
            var sendTime=sendDate.getTime();
            notif_array.$add({
                content : $rootScope.name+" joined the topic created by you "+post.topic_title+".",
                        photo : $rootScope.photo,
                        from : $rootScope.name,
                        time : sendTime,
                        unread : 1
            });
        }
    }
    if(!topicExists()){
        AuthService.increment_topic_followers(post.topic_id);
    }
    };
    var createTopic=function(uid,name,email,photo,title){
     if(AuthService.create_topic(uid,name,email,photo,title)){
            $scope.title="";
            var follower_ref=AuthService.database.ref("/followers/"+$rootScope.uid);
            follower_ref.once("value").then(function(snapshot){
                snapshot.forEach(function(childShot){
                    var notifBox_ref=AuthService.database.ref("/notifications/"+childShot.key);
                    var notif_arr=$firebaseArray(notifBox_ref);
                    var sendDate = new Date();
                    var sendTime = sendDate.getTime();
                    notif_arr.$add({
                        content : name+" created the topic "+title+".",
                        photo : photo,
                        from : name,
                        time : sendTime,
                        unread : 1
                    });
                });
            });
            console.log("New topic Created!");
     }
     else{
         console.log("Couldn't Create Topic");
     }
        
    };
     $scope.showCreateTopicConfirm = function(uid,name,email,photo,title) {
        var confirmPopup = $ionicPopup.confirm({
        title: 'Create Topic',
        template: 'Are you sure you want to create the topic '+'<b>'+title+'</b>'
    });

    confirmPopup.then(function(res) {
     if(res) {
       createTopic(uid,name,email,photo,title);
     } else {
       console.log("Create topic cancelled");
     }
    });
 };

 var trendingRef = AuthService.database.ref("/topics/");
    var trendQuery = trendingRef.orderByChild("topic_followers").limitToLast(10);
    $scope.trendingTopics=$firebaseArray(trendQuery);
    $scope.trendingTopics.$loaded(function(x){
        $scope.showTrendLoading=true;
    });
})

.controller('historyCtrl',function($firebaseArray,historyService,ionicMaterialMotion,ionicMaterialInk,$scope,$rootScope,AuthService,$state,$timeout,$ionicHistory){
    $ionicHistory.clearHistory();
    //Swipe to navigate between tabs
    $scope.onDragRight=function(){
        $state.go('tab.search');
    };
    $scope.onDragLeft=function(){
        $state.go('tab.notification');
    };
    $scope.showLoading=false;
    $scope.historyBool=false;
    $scope.history=new Array();
    $scope.refreshHistory=function(){
        var history_ref=AuthService.database.ref("/history/"+$rootScope.uid);
        $scope.history=$firebaseArray(history_ref);
        console.log($scope.history);
        $scope.history.$loaded(function(x){
            $timeout(function(){$scope.showLoading=true;});
            $scope.$broadcast('scroll.refreshComplete');
            if($scope.history.length==0){
                $timeout(function(){
                    $scope.historyBool=true;
                });
            }
        });
        $scope.history.$watch(function(e){
            if(e.event=="child_added"){
                $scope.historyBool=false;
            }
        });
    };
    $scope.refreshHistory();
    $scope.getHistoryBackground=function(unread){
        if(unread==0){
            return("badge blue");
        }
        else{
            return ("badge badge-calm");
        }
    };
    $scope.markRead=function(item){
        item.unread=0;
        $scope.history.$save(item);
    };
    })

.controller('accountCtrl',function($scope,$cordovaSocialSharing,$q,$cordovaFile,$state,$ionicPlatform,AuthService,$rootScope,$ionicModal,catService,$timeout,$cordovaCamera,$firebaseArray,$cordovaImagePicker,ionicMaterialMotion,ionicMaterialInk){
    //Swipe to navigate between tabs
    $scope.onDragRight=function(){
        $state.go('tab.notification');
    };
    $scope.photoSpinner=false;
    $scope.shareApp=function(message,subject,file,link){
        $ionicPlatform.ready(function(){
            $cordovaSocialSharing
    .share(message, subject,file,link) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
        });
    };
    $ionicModal.fromTemplateUrl('templates/app/notif-model.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            console.log("working");
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
    
    var userReference = AuthService.database.ref("/users/"+$rootScope.uid);
    //var syncArray = $firebaseArray(userReference.child("images"));
    //$scope.images=syncArray;
    function saveToFirebase(_imageBlob, _filename) {

      return $q(function (resolve, reject) {
        // Create a root reference to the firebase storage
        var storageRef = AuthService.storage.ref();

        // pass in the _filename, and save the _imageBlob
        var uploadTask = storageRef.child('/images/' + _filename).put(_imageBlob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, function (error) {
          // Handle unsuccessful uploads, alert with error message
          alert(error.message)
          reject(error)
        }, function () {
          // Handle successful uploads on complete
          var downloadURL = uploadTask.snapshot.downloadURL;

          // when done, pass back information on the saved image
          resolve(uploadTask.snapshot)
        });
      });
    }


    function saveReferenceInDatabase(_snapshot) {
      var ref = AuthService.database.ref('/users/'+$rootScope.uid);
      return ref.set({
                name: $rootScope.name,
                age: $rootScope.age,
                branch: $rootScope.branch,
                batch: $rootScope.batch,
                followers: $rootScope.numFollowers,
                following: $rootScope.numFollowing,
                uid: $rootScope.uid,
                email: $rootScope.email,
                gender: $rootScope.gender,
                photo: _snapshot.downloadURL
            }).then(function(){
                $timeout(function(){
          $scope.photoSpinner=false;
      });
            }).catch(function(error){alert(error);});
    }
    $scope.updateProfilePic=function(){
        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, function( status ){
            if ( status.hasPermission ) {
             $scope.doGetImage();
            }
            else {
                permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE,function(status){
                    if(status.hasPermission){
                        $scope.doGetImage();
                    }
                },function(error){alert(error)});
             }
        });
    };
    $scope.doGetImage = function () {
      $timeout(function(){
          $scope.photoSpinner=true;
      });
      var options = {
        maximumImagesCount: 1, // only pick one image
        width: 800,
        height: 800,
        quality: 80
      };

      var fileName, path;

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          console.log('Image URI: ' + results[0]);

          // lets read the image into an array buffer..
          // see documentation:
          // http://ngcordova.com/docs/plugins/file/
          fileName = results[0].replace(/^.*[\\\/]/, '');

          // modify the image path when on Android
          if ($ionicPlatform.is("android")) {
            path = cordova.file.cacheDirectory
          } else {
            path = cordova.file.tempDirectory
          }

          return $cordovaFile.readAsArrayBuffer(path, fileName);
        }).then(function (success) {
          // success - get blob data
          var imageBlob = new Blob([success], { type: "image/jpeg" });

          // missed some params... NOW it is a promise!!
          return saveToFirebase(imageBlob, fileName);
        }).then(function (_responseSnapshot) {
          // we have the information on the image we saved, now 
          // let's save it in the realtime database
          return saveReferenceInDatabase(_responseSnapshot)
        }).then(function (_response) {
          //alert("Saved Successfully!!")
        }, function (error) {
          // error
          alert(error)
        });
    }
    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $ionicPlatform.ready(function(){
        $cordovaCamera.getPicture(options).then(function(imageData) {
            userReference.set({
                name: $rootScope.name,
                age: $rootScope.age,
                branch: $rootScope.branch,
                batch: $rootScope.batch,
                followers: $rootScope.numFollowers,
                following: $rootScope.numFollowing,
                uid: $rootScope.uid,
                email: $rootScope.email,
                gender: $rootScope.gender,
                photo: imageData
            }).then(function(){
                alert("Image has been uploaded.");
            }).catch(function(error){alert(error);});
            //syncArray.$add({image: imageData}).then(function() {
            //    alert("Image has been uploaded");
            //});
        }, function(error) {
            alert(error);
        });});
    };
   //Sign out function using AuthService
   $scope.signout=function(){
       AuthService.signout();
   }
})

.controller('editProfileCtrl',function($scope,$rootScope,AuthService,$ionicLoading,ionicMaterialMotion,ionicMaterialInk){
    $scope.editName=$rootScope.name;
    $scope.editAge=$rootScope.age;
    $scope.editGender=$rootScope.gender;
    $scope.editBatch=$rootScope.batch;
    $scope.editBranch=$rootScope.branch;
    $scope.error;
    function validate(name,age,gender,batch,branch){
        if(name=="" || age=="" || gender=="" || batch=="" || branch==""){
            $scope.error="One or more fields empty!";
            return false;
        }
        //if(batch.length!=4){
        //    $scope.error="Batch field must be a valid 4 digit year.";
        //    return false;
        //}
        return true;
    }
    $scope.submitChanges=function(name,age,gender,batch,branch){
        if(validate(name,age,gender,batch,branch)){
            $ionicLoading.show();
            AuthService.editProfile($rootScope.uid,name,gender,age,batch,branch,$rootScope.email,$rootScope.numFollowers,$rootScope.numFollowing,$rootScope.photo);
            $scope.modal.hide();
        }
    };
})

.controller('followingListCtrl',function($scope,$timeout,$rootScope,$ionicLoading,AuthService,ionicMaterialMotion,ionicMaterialInk){
    $ionicLoading.show();
    var ref=AuthService.database.ref("/following/"+$rootScope.uid);
    $scope.uidArr=new Array;
    var tempArr = new Array;
    ref.on('value',function(snapshot){
        $scope.uidArr=[];
        snapshot.forEach(function(childShot){
            AuthService.database.ref("/users/"+childShot.key).on('value',function(snapshot){
                $timeout(function(){$scope.uidArr.push(snapshot.val());})
            });
            $ionicLoading.hide();
        });
    });
    
    $scope.follow=function(uid,friendUid){
        AuthService.follow(uid,friendUid);
    };
    $scope.unfollow=function(uid,friendUid){
      AuthService.unfollow(uid,friendUid);
    };
    
})

.controller('followersListCtrl',function($scope,$rootScope,$timeout,$ionicLoading,AuthService,ionicMaterialMotion,ionicMaterialInk){
    $ionicLoading.show();
    var ref=AuthService.database.ref("/followers/"+$rootScope.uid);
    $scope.uidArr=new Array;
    ref.on('value',function(snapshot){
        $scope.uidArr=[];
        snapshot.forEach(function(childShot){
            AuthService.database.ref("/users/"+childShot.key).on('value',function(snapshot){
                $timeout(function(){    
                $scope.uidArr.push(snapshot.val());
                });
            });
            $ionicLoading.hide();
        });
    });
    
    $scope.follow=function(uid,friendUid,name,photo){
        AuthService.follow(uid,friendUid);
        var follower_ref=AuthService.database.ref("/followers/"+uid);
            follower_ref.once("value").then(function(snapshot){
                snapshot.forEach(function(childShot){
                    var notifBox_ref=AuthService.database.ref("/notifications/"+childShot.key);
                    var notif_arr=$firebaseArray(notifBox_ref);
                    var sendDate = new Date();
                    var sendTime = sendDate.getTime();
                    notif_arr.$add({
                        content : name+" started following you.",
                        from : name,
                        photo : photo,
                        time : sendTime,
                        unread : 1
                    });
                });
            });
    };
    $scope.unfollow=function(uid,friendUid){
      AuthService.unfollow(uid,friendUid);
    };
})

.controller('followingListDetailCtrl',function($scope,$rootScope,$ionicLoading,AuthService){
    
})

.controller('followersListDetailCtrl',function($scope,$rootScope,$ionicLoading,AuthService){
    
})

.controller('chatCtrl',function($scope,$stateParams,$timeout,$rootScope,$ionicLoading,AuthService,$firebaseArray,$ionicScrollDelegate,ionicMaterialMotion,ionicMaterialInk){
    var topic_id = $stateParams.tuid;
    $scope.showLoading=false;
    $scope.message;
    $scope.getMessagePosition=function(id){
        if(id==$rootScope.uid){
            return "sf-right";
        }
        else{
            return "sf-left";
        }
    };
    $scope.getMessageBackground=function(id){
          if(id==$rootScope.uid){
              return 'sf-right-color';
          }
        else{
            return 'sf-left-color';
        }
    };
    $scope.topic_title = $stateParams.title;
    var topic_room_ref = AuthService.database.ref("/topic_rooms/"+topic_id);
    $scope.messages = $firebaseArray(topic_room_ref);
    $scope.messages.$loaded(function(x){
        $timeout(function(){
            $scope.showLoading=true;
    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
    });
        $scope.messages.$watch(function(e){
            if(e.event=="child_added"){
                $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom();
            }
        });
    });
    $scope.addMessage = function(){
        var sendDate = new Date();
        var sendTime = sendDate.getTime();
        $scope.messages.$add({
            senderId : $rootScope.uid,
            senderName : $rootScope.name,
            senderPhoto : $rootScope.photo,
            content : $scope.message,
            time : sendTime
        }).then(function(x){
            var ref = AuthService.database.ref("/topic_followers/"+topic_id);
            var tUsers = $firebaseArray(ref);
            tUsers.$loaded(function(x){
                x.forEach(function(y){
                    var history_ref=AuthService.database.ref("/history/"+y.uid);
                    var query=history_ref.orderByChild('tid').equalTo(topic_id);
                    var messArr = $firebaseArray(query);
                    messArr.$loaded(function(a){
                     a.forEach(function(b){
                         b.unread+=1;
                         messArr.$save(b);
                     });
                        
                   });
                });
            });
        });
        $scope.message="";
    };
})

.controller('notificationCtrl',function($ionicPlatform,$scope,$rootScope,$state,modalService,catService,AuthService,$firebaseArray,$interval,$timeout,$cordovaLocalNotification,ionicMaterialMotion,ionicMaterialInk){
    //Swipe to navigate between tabs
    $scope.onDragRight=function(){
        $state.go('tab.history');
    };
    $scope.onDragLeft=function(){
        $state.go('tab.account');
    };
    $rootScope.notifications=new Array();
    $interval(function(){
        $scope.unreadBadge=getUnreadCount($rootScope.notifications);
    },2000);
    function getUnreadCount(arr){
        var unreadCount = 0;
        arr.forEach(function(x){
            unreadCount+=x.unread;
        });
        return unreadCount;
    }
    $scope.zeroDiv=false;
    $scope.showLoading=false;
    function refresh(){
        var notif_ref=AuthService.database.ref("/notifications/"+$rootScope.uid);
        var notif_query=notif_ref.orderByChild("unread").equalTo(1);
        $rootScope.notifications=$firebaseArray(notif_query);
        $rootScope.notifications.$loaded(function(){
            $timeout(function(){
                $scope.showLoading=true;
                $scope.unreadBadge=getUnreadCount($rootScope.notifications);
                console.log($scope.unreadBadge);
            });
            $rootScope.notifications.$watch(function(e){
                console.log(e);
                if(e.event=="child_added"){
                    var notif_obj = $rootScope.notifications.$getRecord(e.key);
                    var now = new Date().getTime();
                    $cordovaLocalNotification.schedule({
                        id : e.key,
                        at : now,
                        title : "insquoo",
                        text : notif_obj.content,
                        icon : "file://img/icon.png",
                        smallIcon : "file://img/icon.png",
                        led :'009900'
                    }).then(function(){
                    });
                }
                
            });
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
     $scope.refreshNotifs=function(){
         refresh();   
     };
    refresh();
    $scope.read_item=function(item){
        item.unread=0;
        $scope.notifications.$save(item);
    };
})
;
