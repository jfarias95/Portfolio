$('#resultado').hide();

$('#btn-busqueda').on("click", function () {

    var titulo= $("#buscar-p").val();
    if(titulo == ""){
        alert("Por favor ingrese un título.")
    }else{
    $.ajax({
        method: "GET",
        url: 'http://private.omdbapi.com/?apikey=bef9c583&t='+ titulo,
        /*http://www.omdbapi.com/?i=tt3896198&apikey=a226fd5*/
        dataType: "json",
        success: function (data) {
            console.log(data)

            $('#resultado').fadeIn();
            $('#inicio').hide();
            $('#movie').text(data.Title);
            $('#year').text(data.Year)
            $('#rated').text(data.Rated)
            $('#released').text(data.Released)
            $('#runtime').text(data.Runtime)
            $('#genre').text(data.Genre)
            $('#poster').attr('src', data.Poster)

        },
        error: function (xhr, status, e) {
            alert(e)
        }
    });
    }


});