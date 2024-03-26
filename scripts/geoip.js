var instruction_pos = $('#instruction').offset().top - 150;
var addr = $('#addresses');

$(window).scroll(function() {
    var current_pos = $(this).scrollTop();
    if (current_pos > instruction_pos) {
        addr.show(600);
    } else {
        addr.hide(600);
    }
});

$(window).on('resize', function() {
    instruction_pos = $('#instruction').offset().top - 150; 
});