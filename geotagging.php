<?php include 'partials/header.php'; ?>

  <div class="right_col" role="main">
    <div class="">
      <div class="page-title">
        <div class="title_left">

          <h3>Geolocation</h3><i class="fa fa-map-marker pull-right"></i>
          
        </div>

      </div>

      <div class="clearfix"></div>

      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <div class="x_panel"

            <div class="x_title">
              <h2>Geotagging</h2>
              <span class="fa fa-map-marker form-control-feedback right"></span>
              <div class="clearfix"></div>
            </div>


            <div class="x_content">
            	<form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">
            		<div class="col-md-12 col-sm-12 col-xs-12">
            			<div class="input-group">
                            <input type="textbox" id="address" class="form-control" placeholder="Enter Location/Address">
                            <span class="input-group-btn">
                              <button type="button" class="btn btn-round btn-info" id="submit" value="Geocode">Get Geocode <i class="fa fa-map-marker"></i></button>
                            </span>
                          </div>
            		</div>
            	</form>
              
           		<form id="demo-form2" data-parsley-validate class="form-horizontal form-label-left">

		            <div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
		            	<label>Longitude:</label>
		                        <input type="text" id="lng" class="form-control" id="inputSuccess3" placeholder="Coordination">
		                        <span class="fa fa-map-marker form-control-feedback right" aria-hidden="true"></span>
		            </div>
		           	<div class="col-md-4 col-sm-4 col-xs-12 form-group has-feedback">
		            	<label>Latitude:</label>
		                        <input type="text" id="lat" class="form-control" id="inputSuccess3" placeholder="Coordination">
		                        <span class="fa fa-map-marker form-control-feedback right" aria-hidden="true"></span>
		            </div>

           		</form>

            	<div class="col-md-12 col-sm-12 col-xs-12">
            		<div id="map" style="width:100%;height:400px;"></div>
            	</div>

  		</div>
       </div>
       </div>
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
<?php include './partials/footer.php' ?>