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
	.when("/box/:user_id/:box_id",{
		templateUrl: 'views/boxes/box.html',
		controller: "Box",
		authRequired: false
	})
	.when("/recipe/:recipe_id",{
		templateUrl: 'views/recipes/get.html',
		controller: 'Recipe',
		authRequired: true
	})
	.when("/recipe/:recipe_id/edit",{
		templateUrl: 'views/recipes/create.html',
		controller: 'Recipe',
		authRequired: true
	})
	.when("/recipe/create/:user_id/:box_id/",{
		templateUrl: 'views/recipes/create.html',
		controller: 'Recipes',
		authRequired: true
	});
});