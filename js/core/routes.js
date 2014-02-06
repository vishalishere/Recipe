MyRecipeBoxes.config(['$routeProvider','$authProvider',function($routeProvider,$authProvider)
{

	$routeProvider
	.when("/",{
		templateUrl: 'views/boxes/list.html',
		controller: "Boxes",
		resolve: $authProvider.resolve,
		authRequired: true
	})
	.when("/signup",{
		templateUrl: 'views/home.html',
		controller: "User",
		resolve: $authProvider.resolve,
		authRequired: false
	})
	.when("/login",{
		templateUrl: 'views/login.html',
		controller: "User",
		resolve: $authProvider.resolve,
		authRequired: false
	})
	.when("/boxes/:box_id",{
		templateUrl: 'views/boxes/box.html',
		controller: "Recipes",
		resolve: $authProvider.resolve,
		authRequired: true
	})
	.when("/boxes/:box_id/recipes/create",{
		templateUrl: 'views/recipes/create.html',
		controller: 'Recipes',
		resolve: $authProvider.resolve,
		authRequired: true
	})
	.when("/boxes/:box_id/recipes/:recipe_id",{
		templateUrl: 'views/recipes/get.html',
		controller: 'Recipes',
		resolve: $authProvider.resolve,
		authRequired: true
	})
	.when("/boxes/:box_id/recipes/:recipe_id/:type",{
		templateUrl: 'views/recipes/create.html',
		controller: 'Recipes',
		resolve: $authProvider.resolve,
		authRequired: true
	});

}]);