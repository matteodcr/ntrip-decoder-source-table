# ntrip-decoder
This project is a fork of https://github.com/dxhbiz/ntrip-client.
I added a sourcetable decoder to eventually list all the mountpoints.
# demo
```
const net = require('net');
const { NtripDecoder } = require('../index');
const config = require("../lib/config");

const decoder = new NtripDecoder();

decoder.on('data', (data) => {
  // console.log('decoded', data);
});
decoder.on('error', (err) => {
  console.log('deoced error', err);
});
decoder.on('close', () => {
  console.log('decoded close');
});

const client = net.createConnection({
  host: 'caster.centipede.fr',
  port: 2101
});

client.on('connect', () => {
  const mountpoint = 'TEST'; // DOES NOT EXIST - FOR SOURCETABLE
  const userAgent = 'NTRIP ntrip-decoder-test/1.0.0';
  const username = 'centipede';
  const password = 'centipede';
  const authorization = Buffer.from(username + ':' + password, 'utf8').toString(
    'base64'
  );
  const data = `GET /${mountpoint} HTTP/1.1\r\nUser-Agent: ${userAgent}\r\nAuthorization: Basic ${authorization}\r\n\r\n`;
  client.write(data);
});

client.on('data', (data) => {
    console.log(data)
    decoder.decode(data);
});


client.on('error', (err) => {
  console.log('socket error', err);
});

client.on('close', () => {
  console.log('socket close');
});


```