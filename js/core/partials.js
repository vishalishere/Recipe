// Custom directive for the partial of the box creation
MyRecipeBoxes.directive("createbox",function()
{
	return {
		restrict: "E",
		templateUrl: "views/boxes/create.html"
	};
});
