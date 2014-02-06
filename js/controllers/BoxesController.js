// Controller for the box listing page
MyRecipeBoxes.controller("Boxes",[
	'FIREBASE_URL',
	'$scope',
	'$firebase',
	'$rootScope',
	function(FIREBASE_URL,$scope,$firebase,$rootScope)
	{
		// the firebase for the boxes
		var boxes_ref = new Firebase(FIREBASE_URL+"boxes");

		// set up the box model
		$scope.newbox = {privacy: "public"};

		// on create box form submit
		$scope.create_box = function()
		{
			// add the box to the boxes
			$scope.boxes.$add({
				title: $scope.newbox.title,
				privacy: $scope.newbox.privacy,
				user_id: $rootScope.user.uid,
				$priority: $rootScope.user.uid,
				recipes: []
			});

			// reset the box model
			$scope.newbox = {privacy: "public"};

		};

		// on tab click
		$scope.switch_filter = function(type)
		{

			// if only viewing the user's boxes
			if(type === 'user' && $rootScope.user)
			{
				// set up the info for the view
				$scope.my_boxes = true;
				$scope.box_filter = "";

				// get boxes with the priority of the current user
				$scope.boxes = $firebase(boxes_ref.startAt($rootScope.user.uid).endAt($rootScope.user.uid));

			}
			// if looking at all the public boxes
			else if(type === 'public' && $rootScope.user)
			{
				// set up the info for the view
				$scope.my_boxes = false;
				$scope.box_filter = {privacy:"public"};

				// get all the boxes
				$scope.boxes = $firebase(boxes_ref);

			}

		};

		// initialize with the user boxes

		$scope.switch_filter('user');

	}]);