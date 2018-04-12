$(document).ready(function () {
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