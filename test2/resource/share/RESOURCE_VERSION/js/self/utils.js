;(function () {
   window.otUtils = {
     handleActive: function(that,index){
       if (that.cur === index) {
         that.cur = ''
       } else {
         that.cur = index
       }
     }
   }
}());
