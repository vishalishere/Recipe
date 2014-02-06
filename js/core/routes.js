// All of the routes for the application
MyRecipeBoxes.config(['$routeProvider','$authProvider',function($routeProvider,$authProvider)
{

	// $authProvider checks for the user authenitcation before loading the route
	// authRequired is for if the user must be logged in to go to route

	$routeProvider

	// home page/list of all the recipe boxes
	.when("/",{
		templateUrl: 'views/boxes/list.html',
		controller: "Boxes",
		resolve: $authProvider.resolve,
		authRequired: true
	})

	// signup Page
	.when("/signup",{
		templateUrl: 'views/home.html',
		controller: "User",
		resolve: $authProvider.resolve,
		authRequired: false
	})

	// login Page
	.when("/login",{
		templateUrl: 'views/login.html',
		controller: "User",
		resolve: $authProvider.resolve,
		authRequired: false
	})

	// detail page of one box
	.when("/boxes/:box_id",{
		templateUrl: 'views/boxes/box.html',
		controller: "Recipes",
		resolve: $authProvider.resolve,
		authRequired: true
	})

	// create a new recipe
	.when("/boxes/:box_id/recipes/create",{
		templateUrl: 'views/recipes/create.html',
		controller: 'Recipes',
		resolve: $authProvider.resolve,
		authRequired: true
	})

	// detail page of recipe
	.when("/boxes/:box_id/recipes/:recipe_id",{
		templateUrl: 'views/recipes/get.html',
		controller: 'Recipes',
		resolve: $authProvider.resolve,
		authRequired: true
	})

	// edit/fork of a recipe
	.when("/boxes/:box_id/recipes/:recipe_id/:type",{
		templateUrl: 'views/recipes/create.html',
		controller: 'Recipes',
		resolve: $authProvider.resolve,
		authRequired: true
	});

}]);