MyRecipeBoxes.config(function($routeProvider)
{

	$routeProvider
	.when("/",{
		templateUrl: 'views/home.html',
		controller: "User",
		authRequired: false
	})
	.when("/login",{
		templateUrl: 'views/login.html',
		controller: "User",
		authRequired: false
	})
	.when("/boxes",{
		templateUrl: 'views/boxes/list.html',
		controller: "Boxes",
		authRequired: false
	})
	.when("/box/:user_id/:recipe_id",{
		templateUrl: 'views/boxes/box.html',
		controller: "Box",
		authRequired: false
	});
});