// ====================== DADOS DO QUIZ ======================
const quizData = [
    {
      question: "O que é Partilha?",
      options: [
        "1) É quando você reparte seu alimento com o pobre",
        "2) É quando você divide bens em família",
        "3) É um dos momentos mais importantes da reunião de equipe"
      ],
      correct: 3
    },
    {
      question: "É correto fazer a Partilha em toda reunião de equipe?",
      options: [
        "1) Sim",
        "2) Não",
        "3) Às vezes, pois nunca dá tempo"
      ],
      correct: 1
    },
    {
      question: "O que podemos partilhar em uma reunião?",
      options: [
        "1) Os gastos mensais do casal",
        "2) Como um PCE transformou e mudou a vida do casal, naquele mês",
        "3) Como está a rotina dos filhos"
      ],
      correct: 2
    },
    {
      question: "É certo realizar a Partilha como um dever de casa? Fez, Não Fez?",
      options: [
        "1) Sim, esse momento tem que ser rápido e só responder: ‘Fizemos’, ‘Não fizemos’",
        "2) Sim, o CRE dá nota no final do ano",
        "3) Não, é um momento importante do casal e tem como objetivo a entreajuda em equipe"
      ],
      correct: 3
    },
    {
      question: "Quem conduz a Partilha durante a reunião?",
      options: [
        "1) Casal Responsável de Equipe",
        "2) Casal Hospedeiro",
        "3) Casal Ligação"
      ],
      correct: 1
    },
    {
      question: "Qual é a essência da Partilha?",
      options: [
        "1) Doar a própria vida aos irmãos da equipe para que todos se enriqueçam",
        "2) Dar conselhos para evitar briga em casal",
        "3) Discutir valores cristãos"
      ],
      correct: 1
    },
    {
      question: "Na Partilha dividimos os avanços na vivência dos PCEs. É correto dizer que:",
      options: [
        "1) É uma graça que movimenta o coração equipista na busca de santidade conjugal",
        "2) É uma maneira de estreitar relação com o cônjuge",
        "3) É um momento para fazer a correção fraterna com a equipe"
      ],
      correct: 1
    }
  ];
  
  // ====================== SELEÇÃO DE ELEMENTOS ======================
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  
  const playerNameInput = document.getElementById('playerName');
  const teamNameInput = document.getElementById('teamName');
  const startBtn = document.getElementById('startBtn');
  const playerGreeting = document.getElementById('playerGreeting');
  
  const timeCount = document.getElementById('timeCount');
  const timerBar = document.getElementById('timerBar');
  
  const questionContainer = document.getElementById('question-container');
  const nextBtn = document.getElementById('nextBtn');
  
  const resultText = document.getElementById('resultText');
  const participantInfo = document.getElementById('participantInfo');
  const answerList = document.getElementById('answerList');
  
  // ====================== VARIÁVEIS DE CONTROLE ======================
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  let answered = false;
  let playerName = "";
  let teamName = "";
  
  // ====================== INICIAR QUIZ ======================
  startBtn.addEventListener('click', () => {
    playerName = playerNameInput.value.trim();
    teamName = teamNameInput.value.trim();
  
    if(!playerName) {
      alert('Por favor, insira seu nome.');
      return;
    }
    if(!teamName) {
      alert('Por favor, insira o número (ou nome) da sua equipe.');
      return;
    }
  
    // Troca de tela
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
  
    // Saudação
    playerGreeting.textContent = `Olá, ${playerName} (Equipe: ${teamName})! Boa sorte no Quiz!`;
  
    loadQuestion();
    startTimer();
  });
  
  // ====================== CARREGAR PERGUNTA ======================
  function loadQuestion() {
    clearTimeout(timer);
    timeLeft = 30;
    timeCount.textContent = timeLeft;
  
    // Reiniciar animação da barra
    timerBar.style.animation = 'none';
    void timerBar.offsetWidth; // Força reflow
    timerBar.style.animation = 'shrink 30s linear forwards';
  
    questionContainer.innerHTML = '';
    answered = false;
  
    const currentData = quizData[currentQuestionIndex];
    
    // Monta o HTML da pergunta
    const questionEl = document.createElement('div');
    questionEl.classList.add('fade-question');
    questionEl.innerHTML = `<div class="question">${currentData.question}</div>`;
  
    // Cria as opções (ul/li)
    const ul = document.createElement('ul');
    ul.classList.add('options');
  
    currentData.options.forEach((optText, index) => {
      const li = document.createElement('li');
      li.textContent = optText;
      li.addEventListener('click', () => selectOption(index + 1));
      ul.appendChild(li);
    });
  
    questionEl.appendChild(ul);
    questionContainer.appendChild(questionEl);
  }
  
  // ====================== SELECIONAR OPÇÃO ======================
  function selectOption(selectedOption) {
    if(answered) return;
  
    answered = true;
    const currentData = quizData[currentQuestionIndex];
  
    if(selectedOption === currentData.correct) {
      score++;
    }
    // Para o timer e vai para a próxima
    clearInterval(timer);
    nextQuestion();
  }
  
  // ====================== BOTÃO PRÓXIMA ======================
  nextBtn.addEventListener('click', () => {
    if(!answered) {
      answered = true;
    }
    nextQuestion();
  });
  
  // ====================== PRÓXIMA PERGUNTA ======================
  function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length) {
      loadQuestion();
      startTimer();
    } else {
      endQuiz();
    }
  }
  
  // ====================== INICIAR TIMER ======================
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timeCount.textContent = timeLeft;
      if(timeLeft <= 0) {
        clearInterval(timer);
        if(!answered) {
          answered = true;
        }
        nextQuestion();
      }
    }, 1000);
  }
  
  // ====================== FINALIZAR QUIZ ======================
  function endQuiz() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
  
    // Mensagem principal
    resultText.textContent = `${playerName} (Equipe: ${teamName}), você acertou ${score} de ${quizData.length} perguntas!`;
  
    // Mostra Nome e Equipe também acima do gabarito
    participantInfo.textContent = `Participante: ${playerName} — Equipe: ${teamName}`;
  
    // Gabarito (opção correta + texto)
    answerList.innerHTML = '';
    quizData.forEach((q, i) => {
      const li = document.createElement('li');
      li.textContent = `Pergunta ${i+1}: A resposta correta é a opção ${q.correct} — “${q.options[q.correct - 1]}”`;
      answerList.appendChild(li);
    });
  }
  