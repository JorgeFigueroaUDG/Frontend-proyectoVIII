$(window).on("load", function(){
    const url = 'https://mcuapi.herokuapp.com/api/v1/movies';
        fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            var DatosJson = JSON.parse(JSON.stringify(data));
            var data = DatosJson.data;
        $("#Table2").append('<tr><td>Titulo</td>'+
          '<td>Descripción</td>' +
          '<td>Director</td>' + 
          '<td>Saga</td>' +
          '<td>Escenas postcredito</td>' +
          '<td>Imagen de pelicula</td>' + 
          '<td>Fecha de estreno</td>');
          console.log(data[0]);
          for (i = 0; i < data.length; i++){
            $("#Table2").append('<tr>' + 
            '<td align="center" style="dislay: none;">' + data[i].title + '</td>'+
            '<td align="center" style="dislay: none;">' + data[i].overview + '</td>'+
            '<td align="center" style="dislay: none;">' + data[i].directed_by + '</td>'+
            '<td align="center" style="dislay: none;">' + data[i].saga + '</td>'+
            '<td align="center" style="dislay: none;">' + data[i].post_credit_scenes + '</td>'+
            '<td align="center" style="dislay: none;"><img src="'+ data[i].cover_url +'" width="100" height="200"></td>'+
            '<td align="center" style="dislay: none;">' + data[i].release_date + '</td>'+'</tr>');
          }

        })
    .catch(function(error) {
        console.log(error);
        });
  });