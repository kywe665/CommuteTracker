/*jshint es5:true laxcomma:true laxbreak:true immed:true latedef:true*/
(function () {
  var couchIp = "http://50.135.7.188:23987"
    , couchTripView = couchIp + "/commute-tracker/_design/byTrip/_view/byTrip?group=true"
    ;
  var xmlHttp = new XMLHttpRequest();
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
  }

  function getTrips(user) {
    console.log(couchTripView);
    $.get(couchTripView, function(response) {
        console.log(JSON.parse(response));
        tripIsActive(JSON.parse(response));
        calculateAndGraph(JSON.parse(response));
    });
  }
  function tripIsActive() {
    //check if a trip is in progress
    var now = new Date().getTime();
    setTripId(now);//TODO send timestamp
  }
  function setTripId(timestamp) {
    $('#trip-id').html('Your current trip ID is: ' + humanReadId(timestamp));
    $('#trip-id').attr('data-id', timestamp);
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

  function post(path) {
    var data = {};
    $.ajax({
      type: 'GET',
      url: path +'?id='+ $('#trip-id').attr('data-id'),
      success: function(result) {
        update(result);
      }
    });
  }
  function update(result) {
    //TODO tell user if succesful and update UI
    console.log(result);
  }

  function calculateAndGraph(data) {
    //TODO make sense of the data
  }
}());
