module.exports = (msg) => {
  const user = msg.author || msg.from;
  const body = msg.body?.substring(0, 100) || '';
  console.log(`[📥 ${new Date().toISOString()}] ${user}: ${body}`);
};