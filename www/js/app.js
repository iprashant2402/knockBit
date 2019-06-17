// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ionic-material','firebase','AuthServices','ngCordova','ionic.contrib.ui.hscrollcards'])

.run(function($ionicPlatform,$ionicLoading,$state,$rootScope,AuthService,$timeout) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
      StatusBar.overlaysWebView(false);
      StatusBar.backgroundColorByHexString('#430f58');
    }
  });
  AuthService.Auth.$onAuthStateChanged(function(user){
    if(user){
        console.log(user);
      $rootScope.mailVerified=user.emailVerified;
        $rootScope.uid=user.uid;
        $rootScope.$broadcast('uidUpdate');
      AuthService.database.ref("/users/"+user.uid).on('value',function(snapshot){
        $timeout(function(){
        $rootScope.name=snapshot.val().name;
        $rootScope.email=snapshot.val().email;
        $rootScope.photo=snapshot.val().photo;
        $rootScope.branch=snapshot.val().branch;
        $rootScope.gender=snapshot.val().gender;
        $rootScope.batch=snapshot.val().batch;
        $rootScope.age=snapshot.val().age;
        $rootScope.numFollowers=snapshot.val().followers;
        $rootScope.numFollowing=snapshot.val().following;
        $ionicLoading.hide();
        });
      });
        $state.go("tab.history");
    }
    else{
      $state.go("intro");
    }
  });
  /*$rootScope.$on('$stateChangeError',function(events,toState,toParams,fromState,fromParams,error){
    if(error=="AUTH_REQUIRED"){
      console.log(error);
      $state.go('auth.login');
    }
})*/
})

.config(function($stateProvider,$ionicConfigProvider,$urlRouterProvider){
  
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
  
  .state('login',{
    url:'/login',
    views:{
      '@': {
        templateUrl:'templates/auth/login.html',
        controller:'loginCtrl'
      }
  }
  })

  .state('intro',{
    url:'/intro',
    views:{
      '@':{
        templateUrl : 'templates/auth/intro.html',
        controller:'introCtrl'
      }
    }
  })

  .state('signup',{
    url:'/signup',
    views:{
      '@':{
        templateUrl:'templates/auth/signup.html',
        controller:'signupCtrl'
      }
  }

  })

  .state('tab',{
    url:'/tab',
    abstract:true,
    templateUrl:'templates/app/tabs.html'
  })

  .state('tab.feed',{
    url:'/feed',
    views:{
      'feedView':{
        templateUrl:'templates/app/tab-feed.html',
        controller:'feedCtrl'
      }
  } 
  })
  
  .state('tab.search',{
    url:'/search',
    views:{
      'searchView':{
        templateUrl:'templates/app/tab-search.html',
        controller:'searchModalCtrl'
      }
  } 
  })
  
  .state('tab.search.profile',{
      url:'/:profile?uid?name?age?gender?numFollowers?numFollowing?branch?batch?email?photo',
      views:{
          'searchView@tab':{
              templateUrl:'templates/app/otherUserProfile.html',
              controller:'profileCtrl'
          }
      }
  })

  .state('tab.history',{
    url:'/history',
    views:{
      'historyView':{
        templateUrl:'templates/app/tab-history.html',
        controller:'historyCtrl'
      }
  }
  })

  .state('tab.notification',{
    url:'/notification',
    views:{
      'notificationView':{
        templateUrl:'templates/app/tab-notification.html',
        controller:'notificationCtrl'
      }
  }
  })
  
  .state('tab.account',{
    url:'/account',
    views:{
      'AccountView':{
        templateUrl:'templates/app/tab-account.html',
        controller:'accountCtrl'
      }
  }
  })

  .state('tab.account.followersList',{
    url:'/followersList',
    views:{
      'AccountView@tab':{
        templateUrl:'templates/app/followersList.html',
        controller:'followersListCtrl'
      }
  }
  })
  

  .state('tab.account.followingList',{
    url:'/followingList',
    views:{
      'AccountView@tab':{
        templateUrl:'templates/app/followingList.html',
        controller:'followingListCtrl'
      }
  }
  })
  
  .state('chat',{
    url:'/:chat?tuid?title',
    views:{
      '@':{
        templateUrl:'templates/app/chat.html',
        controller:'chatCtrl'
      }
  }
  });

  $urlRouterProvider.otherwise('/auth/intro');
})
