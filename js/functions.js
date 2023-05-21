var isLogin = false

function getToken() {
  var url = 'http://localhost:8080/api/signup?';
  let user = sessionStorage.getItem("email");
  let pass = sessionStorage.getItem("password");
  url = url + 'username=' + user + '&password=' + pass;
  fetch(url, {
    method: 'POST'
  })
      .then((resp) => resp.json())
      .then(function(data) {
        var DatosJson = JSON.parse(JSON.stringify(data));
        sessionStorage.setItem("token", DatosJson.token);
      })
      .catch(function(error) {
        console.log(error);
      });
}

function getAllInformation() {
    const url = 'http://localhost:8080/movies';
    let token = sessionStorage.getItem("token");
    console.log(token);
      fetch(url, {
        headers: {
            'access-token' : token,
        }
      })
      .then((resp) => resp.json())
      .then(function(data) {
        var DatosJson = JSON.parse(JSON.stringify(data));
        let tableBody = document.getElementById('tbody');
        $('#Table1 > tbody').empty();  
          for (i = 0; i < DatosJson.length; i++){

            $("#Table1").append('<tr>' + 
            '<td align="center" style="dislay: none;">' + DatosJson[i].titulo + '</td>'+
            '<td align="center" style="dislay: none;">' + DatosJson[i].year + '</td>'+
            '<td align="center" style="dislay: none;">' + DatosJson[i].sinopsis + '</td>'+
            '<td align="center" style="dislay: none;">' + DatosJson[i].autor + '</td>'+
            '<td align="center" style="dislay: none;">' + DatosJson[i].url + '</td>'+'</tr>');
          }

      })
      .catch(function(error) {
        console.log(error);
      });
}

$(document).ready(function(){
       $('#btnMovieRegister').click(function(){
        var url = 'http://localhost:8080/moviesAdd?';
    let titulo = document.getElementById("title").value; 
    let year = document.getElementById("year").value; 
    let sinopsis = document.getElementById("comment").value; 
    let autor = document.getElementById("autor").value; 
    let urlMovie = document.getElementById("url").value; 
    let token = sessionStorage.getItem("token");
    url = url + 'titulo=' + titulo + '&' + 'year=' + year + '&' + 'sinopsis=' + sinopsis + '&' + 'autor=' + autor + '&' + 'url=' + urlMovie
      fetch(url, {
        method: 'POST',
        headers: {
            'access-token' : token,
        },
      })
      .then((resp) => {
        getAllInformation();
      })
      .catch(function(error) {
        console.log(error);
      });
    });
});

$(document).ready(function(){
  var url = 'http://localhost:8080/deleteMovie?';
  $('#btnDeleteMovie').click(function(){  
    let titulo = document.getElementById("titleDelete").value; 
    let token = sessionStorage.getItem("token");
    url = url + 'titulo=' + titulo
      fetch(url, {
        method: 'DELETE',
        headers: {
            'access-token' : token,
        },
      })
      .then((resp) => {
        getAllInformation();
      })
      
      .catch(function(error) {
        console.log(error);
        alert('Error al borrar pelicula');
      });
  });
});

$(document).ready(function(){
    $('#btnRegister').click(function(){
     const url = 'http://localhost:8080/users';
     let emailText = document.getElementById("email").value;
     let passwordText = document.getElementById("password").value;  
   fetch(url)
   .then((resp) => resp.json())
   .then(function(data) {
     var DatosJson = JSON.parse(JSON.stringify(data));
       for (i = 0; i < DatosJson.length; i++){
         if(DatosJson[i].user == emailText && DatosJson[i].password == passwordText) {
            sessionStorage.setItem("email", emailText);
            sessionStorage.setItem("password", passwordText);
            getToken();
            isLogin = true;
             location.href ='inicio.html';
             return;
         }
         alert('Credenciales incorrectas o verifica tu conexión a internet');
       }
   })
   .catch(function(error) {
    alert('Credenciales incorrectas o verifica tu conexión a internet');
     console.log(error);
   }); 
    });
 });

 $(window).on("load", function(){
    getAllInformation();
}); 