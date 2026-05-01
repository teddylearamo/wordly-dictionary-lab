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
