
var socket = io();

var params = new URLSearchParams( window.location.search );

if( !params.has('nombre') || !params.has('sala') ) {
    window.location = 'index.html'
    throw new Error('El nombre es necesario')
}


var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('entrar-chat', usuario, function( resp ){
        console.log('Usuarios conectados ', resp);
    })
});

// escuchar
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('crear-mensaje', function(mensaje) {
    console.log('Servidor:', mensaje);
});


// Escuchar cambios de usuarios
// Cuando un uusario sale o entre
socket.on('lista-personas', function(personas) {
    console.log (personas);
});

// mensajes privados

socket.on('mensaje-privado', function(mensaje) {
    console.log('Mensaje privado: ', mensaje);
})

