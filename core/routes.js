MyRecipeBoxes.config(function($routeProvider)
{

	$routeProvider.when("/app",{
		templateUrl: 'views/boxes.html',
		controller: 'User',
		authRequired: true,
	})
	.when("/",{
		templateUrl: 'views/home.html',
		controller: "SignUp",
		authRequired: false
	})
	.when("/login",{
		templateUrl: 'views/login.html',
		controller: "User",
		authRequired: false
	});

});