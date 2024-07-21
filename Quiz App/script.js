const questions = [
    {
        question: "In what house did the Sorting Hat almost put Harry?",
        answers:[
             {text: "Slytherin", correct: true},
             {text: "Hufflepuff", correct: false},
             {text: "Ravenclaw", correct: false},
             {text: "Gryffindor", correct: false},
        ]
    },
    {
        question: "Which street the Dursley's live?",
        answers:[
             {text: "Diagon Alley", correct: false},
             {text: "Magnolia Crescent", correct: false},
             {text: "Privet Drive", correct: true},
             {text: "Whinging Way", correct: false},
        ]
    },
    {
        question: "Which of the following is not a Quidditch term?",
        answers:[
             {text: "Seeker", correct: false},
             {text: "Bloopers", correct: true},
             {text: "Snitch", correct: false},
             {text: "Quaffle", correct: false},
        ]
    },
    {
        question: "Which of the following is the name of the fourth Harry Potter book?",
        answers:[
             {text: "Harry Potter and the Philosopher's Stone", correct: false},
             {text: "Harry Potter and the Prisoner of Azkaban", correct: false},
             {text: "Harry Potter and the Goblet of Fire", correct: true},
             {text: "Harry Potter and the Deathly Hollows", correct: false},
        ]
    },
    {
        question: "There are heaps of ghouls and ghosts throughout Hogwarts. Which of the following is a poltergeist and is NOT a ghost?",
        answers:[
             {text: "The Fat Friar", correct: false},
             {text: "Nearly Headless Nick", correct: false},
             {text: "Peeves", correct: true},
             {text: "Moaning Myrtle", correct: false},
        ]
    },
    {
        question: "What position does Harry play on the Gryffindor Quidditch team?",
        answers:[
             {text: "Keeper", correct: false},
             {text: "Beater", correct: false},
             {text: "Seeker", correct: true},
             {text: "Chaser", correct: false},
        ]
    },
    {
        question: "_____________________ was second to open the Chamber of Secrets.",
        answers:[
             {text: "Tom Riddle", correct: false},
             {text: "Draco Malfoy", correct: false},
             {text: "Severus Snape", correct: false},
             {text: "Ginny Weasley", correct: true},
        ]
    },
    {
        question: "Where are the headquarters of the Order of the Phoenix?",
        answers:[
             {text: "Godric's Hollow", correct: false},
             {text: "Grimmauld Place", correct: true},
             {text: "The Hog's Head", correct: false},
             {text: "Hogwarts", correct: false},
        ]
    },
    {
        question: "Platform 9 ¾ can be found at which London station?",
        answers:[
             {text: "Waterloo", correct: false},
             {text: "Kings Cross", correct: true},
             {text: "Colindale", correct: false},
             {text: "Paddington", correct: false},
        ]
    },
    {
        question: "Who kills Albus Dumbledore at the end of 'The Half-Blood Prince'?",
        answers:[
             {text: "Lucius Malfoy", correct: false},
             {text: "Draco Malfoy", correct: false},
             {text: "Professor Snape", correct: true},
             {text: "Voldemort", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener('click', startQuiz);
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();


