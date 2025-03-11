const dgram = require('dgram');
const axios = require('axios');

// Define the UDP ports and corresponding re-transmission ports
const udpPorts = [23101, 23102, 23103, 23104, 23105, 23106, 23107, 23108, 23109, 23110];
const retransmissionPorts = [21101, 21102, 21103, 21104, 21105, 21106, 21107, 21108, 21109, 21110];
const retransmissionIP = '192.168.1.44'; // Define the IP address for re-transmission

// Define the trigger strings and corresponding HTTP requests
const triggerStrings = {
  23101: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "LJ1Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "LJ1Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22101
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22101
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22101
      }
  ],
  23102: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "LJ2Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "LJ2Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22102
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22102
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22102
      }
  ],
  23103: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "PV1Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "PV1Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22103
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22103
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22103
      }
  ],
  23104: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "PV2Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "PV2Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22104
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22104
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22104
      }
  ],
  23105: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "SP1Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "SP1Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22105
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22105
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22105
      }
  ],
  23106: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "SP2Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "SP2Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22106
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22106
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22106
      }
  ],
  23107: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "HJ1Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "HJ1Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22107
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22107
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22107
      }
  ],
  23108: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "HJ2Cover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "HJ2Cover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22108
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22108
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22108
      }
  ],
  23109: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "Jav-DiscCover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "Jav-DiscCover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22109
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22109
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22109
      }
  ],
  23110: [
    {
      trigger: Buffer.from([0x03]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ({
        "action": "finish_motions",
        "motions": "HTCover"
      })
    },
    {
      trigger: Buffer.from([0x01]),
      url: 'http://192.168.1.44:5201',
      jsonData: (extractedString) => ([
        { "action": "play_motions", "motions": "HTCover" }
      ])
    },
    {
      trigger: Buffer.from('1:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22110
    },
    {
      trigger: Buffer.from('2:'),
      url: '',
      jsonData: null,
      secondRetransmitPort: 22110
    },
    {
        trigger: Buffer.from('T:'),
        url: '',
        jsonData: null,
        secondRetransmitPort: 22110
      }
  ],
  // ... Define trigger strings for other ports
};

// Create UDP sockets for receiving and sending data
const udpSockets = [];
udpPorts.forEach((port, index) => {
  const udpSocket = dgram.createSocket('udp4');
  udpSocket.on('message', async (message, remote) => {
    const triggerStringDetails = triggerStrings[port];
    if (triggerStringDetails) {
      for (const triggerDetail of triggerStringDetails) {
        const trigger = triggerDetail.trigger;
        const triggerIndex = message.indexOf(trigger);
        if (triggerIndex !== -1) {
          const carriageReturnIndex = message.indexOf('\r\n', triggerIndex);
          if (carriageReturnIndex !== -1) {
            const extractedString = message.slice(triggerIndex + trigger.length, carriageReturnIndex);

            let jsonData;
            if (typeof triggerDetail.jsonData === 'function') {
              jsonData = triggerDetail.jsonData(extractedString);
            } else {
              jsonData = triggerDetail.jsonData;
            }

            if (triggerDetail.url) {
              await sendHTTPRequest(triggerDetail.url, jsonData);
            }

            // Retransmit the message without the trigger string section
            const retransmissionPort = retransmissionPorts[index];
            const retransmittedMessage = removeTriggerSection(message, triggerStringDetails);
            sendUDPMessage(retransmittedMessage, retransmissionPort, retransmissionIP);
            //duplicate the messages if it's LJ for the rulers
            if (retransmissionPort === 21101) {
              sendUDPMessage(retransmittedMessage, 41101, retransmissionIP);
            }
            if (retransmissionPort === 21102) {
              sendUDPMessage(retransmittedMessage, 41102, retransmissionIP);
            }

            if (triggerDetail.secondRetransmitPort) {
                const extractedData = Buffer.from(extractedString);
                let additionalInfo;
                if (triggerDetail.trigger.equals(Buffer.from('1:'))) {
                  additionalInfo = 'Line1=';
                } else if (triggerDetail.trigger.equals(Buffer.from('2:'))) {
                  additionalInfo = 'Line2=';
                } else if (triggerDetail.trigger.equals(Buffer.from('T:'))) {
                  additionalInfo = 'Title=';
                } else {
                  additionalInfo = ''; // Set default additionalInfo if trigger doesn't match
                }
                const newData = Buffer.concat([Buffer.from(additionalInfo), extractedData, Buffer.from('\n')]);
                sendUDPMessage(newData, triggerDetail.secondRetransmitPort, retransmissionIP, 'utf-8');
              }
              
          }
        }
      }
    }
  });
  udpSocket.bind(port);
  udpSockets.push(udpSocket);
});

// Function to send an HTTP request
async function sendHTTPRequest(url, jsonData) {
  try {
    const response = await axios.post(url, jsonData);
    console.log('HTTP request sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending HTTP request:', error.message);
  }
}

// Function to send a UDP message
function sendUDPMessage(message, port, ip, encoding = 'utf-8') {
  const udpClient = dgram.createSocket('udp4');
  udpClient.send(message, 0, message.length, port, ip, (error) => {
    if (error) {
      console.error('Error sending UDP message:', error);
    } else {
      console.log('UDP message sent on port', port, 'to', ip);
    }
    udpClient.close();
  });
}

// Function to remove the trigger string section from the message
function removeTriggerSection(message, triggerStringDetails) {
  let retransmittedMessage = Buffer.from(message);
  for (const triggerDetail of triggerStringDetails) {
    if (triggerDetail.trigger && retransmittedMessage.includes(triggerDetail.trigger)) {
      const trigger = triggerDetail.trigger;
      const triggerIndex = retransmittedMessage.indexOf(trigger);
      const carriageReturnIndex = retransmittedMessage.indexOf('\r\n', triggerIndex);
      retransmittedMessage = Buffer.concat([
        retransmittedMessage.slice(0, triggerIndex),
        retransmittedMessage.slice(carriageReturnIndex + 2)
      ]);
    }
  }
  return retransmittedMessage;
}
