const os = require('os');
const { performance } = require('perf_hooks');

module.exports = async (msg) => {
  const start = performance.now();
  const sent = await msg.reply('🏓 Pinging...');
  const end = performance.now();

  const latency = Math.round(end - start);
  const uptime = formatUptime(process.uptime());
  const time = new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' });

  await sent.reply(
    `🏓 *Ping Report*\n\n` +
    `⚡ Latency: ${latency} ms\n` +
    `⏱️ Uptime: ${uptime}\n` +
    `🕒 Time: ${time}`
  );
};

function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}