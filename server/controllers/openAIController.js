//server/controllers/openAIController.js

require('dotenv').config();
const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

exports.openAIGPT = async ( req, res ) => {
    const {prompt} = req.body;

    try{
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4.1",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.8,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        // 그대로 클라이언트에 전달
        res.json(response.data);
    } catch (error) {
        console.error("OpenAI API Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Failed to fetch from OpenAI"
        });
    }
}