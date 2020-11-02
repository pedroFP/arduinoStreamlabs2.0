// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')

const io = require('socket.io-client');

const tableify = require('tableify')

const $ = require('jquery');

var myArduino = null;

var streamlabs = null;

serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    document.getElementById('error').textContent = err.message
    return
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
  }

  tableHTML = tableify(ports, {'class': 'table'})
  document.getElementById('ports').innerHTML = tableHTML
})

// CONNECT ARDUINO WHEN CLICKING THE BUTTON
$(document).on('click', '#connect-arduino', function(event) {
  event.preventDefault();

  // CONNECT ARDUINO
  portName = $('#com-port').val();
  myArduino = new serialport(portName,{
    baudRate:9600,
    parser: new serialport.parsers.Readline("\r\n")
  })
  
  myArduino.on('error', ()=> {
    alert('Error, may be the port does not exists');
  });

  myArduino.on('open', ()=> {
    $('#connect-arduino').html('DISCONNECT');
    $('#connect-arduino').attr('id', 'disconnect-arduino');
    $('#com-port').hide();
    alert('CONNECTED SUCCESSFULLY');
    setTimeout(function(){
      myArduino.write('CONNECTED SUCCESSFULLY');
    }, 1000)
  });

  $('#com-port').val('');
})

// DISCONNECT ARDUINO
$(document).on('click', '#disconnect-arduino', function(event) {
  event.preventDefault();

  myArduino.close(function (err) {
    $('#disconnect-arduino').html('CONECT')
    $('#disconnect-arduino').attr('id', 'connect-arduino');
    $('#com-port').show();
    alert('Closing Arduino connection');
  });
})

// SEND MESSAGE TO ARDUINO
function arduMessage(message){
  myArduino.write(`${message} `);
}


$(document).ready(function() {

  $(document).on('click', '#connect-streamlabs', function(event) { 
    event.preventDefault();

    // SETUP WEBSOCKET CONNECTION WITH STREAMLABS API
    streamlabsToken = $('#streamlabs-token').val();
    streamlabs = io(`https://sockets.streamlabs.com?token=${streamlabsToken}`, {transports: ['websocket']});

    streamlabs.on('connect', () => {
      alert('Conectado con streamlabs');
      $('#connect-streamlabs').html('CONECTADO')
    });

    // Send data when streamlab's webhook is triggered
    streamlabs.on('event', (eventData) => {

      var message = eventData.message[0]

      if (eventData.type === 'donation') {
        name = message.from;
        amount = message.amount;
        data = `${name}: $${amount}`
        arduMessage(data);
      }
      if (eventData.for === 'twitch_account') {
        switch(eventData.type) {
          case 'follow':
            data = `FOLLOW: ${message.name}`
            arduMessage(data);
            break;
          case 'subscription':
            data = `SUB: ${message.name}`
            arduMessage(data);
            break;
          case 'bits':
            data = `BITS: ${message.name}, ${message.amount}`
            arduMessage(data);
            break;
          default:
            console.log(message);
        }
      }
    });
  })

});