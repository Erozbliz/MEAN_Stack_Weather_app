//http://www.telegraphicsinc.com/2013/07/how-to-use-animate-css/
function animationClick(element, animation){
    element = $(element);
    element.click(
        function() {
            element.addClass('animated ' + animation);        
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
  
        });
}

function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);        
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);         
        });
}

$(document).ready(function(){
   
	$('#btnSearchAnimate').each(function() {
        animationClick(this, 'bounceIn');
    });
    $('#btnGpsAnimate').each(function() {
        animationClick(this, 'bounceIn');
    });
    $('.btnAnimate').each(function() {
        animationClick(this, 'bounceIn');
    }); 
});