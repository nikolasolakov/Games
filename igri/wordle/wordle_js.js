let wordList = [];
let wordSet = new Set();
let correctList=[];
let correctSet=new Set();
let correctWord;

window.addEventListener('DOMContentLoaded', () => {
    fetch('./valid-wordle-words.txt')
        .then(res => {
            if (!res.ok) throw new Error('fetch failed');
            return res.text();
        })
        .then(text => {
            correctList = text.split(/\r?\n/).map(w => w.trim().toUpperCase()).filter(Boolean);
            if (correctList.length === 0) throw new Error('word list empty');
            correctSet = new Set(correctList);
            correctWord = pickRandomWord();
            console.log('correctWord set to', correctWord);

        })
        .catch(err => {
            console.error('Could not load word list:', err);
            wordList = ['APPLE', 'GRAPE', 'BRAVE', 'CRANE', 'PLANT'];
            wordSet = new Set(wordList);
            correctWord = pickRandomWord();
            console.log('Using fallback list. correctWord set to', correctWord);

        });
});
window.addEventListener('DOMContentLoaded', () => {
    fetch('./all-word-guesses')
        .then(res => {
            if (!res.ok) throw new Error('fetch failed');
            return res.text();
        })
        .then(text => {
            wordList = text.split(/\r?\n/).map(w => w.trim().toUpperCase()).filter(Boolean);
            if (wordList.length === 0) throw new Error('all word list empty');
            wordSet = new Set(wordList);

        })
        .catch(err => {
            console.error('Could not load word list:', err);
            wordList = ['APPLE', 'GRAPE', 'BRAVE', 'CRANE', 'PLANT'];
            wordSet = new Set(wordList);

        });
});

    function pickRandomWord() {
        if (!correctList || correctList.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * correctList.length);
        return correctList[randomIndex];
    }

    let currentRow = 1;
    getRowNode(1)[0].focus();

    for (let i = 1; i <= 6; i++) {
        setMax(i, 1);
        const inp = getRowNode(i);

        inp.forEach((input, index) => {
            input.addEventListener('input', () => {
                input.value = input.value.toUpperCase().replace(/[^A-Z]/g, '');
                if (input.value.length === 1 && index < inp.length - 1) {
                    inp[index + 1].focus();
                }
            });

            input.addEventListener('keydown', (event) => {
                if (event.key === 'Backspace') {
                    if (input.value === '' && index > 0) {
                        event.preventDefault();
                        inp[index - 1].focus();
                    }
                }
                if (event.key === 'Enter') {
                    event.preventDefault()
                    moveOn();
                }
                if (event.key === 'ArrowLeft' && index > 0) {
                    event.preventDefault();
                    inp[index - 1].focus();
                }
                if (event.key === 'ArrowRight' && index < inp.length - 1) {
                    event.preventDefault();
                    inp[index + 1].focus();
                }
            });
        });
    }

    function moveOn() {
        let currInputs = getRowValue(currentRow);
        for (let i = 0; i < 5; i++) {
            if (currInputs[i] === "") {
                alert("ne se site polni")
                return;
            }
        }
        
        let past = getRowNode(currentRow);
        if (!check(currInputs)){
            alert("ne e validen zbor")
            return;
        }
        past.forEach(input => input.disabled = true);
        finalCheck(currInputs);
        currentRow++;
        getRowNode(currentRow)[0].focus();
    }

    function check(values) {
        const word = values.join('').toUpperCase();
        return wordSet.has(word);
    }

    function finalCheck(values) {
        const word = values.join('').toUpperCase();
        for (let i = 0; i < 5; i++) {
            const letter = word[i];
            const input=getRowNode(currentRow)[i];
            
            if(word===correctWord){
                disableAll();
                const all=getRowNode(currentRow);
                for(let i=0; i<5;i++){
                    all[i].classList.add("correct");
                    
                }
                alert("pobediii so "+currentRow+" obidi")
                return;
            }
            else if (letter === correctWord[i]) {
                input.classList.add("correct");
                const key = document.querySelector(`.key[data-letter="${letter}"]`);
                key.classList.add('correct');
            } else if (correctWord.includes(letter)) {
                input.classList.add("present");
                const key = document.querySelector(`.key[data-letter="${letter}"]`);
                key.classList.add('present');
            } else {
                input.classList.add("wrong");
                const key = document.querySelector(`.key[data-letter="${letter}"]`);
                key.classList.add('wrong');
            }
        }
    }

    function getRowValue(rowNumber) {
        const values = document.querySelectorAll(`#row${rowNumber} input`);
        return Array.from(values).map(input => input.value);
    }

    function getRowNode(rowNumber) {
        return document.querySelectorAll(`#row${rowNumber} input`);
    }

    function setMax(rowNumber, length) {
        const inp = getRowNode(rowNumber);
        inp.forEach(input => input.maxLength = length);
    }
    
    function disableAll(){
        for (let i=0;i<6;i++){
            const inp = getRowNode(i);
            inp.forEach(input => input.disabled = true);
        }
    }

