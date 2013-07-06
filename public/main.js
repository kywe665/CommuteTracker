/*jshint es5:true laxcomma:true laxbreak:true immed:true latedef:true*/
(function () {
  var couchIp = "http://50.135.7.188:23987"
    , couchTripView = couchIp + "/commute-tracker/_design/byTrip/_view/byTrip"
    ;
  $(document).ready(function() {
    handlers();
    getTrips();//TODO pass user
  });  
  function handlers() {
    $('body').on('click', '#leaving', function(){
      post('/left');
    });
    $('body').on('click', '#arriving', function(){
      post('/arrived');
    });
    $('body').on('click', '#invalidate', function(){
      post('/arrived', true);
    });
  }

  function getTrips(user) {
    console.log(couchTripView);
    $.get(couchTripView, function(response) {
        var reducedData = reduceData(JSON.parse(response).rows);
        console.log(reducedData);
        tripIsActive(reducedData);
        calculateAndGraph(reducedData);
    });
  }
  function tripIsActive(data) {
    //check if a trip is in progress
    var now = new Date().getTime()
      , latest = 0
      , temp = 0
      ;
    Object.keys(data).forEach(function(trip) {
      if(data[trip].length === 1) {
        temp = parseInt(trip.split('-')[0], 10);
        if(temp > latest) {
          latest = temp;
        }
      }
    });
    if(latest > 0) {
      inATrip(latest);
    }
    else {
      //new trip
      setTripId(now);
    }
  }
  function setTripId(timestamp) {
    $('#trip-id').html('Your current trip ID is: ' + humanReadId(timestamp));
    $('#trip-id').attr('data-id', timestamp);
  }
  function inATrip(timestamp) {
    toggleHidden();
    setTripId(timestamp);
  }
  function toggleHidden() {
    console.log('toggled');
    $('.toggle-hidden').toggleClass('css-hidden');
  }
  function humanReadId(timestamp) {
    var newDate = new Date(timestamp)
      , nowArray = (' ' + newDate).replace(/:/g,'-').split(' ')
      , tripId = ''
      , i = 0
      ;
    for (i=0;i<5;i++) {
      tripId += nowArray[i];
    }
    tripId += '_' + nowArray[5];
    console.log(tripId);
    return tripId;
  }

  function post(path, invalid) {
    var url = path +'?id='+ $('#trip-id').attr('data-id');
    if(invalid) {
      console.log('sending invalid');
      url += '&invalid=true';
    }
    $.ajax({
      type: 'GET',
      url: url,
      success: function(result) {
        update(result, path);
      }
    });
  }
  function update(result, path) {
    //TODO tell user if succesful and update UI
    console.log(result); 
    if(result.success) {
      if(path === '/left'){
        toggleHidden();
      }
      else {
        getTrips();
        toggleHidden();
      }
    }
  }

  function calculateAndGraph(data) {
    //TODO make sense of the data
  }

  function reduceData(data) {
    var builder = {};
    data.forEach(function(trip) {
      if(builder[trip.key]) {
        builder[trip.key].push(trip.value);
      }
      else {
        builder[trip.key] = [trip.value];
      }
    });
    return builder;
  }
}());
