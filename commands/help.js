const path = require('path');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = async (msg) => {
  try {
    const img = MessageMedia.fromFilePath(path.join(__dirname, '..', 'media', 'menu.jpg'));

    const menuText = `
🌟 *Bot Command Menu* 🌟

📋 *General Commands*
- ✅ .alive → Check if bot is working
- 👤 .owner → Show owner details
- 🆘 .menu or .help → Show this menu

🎥 *Downloads*
- ▶️ .video [YouTube URL] → Download YouTube videos
- 🔞 .xvideo [Xvideos URL] → Download adult videos

🔧 *More Features*
- ❤️ Auto emoji reacts
- 👁️ Auto views all statuses
- 🧠 AI-based replies (Coming soon)

📌 Tip: Type a command like `.video https://youtu.be/xyz` to use it.
`;

    await msg.reply(img, undefined, { caption: menuText });
  } catch (err) {
    await msg.reply('⚠️ Failed to send menu image. Make sure `media/menu.jpg` exists.');
  }
};