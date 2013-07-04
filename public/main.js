/*jshint es5:true laxcomma:true laxbreak:true immed:true latedef:true*/
(function () {
  var couchIp = "http://50.135.7.188:23987"
    , couchTripView = couchIp + "/commute-tracker/_design/byTrip/_view/byTrip?group=true"
    ;
  var xmlHttp = new XMLHttpRequest();
  $(document).ready(function() {
    handlers();
    getTripId();
  });  
  function handlers() {
    $('body').on('click', '#leaving', function(){
      //tripIsActive();
      post('/left');
    });
    $('body').on('click', '#arriving', function(){
      post('/arrived');
    });
  }

  function getTripId() {
    var timestamp = new Date().getTime()
      , activeTrip = tripIsActive()
      ;
    /*if(activeTrip) {
      timestamp = activeTrip;
    }*/
    setTripId(timestamp);
  }

  function tripIsActive() {
    console.log(couchTripView);

    /*if (xmlHttp)
    {
      // try to connect to the server
      try
      {
        // initiate server request
        xmlHttp.open("GET", couchTripView, true);
        xmlHttp.onreadystatechange = handleRequestStateChange;
        xmlHttp.send(null);
      }
      // display an error in case of failure
      catch (e)
      {
        alert("Can't connect to server:\n" + e.toString());
      }
    }*/


    /*var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(xhr.readyState);
        if (xhr.readyState == 4) {
            alert('ready');
            console.log(xhr);
        }
    };
    xhr.open('GET', couchTripView, true);
    xhr.send(null);*/

    $.get(couchTripView, function(response) {
        console.log(response);
    });

    /*$.ajax({
      type: 'GET',
      url: couchTripView,
      contentType: 'application/json',
      success: function(result) {
        console.log('yay');
        console.log(result);
      }
    });*/
  }

  function handleRequestStateChange () 
    {
      console.log(xmlHttp.readyState);
      console.log(xmlHttp.toString());
      // continue if the process is completed
      if (xmlHttp.readyState == 4) 
      {
        // continue only if HTTP status is "OK"
        if (xmlHttp.status == 200) 
        {
          try
          {
            // retrieve the response
            response = xmlHttp.responseText;
            console.log('THIS IS THE RESPONSE');
            console.log(response);
          }
          catch(e)
          {
            // display error message
            alert("Error reading the response: " + e.toString());
          }
        } 
        else
        {
          // display status message
          alert("There was a problem retrieving the data:\n" + 
                xmlHttp.statusText);
        }
      }
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
    console.log(result);
  }
}());
