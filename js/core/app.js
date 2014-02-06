// Application
var MyRecipeBoxes = angular.module("MyRecipeBoxes", ['ngRoute',"firebase","ui.bootstrap"]);

// Set the firebase URL for the app
MyRecipeBoxes.constant("FIREBASE_URL","https://myrecipeboxes.firebaseio.com/");

// function that runs on initial load.
MyRecipeBoxes.run([
	'$rootScope',
	'FIREBASE_URL',
	'$firebase',
	'$location',
	'$fireLogin',
	function($rootScope,FIREBASE_URL,$firebase,$location,$fireLogin)
	{

    // initialize AngularFire Authentication using custom $fireLogin factory
	$fireLogin.init(FIREBASE_URL,'/signup');

    // Listen for login event, from either session login or login form submission
    $rootScope.$on('$firebaseSimpleLogin:login',function(evt,user)
    {

        // set up the user info from firebase
		$rootScope.user_info = $firebase(new Firebase(FIREBASE_URL+"users/"+user.uid));

    });

    // on click of logout button
    $rootScope.logout = function()
    {

        // logout of firebase
        $fireLogin.$logout();

        // reset user info
        $rootScope.user_info = undefined;
        $rootScope.user = undefined;

        // go to login page
        $location.path('/login');
    };

    // when there is an error with firebase authentication
	$rootScope.$on("$firebaseSimpleLogin:error", function(evt, err) {

        //TODO: add error handling
		console.log('err',err);
	});

}]);



