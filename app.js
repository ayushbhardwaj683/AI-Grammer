import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5000;
const apiKey = "xyz"; // Your API key

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", { corrected: "", originalText: "" });
});

// Function to call your text correction API
async function correctText(text) {
  const url = "https://api.textgears.com/grammar";

  const requestBody = { text: text };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data.correctedText) {
      return data.correctedText;
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("API Error:", error);
    return "Error. Please try again.";
  }
}

// Text Correction Route
app.post("/correct", async (req, res) => {
  const text = req.body.text.trim();

  if (!text) {
    return res.render("index", {
      corrected: "Please enter some text to correct.",
      originalText: text,
    });
  }

  try {
    const correctedText = await correctText(text);
    res.render("index", { corrected: correctedText, originalText: text });
  } catch (error) {
    console.error("Error:", error);
    res.render("index", { corrected: "Error. Please try again.", originalText: text });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
