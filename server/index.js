const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors()); 

// allow origin * for now
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());



const greetings = ["hello", "hi", "hey", "greetings"];
const daily_greetings = ["morning", "afternoon", "evening", "night"];
const help_keywords = ["help", "support", "assist", "aid"];
const product_keywords = ["product", "items", "goods"];
const price_keywords = ["price", "cost", "fee"];
const abuse_keywords = ["abuse", "harass", "insult", "threaten", "bully", "attack", "hurt", "harm"];
const support_keywords = ["support", "assistance", "help"];

app.get("/", (req, res) => {
  res.send("Ladies and Gentlemen, this is ur own chat bot!");
});

app.post("/chat", (req, res) => {
  // parse the query parameter from the request body
  const query = req.query.query;
  if (query) {
    // Normalize the text to lowercase
    const normalizedQuery = query.toLowerCase();
    if (greetings.some((greeting) => normalizedQuery.includes(greeting))) {
      res.json({ message: "Hello, how can I help you today?" });
    } else if (
      help_keywords.some((keyword) => normalizedQuery.includes(keyword))
    ) {
      res.json({
        message:
          "I can help you with information about our products and services. What would you like to know?",
      });
    } else if (
      product_keywords.some((keyword) => normalizedQuery.includes(keyword))
    ) {
      res.json({
        message: "Our products include laptops, smartphones, and tablets.",
      });
    } else if (
      price_keywords.some((keyword) => normalizedQuery.includes(keyword))
    ) {
      res.json({ message: "You can find our price list on our website." });
    } else if (
      support_keywords.some((keyword) => normalizedQuery.includes(keyword))
    ) {
      res.json({
        message: "We offer support through our website, email, and phone.",
      });
    } else if (
      abuse_keywords.some((keyword) => normalizedQuery.includes(keyword))
    )
    {
      res.json({
        message:
          "I am sorry to hear that. I will forward your message to our support team.",
      });
    } 
    else if(daily_greetings.some((greeting) => normalizedQuery.includes(greeting))){
        const timeNow = new Date().getHours();
        let greetingNow;
        if(timeNow >= 0 && timeNow < 12){
            greetingNow = 'morning';
        }
        else if(timeNow >= 12 && timeNow < 18){
            greetingNow = 'afternoon';
        }
        else if(timeNow >= 18 && timeNow < 24){
            greetingNow = 'evening';
        }
        
        res.json({
            message: `Good ${greetingNow}, how can I help you today?`
        });
    } 
    else {
      res.json({
        message:
          "I am sorry, I am not quite sure what you mean. Could you please rephrase your question or provide more details?",
      });
    }
  } else {
    res.json({
      message:
        "I am sorry, I am not quite sure what you mean. Could you please rephrase your question or provide more details?",
    });
  }
});

app.listen(port, () => {
  console.log(`Bot is running on port ${port}`);
});
