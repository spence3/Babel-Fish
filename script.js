import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv'

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"})

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var text

var recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('#stt');
var button = document.getElementById('clickSTT')

button.onclick = function() {
  recognition.start();
  console.log('Listening for sentence.');
}

recognition.onresult = function(event) {
  text = event.results[0][0].transcript;
  console.log(text)
  diagnostic.textContent = text + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}