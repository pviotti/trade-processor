$(document).ready(function () {
    $("#submit").on('click', function () {
        alert("sending " + $("#form").serialize());
        $.ajax({
            url: '/txn',
            type: "POST",
            dataType: 'json',
            data: $("#form").serialize(),
            success: function (result) {
                alert(result);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });
});