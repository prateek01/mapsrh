//Function to jump over the place that is mentioned in the City box
function geoLocation()
{
   var geocoder =  new google.maps.Geocoder();
   elem1 = document.getElementById('location');
   geocoder.geocode( { 'address': elem1.value.toString()}, function(results, status) 
   {	
          if (status == google.maps.GeocoderStatus.OK) 
          {
           		var options = {
		        				zoom: 12,
		      					center: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
		      					mapTypeId: google.maps.MapTypeId.ROADMAP
		      				  };

          		var map = new google.maps.Map(document.getElementById('map'), options);
              console.log(map.getBounds().toString(),'   getListings=',getListings);
              google.maps.event.addListener(map, 'idle', getListings);
          }
          else 
          {
          	alert("Check spelling of the place and enter again");
          } 
    });
}


