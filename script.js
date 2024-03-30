const form = document.querySelector("form");
const Word = document.querySelector(".word");
const NotFound = document.querySelector(".not-found"); // If the Audio is not Found
const meaning = document.querySelector(".meaning");
const sourceUrls = document.querySelector(".sourceUrls");
const VolumeBtn = document.querySelector('.fa-volume-high');

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
    try {
        const response = await fetch(url);
        const result = await response.json();
        ShowResult(result);
    } catch (error) {
        console.error(error);
    }
    input.value = "";
});

function ShowResult(result) {
    if (result.hasOwnProperty('title')) {
        meaning.innerHTML = result.title + "<br>" + result.message;
        meaning.style.color = "red";
    } else {
        NotFound.innerHTML = "";
        Word.innerHTML = result[0].word;
        meaning.innerHTML = result[0].meanings[0].definitions[0].definition;
        sourceUrls.innerHTML = `<a href="${result[0].sourceUrls}">${result[0].sourceUrls}</a>`;
    }
}

VolumeBtn.addEventListener("click", () => {
    let speech = new SpeechSynthesisUtterance();
    speech.text = Word.innerHTML;
    window.speechSynthesis.speak(speech);
})