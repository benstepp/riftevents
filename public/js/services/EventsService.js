angular.module('EventsService',[]).service('EventsService',['$http', '$q', function($http, $q){

	var EventsService = {};
	EventsService.zoneEvents = {};

	EventsService.getEvents = function(reg) {
		//if region is specified change the url
		var url = '/api/riftevents/';
		if (reg !== undefined) {
			url = '/api/riftevents/'+ reg;
		}

		var deferred = $q.defer();
		$http.get(url).success(
			function(res) {
				if (reg !== undefined) {
					EventsService.zoneEvents[reg] = res;
				}
				else {
					EventsService.zoneEvents = res;
				}
				deferred.resolve(EventsService.zoneEvents);
			});
		return deferred.promise;
	};

	EventsService.checkUpdated = function() {
		var url = '/api/riftevents/lastUpdated';
			var deferred = $q.defer();
				$http.get(url).success(
					function(res) {
						//check old lastupdated with new one
						if (res.message !== EventsService.zoneEvents.lastUpdated) {
							deferred.resolve(true);
						}
						else {
							deferred.resolve(false);
						}
					});
				return deferred.promise;
	};


	return EventsService;
}]);