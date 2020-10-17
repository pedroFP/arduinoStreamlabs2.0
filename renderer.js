// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')

const io = require('socket.io-client');

const tableify = require('tableify')

const $ = require('jquery');

var myArduino = null;

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

  tableHTML = tableify(ports)
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
    $('#connect-arduino').html('DESCONECTAR');
    $('#connect-arduino').attr('id', 'disconnect-arduino');
    $('#com-port').hide();
    alert('CONECTED SUCCESSFULLY');
    setTimeout(function(){
      myArduino.write('CONECTED SUCCESSFULLY');
    }, 1000)
  });

  $('#com-port').val('');
})

// DISCONECT ARDUINO
$(document).on('click', '#disconnect-arduino', function(event) {
  event.preventDefault();
  myArduino.close(function (err) {
    $('#disconnect-arduino').html('CONECTAR')
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
  // SETUP WEBSOCKET CONNECTION WITH STREAMLABS API
  const streamlabs = io(`https://sockets.streamlabs.com?token=${process.env.STREAMLABS_SOCKET_TOKEN}`, {transports: ['websocket']});

  streamlabs.on('connect', () => {console.log('CONNECTION SUCCESS')});

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

});