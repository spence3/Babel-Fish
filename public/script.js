const socket = io('ws://localhost:8000'); // Connect to server
//text to speech variables
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var text //text as global

var recognition = new SpeechRecognition()
recognition.continuous = false
recognition.lang = 'en-US'
recognition.interimResults = false
recognition.maxAlternatives = 1


var diagnostic = document.querySelector('#stt')
var voiceButton = document.querySelector('#speech')
var sendButton = document.querySelector('#send')
var displayMessage = document.querySelector('#msgDisplay')

//voice button click
voiceButton.onclick = function() {
  recognition.start()
  console.log('Listening for sentence.')
}

//voice to text in textbox
recognition.onresult = function(event) {
  text = event.results[0][0].transcript
  diagnostic.value += text + '.'
  console.log(text)
  console.log('Confidence: ' + event.results[0][0].confidence)
}


//stop recording when user stops talking
recognition.onspeechend = function() {
  recognition.stop()
}

//errors
recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error
}

socket.on('message', message => {
  displayMessage.value += message + '\n'
  var spanishText = message.split('\n')[1]
  console.log(`Message on the script.js ${spanishText}`)
})

sendButton.onclick = function() {
  // var translateDisplay = displayMessage.value += text + '\n'
  const send = text
  socket.emit('message', send);
  diagnostic.value = ''; // Clear the input after sending

}
