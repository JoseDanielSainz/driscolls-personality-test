const questionDisplay = document.getElementById('questions')
const questionAnswer = document.getElementById('answer')

// black, blue, straw, rasp
const questions = [
  {
    id: 0,
    title: '¿Qué prefieres hacer en un día libre?',
    answers: [
      {
        title: 'Dormir',
        personality: 'Blackberry'
      },
      {
        title: 'Leer un libro mientras tomo un café',
        personality: 'Blueberry'
      },
      {
        title: 'Ir al cine con mis amigos',
        personality: 'Strawberry'
      },
      {
        title: 'Jugar un deporte',
        personality: 'Raspberry'
      },
    ]
  },
  {
    id: 1,
    title: '¿Qué es algo que no soportas?',
    answers: [
      {
        title: 'La gente que maneja lento',
        personality: 'Blackberry'
      },
      {
        title: 'La injusticia en el mundo',
        personality: 'Blueberry'
      },
      {
        title: 'Cuando me piden que le baje a mi música',
        personality: 'Strawberry'
      },
      {
        title: 'Que me interrumpan al hablar',
        personality: 'Raspberry'
      }
    ]
  },
  {
    id: 2,
    title: '¿Con qué frase te identificas más?',
    answers: [
      {
        title: 'Si quiero que las cosas estén bien hechas, mejor las hago yo mismo',
        personality: 'Blackberry'
      },
      {
        title: 'Aprender cosas nuevas es mi hobby favorito',
        personality: 'Blueberry'
      },
      {
        title: 'Prefiero pedir perdón que pedir permiso',
        personality: 'Strawberry'
      },
      {
        title: 'La felicidad de los demás es lo que me hace más feliz',
        personality: 'Raspberry'
      }
    ]
  },
  {
    id: 3,
    title: '¿Cuál sería tu trabajo ideal?',
    answers: [
      {
        title: 'Algo en lo que pueda mandar',
        personality: 'Blackberry'
      },
      {
        title: 'Cuidador de perritos',
        personality: 'Blueberry'
      },
      {
        title: 'Un influencer famoso',
        personality: 'Strawberry'
      },
      {
        title: 'Cualquier cosa en la que pueda estar sobre un escenario',
        personality: 'Raspberry'
      }
    ]
  },
  {
    id: 4,
    title: '¿Cuál es tu género de música favorito?',
    answers: [
      {
        title: 'Hip Hop / Rap',
        personality: 'Blackberry'
      },
      {
        title: 'Rock Indie',
        personality: 'Blueberry'
      },
      {
        title: 'Reggaetón',
        personality: 'Strawberry'
      },
      {
        title: 'Pop',
        personality: 'Raspberry'
      }
    ]
  }
]

const unansweredQuestions = []
const chosenAnswers = []
const personalityCounter = []

const populateQuestions = () => {
  questions.forEach(question => {
    const titleBlock = document.createElement('div')
    titleBlock.id = question.id
    titleBlock.classList.add('title-block')
    const titleHeading = document.createElement('h2')
    titleHeading.textContent = question.title
    titleBlock.append(titleHeading)
    questionDisplay.append(titleBlock)

    const answersBlock = document.createElement('div')
    answersBlock.id = question.id + "-questions"
    answersBlock.classList.add('answer-options')

    unansweredQuestions.push(question.id)

    question.answers.forEach(answer => {
      const answerBlock = document.createElement('div')
      answerBlock.classList.add('answer-block')
      answerBlock.addEventListener('click', () => handleClick(question.id, answer.title, answer.personality))
      const answerTitle = document.createElement('h3')
      answerTitle.textContent = answer.title
      answerBlock.append(answerTitle)
      answersBlock.append(answerBlock)
    })
    questionDisplay.append(answersBlock)
    
  })
}

populateQuestions()

const handleClick = (questionId, chosenAnswer, answerPersonality) => {
  if (unansweredQuestions.includes(questionId))
  chosenAnswers.push(chosenAnswer, answerPersonality)
  const itemToRemove = unansweredQuestions.indexOf(questionId)
  
  if (itemToRemove > -1) {
    unansweredQuestions.splice(itemToRemove, 1)
  }

  console.log(chosenAnswers)
  console.log(unansweredQuestions)

  const lowestQuestionId = Math.min(...unansweredQuestions)
  location.href = '#' + lowestQuestionId

  if (!unansweredQuestions.length){
    //scroll to answer div
    location.href = '#answer'
  }

  let blackCount = 0
  let blueCount = 0
  let strawCount = 0
  let raspCount = 0

  chosenAnswers.forEach(personality => {
    if (personality === 'Blackberry'){
      blackCount++
    } else if (personality === 'Blueberry'){
      blueCount++
    } else if (personality === 'Strawberry'){
      strawCount++
    } else if (personality === 'Raspberry'){
      raspCount++
    }
  })

  disableQuestionBlock(questionId, chosenAnswer)

  


  if (unansweredQuestions <1){
    if (blackCount >= 3){
      console.log('Eres una zarzamora')
      document.querySelector('.blackberry').style.display="flex"
    } else if (blueCount >= 3){
      console.log('Eres una mora azul')
      document.querySelector('.blueberry').style.display="flex"
    } else if (strawCount >=3){
      console.log('Eres una fresa')
      document.querySelector('.strawberry').style.display="flex"
    } else if (raspCount >=3){
      console.log('Eres una frambuesa')
      document.querySelector('.raspberry').style.display="flex"
    } else {
      console.log('¡Tienes un poco de todo!')
      document.querySelector('.multiple').style.display="flex"
    }
  }

  const allAnswerBlocks = document.querySelectorAll('.answer-block')
  Array.from(allAnswerBlocks).forEach(answerBlock => answerBlock.replaceWith(answerBlock.clone(true)))

}

const disableQuestionBlock = (questionId, chosenAnswer) => {
  const currentQuesionBlock = document.getElementById(questionId + '-questions')

  Array.from(currentQuesionBlock.children).forEach(block => {
    if (block.children.item(0).innerText != chosenAnswer) {
      block.style.opacity = '50%'
    }
  })
}

