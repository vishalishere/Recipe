var MyRecipeBoxes = angular.module("MyRecipeBoxes", ['ngRoute',"firebase","ui.bootstrap"]);

MyRecipeBoxes.run([
	'$rootScope',
	'FIREBASE_URL',
	'$firebase',
	'$location',
	'$fireLogin',
	function($rootScope,FIREBASE_URL,$firebase,$location,$fireLogin)
	{
	$fireLogin.init(FIREBASE_URL,'/signup');
    $rootScope.$on('$firebaseSimpleLogin:login',function(evt,user)
    {
		console.log('User '+user.email+' Logged in', user);
		$rootScope.user_info = $firebase(new Firebase(FIREBASE_URL+"users/"+user.uid));

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
MyRecipeBoxes.constant("FIREBASE_URL","https://myrecipeboxes.firebaseio.com/");


