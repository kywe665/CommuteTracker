/*jshint es5:true laxcomma:true laxbreak:true immed:true latedef:true*/
(function () {
  var dbIp = "http://localhost:5984/commute-tracker";

  $(document).ready(function() {
    handlers();
    getTripId();
  });  
  function handlers() {
    $('body').on('click', '#leaving', function(){
      post('/left');
    });
    $('body').on('click', '#arriving', function(){
      post('/arrived');
    });
  }

  function getTripId() {
    var now = new Date()
      , nowArray = (' ' + now).replace(/:/g,'-').split(' ')
      , tripId = ''
      , i = 0
      ;
    for (i=0;i<5;i++) {
      tripId += nowArray[i];
    }
    tripId += '_' + nowArray[5];
    console.log(tripId);
    $('#trip-id').html('Your current trip ID is: ' + tripId);
    $('#trip-id').attr('data-id', now.getTime());
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
    console.log(result);
  }
}());
