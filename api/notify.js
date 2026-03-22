// api/notify.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // Destructure location from the POST body
    const { location } = req.body;
    console.log("Location received:", location); // debug in Vercel logs

    // Use environment variables for security
    const BOT_TOKEN = process.env.BOT_TOKEN; // set this in Vercel
    const CHAT_ID = process.env.CHAT_ID;     // set this in Vercel

    const message = `🚨 Blockage detected at ${location}`;

    try {
      // Send Telegram message
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message })
      });

      // Respond with success
      res.status(200).json({ ok: true });
    } catch (err) {
      console.error("Telegram send error:", err);
      res.status(500).json({ ok: false, error: err.message });
    }

  } else {
    // Method not allowed
    res.status(405).json({ ok: false, error: "Method not allowed" });
  }
}
