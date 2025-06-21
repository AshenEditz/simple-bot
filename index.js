const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const express = require('express');
const logger = require('./utils/logger');

const alive = require('./commands/alive');
const owner = require('./commands/owner');
const video = require('./commands/video');
const xvideo = require('./commands/xvideo');
const help = require('./commands/help');
const ping = require('./commands/ping');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true }
});

let botStatus = '🔄 Starting up...';

client.on('qr', qr => {
  qrcode.generate(qr, { small: true });
  botStatus = '🟡 Waiting for QR scan...';
});

client.on('ready', () => {
  console.log('✅ Bot is ready!');
  botStatus = '✅ Connected!';
});

client.on('message', async msg => {
  const text = msg.body?.toLowerCase() || '';

  logger(msg); // 📄 Log every message

  try {
    await msg.react('❤️');
  } catch (err) {}

  // Auto status viewer
  try {
    const chats = await client.getChats();
    for (let chat of chats) {
      if (chat.isStatus) {
        const messages = await chat.fetchMessages({ limit: 5 });
        for (let m of messages) {
          if (!m.isSeen) await m.downloadMedia();
        }
      }
    }
  } catch (err) {}

  // Commands
  if (text === '.alive') return alive(msg);
  if (text === '.owner') return owner(msg);
  if (text.startsWith('.video')) return video(msg);
  if (text.startsWith('.xvideo')) return xvideo(msg);
  if (text === '.menu' || text === '.help') return help(msg);
  if (text === '.ping') return ping(msg);   
});

// Express server to keep Replit awake
const app = express();
app.get('/', (req, res) => {
  res.send(`<h1>AshenBot</h1><p>Status: ${botStatus}</p>`);
});
app.listen(3000, () => console.log('🌍 Web server running on port 3000'));

client.initialize();