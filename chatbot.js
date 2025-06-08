import { getAllFirebaseData } from './chatbot.js';

window.sendToOllama = async function () {
  const userInput = document.getElementById("userInput").value;
  const firebaseData = await getAllFirebaseData();

  const contextString = JSON.stringify(firebaseData);

  const body = {
    model: "mistral", // or other available Ollama model
    messages: [
      { role: "system", content: `Here is the data from our platform: ${contextString}` },
      { role: "user", content: userInput }
    ],
    stream: false
  };

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const result = await response.json();
  document.getElementById("responseBox").innerText = result.message.content;
};

import { getDatabase, ref, get, child } from "firebase/database";
import { app } from "./firebase-config.js"; // make sure you export `app` from firebase-config.js

const db = getDatabase(app);

// Fetch data from Firebase
async function fetchAllBusinessIdeas() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `businessIdeas`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return JSON.stringify(data); // or format it more nicely
    } else {
      return "No business ideas available.";
    }
  } catch (error) {
    return "Error fetching data: " + error;
  }
}

// Send prompt to Ollama
async function askAI(userQuestion) {
  const context = await fetchAllBusinessIdeas();

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3",
      prompt: `Here is the data:\n${context}\n\nNow answer this question:\n${userQuestion}`,
      stream: false
    })
  });

  const result = await response.json();
  return result.response;
}

// Hook it to your UI
window.handleAsk = async function () {
  const input = document.getElementById("user-input").value;
  const response = await askAI(input);
  document.getElementById("chat-response").innerText = response;
};
