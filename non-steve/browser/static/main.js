/*jshint es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  var dbIp = "http://localhost:5984/commute-tracker";

  $(document).ready(function() {
    handlers();
  });  
  function handlers() {
    $('body').on('click', '#arriving', function(){
      post(0);
    });
    $('body').on('click', '#leaving', function(){
      post(1);
    });
  }
  function post(state) {
    var data = {};
    data.state = state;
    data.timestamp = new Date().getTime();
    $.ajax({
      type: 'POST',
      dataType: 'json',
      crossDomain: true,
      url: dbIp,
      data: data,
      success: function(result) {
        update(result);
      }
    });
  }
  function update(result) {
    console.log(result);
  }
}());
