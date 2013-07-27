var MyRecipeBoxes = angular.module("MyRecipeBoxes", ["firebase",function($locationProvider)
{
	//$locationProvider.html5Mode(true).hashPrefix('!');

}]);

MyRecipeBoxes.run(['angularFireAuth',function(angularFireAuth)
{
	var url = "https://myrecipeboxes.firebaseio.com/";
	angularFireAuth.initialize(url,{'name':'user','path':'/'});
}]);
