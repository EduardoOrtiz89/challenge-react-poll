import { QandAsDocument, Answer, QandA } from '../types';

const getRandomPoll = (qandas: QandAsDocument): QandA => {
  return qandas.questions[Math.floor(Math.random() * qandas.questions.length)];
};

const getWinnerIndex = (answers: Array<Answer>): number => {
  return answers.reduce(
    (
      indexMax: number,
      currentValue: Answer,
      currentIndex: number,
      array: Array<Answer>
    ) => {
      return currentValue.votes > array[indexMax].votes
        ? currentIndex
        : indexMax;
    },
    0
  );
};

const getTotalVotes = (answers: Array<Answer>): number => {
  return answers.reduce(
    (prev: number, current: Answer) => prev + current.votes,
    0
  );
};

const getPercentage = (votes: number, total: number): number => {
  return +((votes / total) * 100).toFixed(2);
};

export { getRandomPoll, getWinnerIndex, getTotalVotes, getPercentage };
