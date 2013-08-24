var MyRecipeBoxes = angular.module("MyRecipeBoxes", ["firebase"]);

MyRecipeBoxes.run(['angularFireAuth',function(angularFireAuth)
{
	var url = "https://myrecipeboxes.firebaseio.com/";
	angularFireAuth.initialize(url,{'name':'user','path':'/'});
}]);

MyRecipeBoxes.constant("FIREBASE_URL","https://myrecipeboxes.firebaseio.com/");
