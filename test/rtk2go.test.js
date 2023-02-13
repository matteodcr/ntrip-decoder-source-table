import net from "net";
import {NtripDecoder} from "../index";

const decoder = new NtripDecoder();

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
  const mountpoint = 'TEST';
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
  console.log(data.toString())
  decoder.decode(data);
});


client.on('error', (err) => {
  console.log('socket error', err);
});

client.on('close', () => {
  console.log('socket close');
});
