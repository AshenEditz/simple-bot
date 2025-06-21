const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (msg) => {
  const url = msg.body.split(' ')[1];
  if (!url) return msg.reply('❌ Provide a YouTube URL: `.video https://youtu.be/xyz`');

  try {
    const res = await axios.get(`https://api.fgmods.xyz/api/downloader/ytmp4?url=${url}&apikey=fg_tDfeTXU8`);
    if (!res.data.result) return msg.reply('⚠️ Could not download the video.');

    msg.reply(`📥 Downloading: ${res.data.result.title}`);
    const media = await MessageMedia.fromUrl(res.data.result.url);
    msg.reply(media);
  } catch (err) {
    msg.reply('❌ Error downloading YouTube video.');
  }
};