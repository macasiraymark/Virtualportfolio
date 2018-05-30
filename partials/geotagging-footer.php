      <script>
	      var DA = {lat: 17.625832, lng: 121.71855900000003};
	       
	       
	      function initMap() {
	        var map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 11,
	          center: DA
	        });
	        // var marker1 = new google.maps.Marker({
	        //   position: DA,
	        //   map: map,
	        //   draggable: true
	        // });
	        var geocoder = new google.maps.Geocoder();

	        document.getElementById('submit').addEventListener('click', function() {
	        	 map.setZoom(15);
	          geocodeAddress(geocoder, map);
	        });
	      }
	      function geocodeAddress(geocoder, resultsMap) {
	        var address = document.getElementById('address').value;
	        geocoder.geocode({'address': address}, function(results, status) {
	          if (status === 'OK') {
	            resultsMap.setCenter(results[0].geometry.location);
	            var marker = new google.maps.Marker({
	              map: resultsMap,
	              position: results[0].geometry.location,
	              draggable:true
	            });
	            var infowindow = new google.maps.InfoWindow({
				    content: "Please drag this marker to your position.."
				  });
				  infowindow.open(resultsMap,marker);
	             document.getElementById('lat').value=marker.getPosition().lat();
	            document.getElementById('lng').value=marker.getPosition().lng();
	             marker.addListener('drag', handleEvent);
	    marker.addListener('dragend', handleEvent);
	          } else {
	            alert('Geocode was not successful for the following reason: ' + status);
	          }
	        });
	      }
	      function handleEvent(event) {
	    document.getElementById('lat').value = event.latLng.lat();
	    document.getElementById('lng').value = event.latLng.lng();
	}
    </script>
    <script async defer
 		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDEpnfzmfR-AfNolgCQ47az1sFSYO_9vw&callback=initMap">
    </script>
            </div>
          </div>
        </div>
  </div>