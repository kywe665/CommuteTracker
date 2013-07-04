/*jshint es5:true laxcomma:true laxbreak:true immed:true latedef:true*/
(function () {
  var dbIp = "http://localhost:5984/commute-tracker";

  $(document).ready(function() {
    handlers();
  });  
  function handlers() {
    $('body').on('click', '#leaving', function(){
      post(0);
    });
    $('body').on('click', '#arriving', function(){
      post(1);
    });
  }

  /*function post (state) {
    var http = new XMLHttpRequest();
    var data = {};
    data.state = state;
    data.timestamp = new Date().getTime();
    params = JSON.stringify(data);
    http.open("POST", dbIp, true);

    //Send the proper header information along with the request
    http.setRequestHeader("content-type", "application/json");
    http.setRequestHeader("content-length", params.length);
    http.setRequestHeader("connection", "close");

    http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
      }
    };
    http.send(params);
  }*/
  
  function post(state) {
    var data = {};
    jQuery.support.cors = true;
    data.state = state;
    data.timestamp = new Date().getTime();
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      url: dbIp,
      data: JSON.stringify(data),
      success: function(result) {
        update(result);
      }
    });
  }
  function update(result) {
    console.log(result);
  }
}());
