const getQuestions = (rows, numberOfQuestions, language) => {
  let currentQuestions = [];
  let placeInRowArray = 0;
  for (let i = 0; i < numberOfQuestions; i++) {
    currentQuestions.push({
      id: i,
      word: rows[placeInRowArray].english,
      correctAnswer: rows[placeInRowArray++][language],
      incorrectAnswers: [
        rows[placeInRowArray++][language],
        rows[placeInRowArray++][language],
      ],
    });
  }
  return currentQuestions;
};

exports.getQuestions = getQuestions;
