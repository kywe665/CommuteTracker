/*jshint es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  $(document).ready(function() {
    handlers();
  });  
  function handlers() {
    $('body').on('click', '#arriving', function(){
      arrived();
    });
    $('body').on('click', '#leaving', function(){
      left();
    });
  }
  function arrived() {
    
  }
  function left() {
    
  }
}());
