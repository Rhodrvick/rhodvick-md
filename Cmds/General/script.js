module.exports = async (context) => {
  const { client, m } = context;

  try {
    // Fetch repository data from GitHub
    const response = await fetch("https://api.github.com/repos/Keithkeizzah/KEITH-MD");
    const repoData = await response.json();

    // Extract relevant information
    const repoInfo = {
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      lastUpdate: repoData.updated_at,
      owner: repoData.owner.login,
      createdAt: repoData.created_at,
      url: repoData.html_url
    };

    // Format dates
    const createdDate = new Date(repoInfo.createdAt).toLocaleDateString("en-GB");
    const lastUpdateDate = new Date(repoInfo.lastUpdate).toLocaleDateString("en-GB");

    // Construct message caption
    const messageCaption = `
      *Hello ,,,👋 This is RHODVICK-MD*
      The best bot in the universe developed by RHODVICK TECH. Fork and give a star 🌟 to my repo
      ╭───────────────────
      │✞ *Stars:* ${repoInfo.stars}
      │✞ *Forks:* ${repoInfo.forks}
      │✞ *Release Date:* ${createdDate}
      │✞ *Last Update:* ${lastUpdateDate}
      │✞ *Owner:* ${repoInfo.owner}
      │✞ *Repository:* ${repoInfo.url}
      │✞ *Session:* https://keith-sessions-pi5z.onrender.com
      ╰───────────────────
    `;

    // Define an image URL (replace this with your actual image URL)
    const imageUrl = 'https://i.ibb.co/wJBxKV4/74421a3c5d94ac0a.jpg';  // Replace with the actual image URL

    // Send the generated message to the user
    await client.sendMessage(m.chat, {
      text: messageCaption,
      contextInfo: {
        mentionedJid: [m.sender], // Mention the sender
        externalAdReply: {
          title: "🌟RHODVICK-MD ✨",
                        body: "𝐫𝐞𝐠𝐚𝐫𝐝𝐬 RHODVICK TECH",
                        thumbnailUrl: "https://i.ibb.co/wJBxKV4/74421a3c5d94ac0a.jpg",
                        sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
      }
    });

  } catch (error) {
    console.error("Error:", error);
    m.reply('An unexpected error occurred while generating the repo information.');
  }
};
