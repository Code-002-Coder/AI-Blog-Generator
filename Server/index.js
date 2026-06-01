require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai")
const express = require('express');
const app = express();
const port = 8080;

app.use(express.json())


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })   // gemini-2.5-flash-lite

app.get('/', (req, res) => {
  res.sendFile("index.html", { root: "D:\\AI Blog Generator\\blog-generator" });
});

app.post('/api/generate', async (req, res) => {
  var attempts = 0;
  
  try {
    const result = await model.generateContent(req.body.prompt)
    const text = await result.response.text()
    
    res.json({ reply: text })
  }
  catch (error) {
    if (error.status === 503) {
      attempts++;
      console.log(`Server busy, retrying... Attempt ${attempts}`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    } else {
      return res.status(500).json({ error: error.message });
    }
    console.log(error)
    // console.log("Error Occured in Generating Content")
    res.json({ error: "Faile to Generate Content Please Retry" })
  }


})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
