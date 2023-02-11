const axios = require('axios');

const config  = {
    headers: { 
        'Authorization':`Token ebace8e9747a92abca7130324bc2a770c29d634d`,
        'Content-Type': 'application/json'
    }
}

module.exports = (io, socket) => {
    const room = socket.id;

    const handleArtGeneration = async (payload , callback)=>{
        try {
            const body = {
                version : "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb", 
                input: {
                    prompt : payload.prompt,
                    width: 768,
                    height: 1024
                },
                webhook : "https://2918-2405-201-1018-4c9e-f8d0-a8d1-ddd7-ce6d.in.ngrok.io/webhook",
                webhook_events_filter: ["completed"]
            }
            const resp = await axios.post("https://api.replicate.com/v1/predictions",body, config);
            console.log('success from server', resp.id);
        } catch (err) {
            console.log('err in server',err);
        }
    }

    socket.on("generateArt", handleArtGeneration);
}