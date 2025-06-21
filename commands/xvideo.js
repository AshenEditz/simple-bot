const axios = require('axios');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (msg) => {
  const url = msg.body.split(' ')[1];
  if (!url) return msg.reply('❌ Provide an Xvideos URL: `.xvideo https://xvideos.com/...`');

  try {
    const res = await axios.get(`https://api.fgmods.xyz/api/downloader/xvideosdl?url=${url}&apikey=fg_tDfeTXU8`);
    if (!res.data.result || !res.data.result.url) return msg.reply('⚠️ Could not fetch the video.');

    msg.reply(`🔞 Downloading: ${res.data.result.title}`);
    const media = await MessageMedia.fromUrl(res.data.result.url);
    msg.reply(media);
  } catch (err) {
    msg.reply('❌ Error downloading Xvideo.');
  }
};