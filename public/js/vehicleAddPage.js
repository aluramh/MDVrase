$(function () {
    //$(".datefield2").datepicker($.datepicker.regional['es']);
    $('.esDatePicker').datepicker({
        language: 'es',
        format: 'dd/MM/yyyy',
        autoclose: true
    });

    // Customize MomentJS to use spanish date format
    moment.locale('es-mx');

    $('#carForm').submit(function () {
        $('.esDatePicker > input').each(function () {
            var element = $(this);
            //Parse date in MySQL format
            var newDate = moment(element.val(), 'DD/MMMM/YYYY').format();
            //Replace it
            element.val(newDate);
        });
        //Continue with form submission
        return true;
    });
});