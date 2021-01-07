// Mi código JavaScript:

var app = new Vue({
    el: '#app',
    created: function () {
        this.obtenerCotizacion()
        this.obtenerMarcas()
        this.selectCurrency()
    },
    data: {
        cotizacion: '',
        marcas: [],
        modelos: [],
        autos: [],
        autos_actuales: [],
    },
    methods: {

        /*cambiarMoneda: function(){
            var monedaActual = dsadsa;

        },*/
        obtenerCotizacion: function () {
            const that = this

            $.ajax({
                method: 'GET',
                url: 'https://ha.edu.uy/api/rates',
                datatype: 'JSON',
                success: function (tipoCambio) {
                    that.cotizacion = tipoCambio.uyu;
                },
                error: function (xhr, status, e) {
                    alert(e);
                },

            });
        },

        obtenerMarcas: function () {
            const that = this

            $.ajax({
                method: 'GET',
                url: 'https://ha.edu.uy/api/brands',
                datatype: 'json',
                success: function (todasMarcas) {
                    that.marcas = todasMarcas;
                    console.log(todasMarcas);
                },
                error: function (xhr, status, e) {
                    alert(e);
                },

            });
        },
    },
});

$.ajax({
    method: 'GET',
    datatype: 'json',
    url: 'https://ha.edu.uy/api/cars',
    success: function (listaAutos) {
        app.autos = listaAutos;
    },
    error: function (xhr, status, e) {
        alert(e);
    },
});

$('#seleccionarMarca').on('change', function () {

    var marcaActual = $('#seleccionarMarca').val();


    $.ajax({
        method: 'GET',
        datatype: 'json',
        url: 'https://ha.edu.uy/api/models?brand=' + marcaActual,
        success: function (listaModelos) {
            app.modelos = listaModelos;
        },
        error: function (xhr, status, e) {
            alert(e);
        },
    });


});

$('#btn-filtrar').on('click', function () {
    var marcaActual = $('#seleccionarMarca').val();
    console.log(marcaActual);
    var anioAuto = $('#seleccionarAnio').val();
    console.log(anioAuto);
    var modeloActual = $('#seleccionarModelo').val();
    console.log(modeloActual);
    $.ajax({
        method: 'GET',
        datatype: 'json',
        url: 'https://ha.edu.uy/api/cars?year=' + anioAuto + '&brand=' + marcaActual + '&model=' + modeloActual,
        success: function (autoElegido) {
            app.autos_actuales = autoElegido;
            console.log(autoElegido);
            if (autoElegido.length == 0) {
                alert("No se encontro ningún auto con los requisitos seleccionados.");
            }
        },
        error: function (xhr, status, e) {
            alert(e);
        },
    });
});

