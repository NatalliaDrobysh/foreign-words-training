"use strict";

const card = document.querySelector('.flip-card');
const cardFront = document.querySelector('#card-front');
const cardBack = document.querySelector('#card-back');
const englishWord = cardFront.querySelector('h1');
const russianhWord = cardBack.querySelector('h1');
const usageExample = cardBack.querySelector('span');
const buttonNext = document.querySelector('#next');
const buttonBack = document.querySelector('#back');
const numberCurrentWord = document.querySelector('#current-word');
const buttonExam = document.querySelector('#exam');
const studyCards = document.querySelector('.study-cards');
const examCards = document.querySelector('#exam-cards');
const studyMode = document.querySelector('#study-mode');
const examMode = document.querySelector('#exam-mode');



const words = [
    {word: 'apple', translation: 'яблоко', example: 'The apple fell from the tree.'},
    {word: 'orange', translation: 'апельсин', example: 'The orange is my favorite fruit.'},
    {word: 'strawberry', translation: 'клубника', example: 'I love eating strawberries'},
    {word: 'blueberry', translation: 'черника', example: 'He loves blueberry muffins.'},
    {word: 'pineapple', translation: 'ананас', example: 'We went to a tropical fruit market and bought a pineapple to take home'},
]

let flipCard = false;

card.addEventListener('click', function () {
    if (flipCard) {
        card.classList.add('active');
        flipCard = false;
    } else {
         card.classList.remove('active');
         flipCard = true;
    }
});


let currentIndex = 0;

function createStudyCard() {
    const currentWord = words[currentIndex];
    englishWord.textContent = currentWord.word;
    russianhWord.textContent = currentWord.translation;
    usageExample.textContent = currentWord.example;
}


buttonNext.addEventListener('click', function() {
    currentIndex = currentIndex + 1;
    createStudyCard()
    buttonBack.disabled = false;
    if (currentIndex === words.length - 1) {
        buttonNext.disabled = true;
    }
   numberCurrentWord.textContent = currentIndex + 1;

})

buttonBack.addEventListener('click', function() {
    currentIndex = currentIndex - 1;
    createStudyCard();
    buttonNext.disabled = false;
    if (currentIndex === 0) {
        buttonBack.disabled = true;
    } 
    numberCurrentWord.textContent = currentIndex + 1;
})

createStudyCard();

let allCards = [];

words.forEach(item => {
    allCards.push(item.word);
    allCards.push(item.translation);
});

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0;  i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];   
    }
    return arr;
}

const shuffledCards = shuffleArray(allCards);


buttonExam.addEventListener('click', function() {
    studyCards.hidden = true;
    studyMode.hidden = true;
    examMode.classList.remove('hidden');
    
    shuffledCards.forEach(item => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.textContent = item;
    examCards.append(cardElement)
})
})

const dictionary = {};

function fillDictionary() {
    words.forEach(function(item) {
        dictionary[item.word] = item.translation;
        dictionary[item.translation] = item.word;
    })
}

fillDictionary();

let clickCount = 0;
let selectedWord = null;

examCards.addEventListener('click', function(event) {
    
    const element = event.target;  
    clickCount++;
      if (clickCount === 1 && selectedWord === null) {
        selectedWord = element;
        selectedWord.classList.add('correct');
      } else if ( clickCount === 2 && dictionary[element.textContent] === selectedWord.textContent) {
          element.classList.add('correct');
          element.classList.add('fade-out');
          selectedWord.classList.add('fade-out');
          clickCount = 0;
          selectedWord = null;
      } else if (clickCount === 2 && dictionary[element.textContent] !== selectedWord.textContent) {
          element.classList.add('wrong');
          setTimeout(function() {
            element.classList.remove('wrong');
            selectedWord.classList.remove('correct');
            clickCount = 0;
            selectedWord = null;
          }, 500);   
      } 
})



