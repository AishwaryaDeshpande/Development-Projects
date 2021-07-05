
let shuffledQuestion;
let currentQuestionIndex;
let totalScore = 0; 
var next = document.getElementById('next');
let counter;
//var questionContainer = document.getElementById('quiz');

const questions = [
    {
       question:"What does HTML stand for?",
       answeres:[
           {text:"Hyper Text Markup Language",correct:true},
           {text:"HyperLinks and Text Markup Language ",correct:false},
           {text:"Hyper Tool Markup Language",correct:false},
       ]
     },
     {
        question:"Who is making Web Standards?",
        answeres:[
            {text:"Google",correct:false},
            {text:"Mozilla",correct:false},
            {text:"Firefox",correct:false},
            {text:"The World Wide Web Consortium",correct:true}
        ]
      },
      {
        question:"What is the correct HTML element for inserting a line break??",
        answeres:[
            {text:"<break>",correct:false},
            {text:"<br>",correct:true},
            {text:"<lb>",correct:false}
        ]
      },
      {
        question:"Choose the correct HTML element for the largest heading:",
        answeres:[
            {text:"h1",correct:true},
            {text:"heading",correct:false},
            {text:"h6",correct:false},
            {text:"h",correct:false}
        ]
      }
    ] 
    const totalQuestions = questions.length;           

function startbutton(){
    console.log("Started")
    document.getElementById("startDiv").classList.add("hide");
    document.getElementById("quiz-rules").classList.remove("hide");
}

function exitQuiz(){
    document.getElementById('results').classList.add('hide');
    document.getElementById("startDiv").classList.remove("hide");
    document.getElementById("quiz-rules").classList.add("hide");
}

function startQuiz(){

    document.getElementById("quiz-rules").classList.add("hide");
    shuffledQuestion = questions.sort(() => Math.random()-0.5);
    currentQuestionIndex = 0;
    
    document.getElementById('quiz').classList.remove('hide');
    document.getElementById('next').addEventListener('click',function(){
        currentQuestionIndex = currentQuestionIndex+1;
        clearInterval(counter);
        if(currentQuestionIndex >= shuffledQuestion.length){
            document.querySelector('.score').innerHTML = totalScore;
            document.getElementById('quiz').classList.add('hide');
            document.getElementById('results').classList.remove('hide');
    
        }else{
            setNextQuestion();
        }
    });

    document.getElementById('retake').addEventListener('click',function(){
        document.getElementById('results').classList.add('hide');
        document.getElementById('quiz').classList.remove('hide');
    });

    setNextQuestion();
    
}

function resetState(){
    document.getElementById('next').classList.add('hide');
    while(document.getElementById("answer-button").firstElementChild){
        document.getElementById("answer-button").removeChild(document.getElementById("answer-button").firstElementChild);

    }
}

function setNextQuestion(){
    resetState();
    startTimer(15);
    showQuestion(shuffledQuestion[currentQuestionIndex]);
}
function showQuestion(question){
    document.querySelector('.currentIndex').innerHTML = currentQuestionIndex+1;
    document.querySelector("#question-container h4").innerHTML = question.question
    question.answeres.forEach(element => {
        const button = document.createElement("button");
        button.innerText = element.text;
        button.classList.add("btn");
        button.classList.add("answer");
        
        if(element.correct){
            button.dataset.correct = element.correct;
        }    
        button.onclick = function(e){
            selectAnswer(this);
        }
        //button.addEventListener("click", selectAnswer(this));    
        document.getElementById("answer-button").appendChild(button);
        
    });

}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = e.dataset.correct;
    if(correct){
        e.classList.add('correct');
        totalScore = totalScore+1;
    }else{
        e.classList.add('wrong');
        console.log("wrong");
    }
    diablesButtons();
    clearInterval(counter);
    document.getElementById('next').classList.remove('hide');
}
function diablesButtons(){
    var answerButtons = document.querySelectorAll('.answer.btn');
    for(var i=0;i<answerButtons.length;i++){
        answerButtons[i].classList.add('disabled');
        if(answerButtons[i].dataset.correct){
            answerButtons[i].classList.add('correct');
        }
    }
}

//Time counter 
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        document.querySelector('.time_sec').textContent = time;
        if(time <= 0){
            clearInterval(counter);
            diablesButtons();
            document.getElementById('next').classList.remove('hide');
            
        }
        time--;        
    }
}
