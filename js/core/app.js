var MyRecipeBoxes = angular.module("MyRecipeBoxes", ['ngRoute',"firebase","ui.bootstrap"]);

MyRecipeBoxes.run([
	'$rootScope',
	'FIREBASE_URL',
	'firebaseRefManager',
	'$firebase',
	'$location',
	'$fireLogin',
	function($rootScope,FIREBASE_URL,firebaseRefManager,$firebase,$location,$fireLogin)
	{
	$fireLogin.init(FIREBASE_URL,'/signup');
    $rootScope.$on('$firebaseSimpleLogin:login',function(evt,user)
    {
		console.log('User '+user.email+' Logged in', user);
		$rootScope.user_info = $firebase(firebaseRefManager(FIREBASE_URL+"users").child(user.uid));

    });


    $rootScope.logout = function()
    {

        $fireLogin.$logout();
        $rootScope.user_info = undefined;
        $rootScope.user = undefined;
        $location.path('/login');
    };

	$rootScope.$on("$firebaseSimpleLogin:error", function(evt, err) {
		console.log('err',err);
	});

}]);

MyRecipeBoxes.filter('toArray', function () {
    'use strict';

    return function (obj) {
        if (!(obj instanceof Object)) {
            return obj;
        }
        return Object.keys(obj).filter(function(key){if(key.charAt(0) !== "$") {return key;}}).map(function (key) {
            return Object.defineProperty(obj[key], '$key', {value: key});
        });
    };
});
MyRecipeBoxes.constant("FIREBASE_URL","https://myrecipeboxes.firebaseio.com/");


