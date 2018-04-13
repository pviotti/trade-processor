$(document).ready(function () {


    // XXX filling the submit form for debugging purposes
    $("#userId").val(Math.random().toString(36).substring(7));
    $("#amountBuy").val((Math.random() * 10).toFixed(2));
    $("#amountSell").val((Math.random() * 10).toFixed(2));
    $("#rate").val((Math.random() * 10).toFixed(2));
    var options = $("#currencyFrom > option");
    options[Math.floor(Math.random() * options.length)].selected = true;
    options = $("#currencyTo > option");
    options[Math.floor(Math.random() * options.length)].selected = true;
    options = $("#originatingCountry > option");
    options[Math.floor(Math.random() * options.length)].selected = true;


    $("#submit").on('click', function () {
        //alert("sending " + $("#form").serialize());
        $.ajax({
            url: '/txn',
            type: "POST",
            dataType: 'json',
            data: $("#form").serialize(),
            success: function (result) {
                $("#alert-succ").removeClass("d-none");
            },
            error: function (xhr, resp, text) {
                $("#alert-err").removeClass("d-none");
                console.log(xhr, resp, text);
            }
        })
    });
});