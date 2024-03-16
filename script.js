const form = document.querySelector("form");

async function GetData() {

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'aa6651bd56msh52f8279eb9de46dp16e9bdjsne03a02bb8c76',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        ShowResult(result);
    } catch (error) {
        console.error(error);
    }
    input.value = "";
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value.match(/^[A-Za-z ]+$/)) {
        if (input.value.trim() != "") GetData();
    } else {
        alert("Please Enter a valid Input !");
        input.value = "";
    }
})

const Word = document.querySelector(".word");
const NotFound = document.querySelector(".not-found"); // If the Audio is not Found
const meaning = document.querySelector(".meaning");
const example = document.querySelector(".example");
const grammer = document.querySelector(".grammer");
const sourceUrls = document.querySelector(".sourceUrls");

function ShowResult(result) {

    if (result.hasOwnProperty('title')) {
        meaning.innerHTML = result.title + result.message;
        // location.reload();
    } else {

        NotFound.innerHTML = "";
        Word.innerHTML = result[0].word + " : ";

        const audioUrl = result[0].phonetics[1].audio;
        const PlayAudio = document.querySelector(".fa-volume-high");
        const audioPlay = new Audio(audioUrl);
        if (audioUrl) {
            PlayAudio.addEventListener("click", () => {
                PlayAudio.classList.remove("text-dark");
                audioPlay.play();
                setTimeout(() => {
                    PlayAudio.classList.add("text-dark");
                }, 1000);
            });
            audioPlay.addEventListener("ended", () => {
                audioPlay.remove();
            });
        } else {
            NotFound.innerHTML = "Audio is Not Availabel !";
        }

        meaning.innerHTML = result[0].meanings[0].definitions[0].definition;
        sourceUrls.innerHTML = `<a href="${result[0].sourceUrls}">${result[0].sourceUrls}</a>`;
        grammer.innerHTML = result[0].meanings[0].synonyms[0];
        example.innerHTML = result[0].meanings[0].definitions[0].example;
    }

}
