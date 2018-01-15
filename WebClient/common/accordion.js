$(function () {
    var $accordion = $('#accordion');

    $accordion.find('.panel-heading').on('click', function () {
        $accordion.find('.panel-collapse.in').collapse('hide');
        $(this).siblings('.panel-collapse').collapse('toggle');
    });
});