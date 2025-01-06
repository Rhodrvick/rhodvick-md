// this is zokou shit nuhh😂😂
//get the fuck outa here

const axios = require("axios");
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const settings = require(__dirname + "/../set");

const readMore = String.fromCharCode(8206).repeat(4001);

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

// Function to format uptime
const formatUptime = (seconds) => {
    seconds = Number(seconds);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : '',
        hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : '',
        remainingSeconds > 0 ? `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}` : ''
    ].filter(Boolean).join(', ');
};

// Function to fetch GitHub stats
const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/Rhodrvick/rhodvick-md");
        const forksCount = response.data.forks_count;
        const starsCount = response.data.stargazers_count;
        const totalUsers = forksCount * 2 + starsCount * 2;
        return { forks: forksCount, stars: starsCount, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};


// zokou command handler for 'menu' command
zokou({ nomCom: "menu", aliases: ["liste", "helplist", "commandlist"], categorie: "SYSTEM" }, async (message, client, config) => {
    const { ms, respond, prefix, nomAuteurMessage } = config;
    const commands = require(__dirname + "/../framework/zokou").cm;
    const categorizedCommands = {};
    const mode = settings.MODE.toLowerCase() !== "public" ? "Private" : "Public";

    // Organize commands into categories
    commands.forEach(command => {
        const category = command.categorie.toUpperCase();
        if (!categorizedCommands[category]) {
            categorizedCommands[category] = [];
        }
        categorizedCommands[category].push(command.nomCom);
    });

    // Get current time and format it
    moment.tz.setDefault("Africa/Nairobi");
    const currentTime = moment();
    const formattedTime = currentTime.format("HH:mm:ss");
    const formattedDate = currentTime.format("DD/MM/YYYY");
    const currentHour = currentTime.hour();

    const greetings = ["Good Morning 🌄", "Good Afternoon 🌃", "Good Evening ⛅", "Good Night 🌙"];
    const greeting = currentHour < 12 ? greetings[0] : currentHour < 17 ? greetings[1] : currentHour < 21 ? greetings[2] : greetings[3];

    // Fetch GitHub stats
    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    // Get random quote
    const randomQuote = getRandomQuote();

    // Prepare response message
    let responseMessage = `
 ${greeting}, *${nomAuteurMessage || "User"}*

*Be motivated with this inspiration quote🫧*   
"💎${randomQuote}💎"

╭━━━ 〔 RHODVICK-MD 〕━━━┈⊷
┃✦╭───────────────
┃✦│▸ *ʙᴏᴛ ᴏᴡɴᴇʀ:* ${settings.OWNER_NAME}
┃✦│▸ *ᴘʀᴇғɪx:* *[ ${settings.PREFIXE} ]*
┃✦│▸ *ᴛɪᴍᴇ:* ${formattedTime}
┃✦│▸ *ᴄᴏᴍᴍᴀɴᴅꜱ:* ${commands.length}
┃✦│▸ *ᴅᴀᴛᴇ:* ${formattedDate}
┃✦│▸ *ᴍᴏᴅᴇ:* ${mode}
┃✦│▸ *ᴛɪᴍᴇ ᴢᴏɴᴇ:* Africa/Nairobi
┃✦│▸ *ᴛᴏᴛᴀʟ ᴜsᴇʀs:* ${formattedTotalUsers} users
┃✦│▸ *ʀᴀᴍ:* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃✦│▸ *ᴜᴘᴛɪᴍᴇ:* ${formatUptime(process.uptime())}
┃✦╰───────────────
╰━━━━━━━━━━━━━━━┈⊷
━━━━━━━━━━━━━━━━
🎇 *QUOTE* 🎆
"${randomQuote}"
━━━━━━━━━━━━━━━━
> POWERED BY RHODVICK TECH
`;

    // List commands
    let commandsList = "*AVAILABLE COMMANDS*\n";
    const sortedCategories = Object.keys(categorizedCommands).sort();
    let commandIndex = 1;

    for (const category of sortedCategories) {
        commandsList += `\n*╭─────「 ${toFancyUppercaseFont(category)} 」──┈⊷*\n│✦╭───────────────`;
        const sortedCommands = categorizedCommands[category].sort();
        for (const command of sortedCommands) {
            commandsList += `\n│✦ ${commandIndex++}. ${toFancyLowercaseFont(command)}`;
        }
        commandsList += "\n│✦╰─────────────\n╰──────────────┈⊷\n";
    }

    commandsList += readMore + "\nin honor of Alpha\n";

    // Send message
    try {
        const senderName = message.sender || message.from;
        await client.sendMessage(message, {
            text: responseMessage + commandsList,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "✦RHODVICK-MD✦",
                    body: "POWERED BY 𝚁𝙷𝙾𝙳𝚅𝙸𝙲𝙺",
                                                thumbnailUrl: "https://i.ibb.co/wJBxKV4/74421a3c5d94ac0a.jpg",
                        sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
    } catch (error) {
        console.error("Menu error: ", error);
        respond("🥵🥵 Menu error: " + error);
    }
});

