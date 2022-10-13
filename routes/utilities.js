const getQuestions = (rows, numberOfQuestions) => {
  let currentQuestions = [];
  let placeInRowArray = 0;
  for (let i = 0; i < numberOfQuestions; i++) {
    currentQuestions.push({
      id: i,
      word: rows[placeInRowArray].english,
      correctAnswer: rows[placeInRowArray++].swedish,
      incorrectAnswers: [
        rows[placeInRowArray++].swedish,
        rows[placeInRowArray++].swedish,
      ],
    });
  }
  return currentQuestions;
};

exports.getQuestions = getQuestions;
