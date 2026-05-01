//  SELECT ELEMENTS

const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

// EVENT LISTENER

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const word = input.value.trim();

  // validation
  if (word === "") {
    errorDiv.textContent = "Please enter a word";
    resultDiv.innerHTML = "";
    return;
  }

  fetchWord(word);
});

// FETCH FUNCTION

function fetchWord(word) {
  // clear old results
  resultDiv.innerHTML = "";
  errorDiv.textContent = "";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(function(response) {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(function(data) {
      displayResult(data);
    })
    .catch(function(error) {
      errorDiv.textContent = error.message;
    });
}
 
// DISPLAY FUNCTIONS

function displayResult(data) {
  const wordData = data[0];

  const word = wordData.word;
  const phonetic = wordData.phonetic || "N/A";

  const meaning = wordData.meanings[0];
  const partOfSpeech = meaning.partOfSpeech;

  const definition = meaning.definitions[0].definition;
  const example = meaning.definitions[0].example || "No example available";

  resultDiv.innerHTML = `
    <h2>${word}</h2>
    <p><strong>Pronunciation:</strong> ${phonetic}</p>
    <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
    <p><strong>Definition:</strong> ${definition}</p>
    <p><strong>Example:</strong> ${example}</p>
  `;

//
document.body.style.backgroundColor = "#68b86f";

}
