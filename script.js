const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");

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

