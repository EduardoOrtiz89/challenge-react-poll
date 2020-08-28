import * as React from 'react';
import styled from 'styled-components';
import { QandAsDocument, Answer, QandA } from '../types';
import AnswerComponent from './AnswerComponent';
import {
  getPercentage,
  getRandomPoll,
  getTotalVotes,
  getWinnerIndex,
} from '../utils/utils';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  max-width: 420px;
  width: 100%;
  box-sizing: border-box;
  margin: 30px auto;
  border-radius: 5px;
  box-shadow: 1px 1px 5px -1px rgba(0, 0, 0, 0.75);
  padding: 25px;
`;

const Title = styled.h2`
  margin: 5px 0 20px 0;
  padding: 0;
`;

const TextTotal = styled.span`
  color: #999;
  font-size: 0.8rem;
`;

let poll: QandA;

export default function Poll({ qandas }: Props) {
  if (!poll) {
    poll = getRandomPoll(qandas);
  }

  const [total, setTotal] = React.useState(getTotalVotes(poll.answers));
  const [answers, setAnswers] = React.useState(poll.answers);
  const [currentIndex, setCurrentIndex] = React.useState(-1);
  const [winner, setWinner] = React.useState(-1);

  const onAnswerClick = (index: number) => () => {
    const mapAnswers = answers.map(
      (itemAnswer: Answer, indexAnswer: number) => {
        if (index === indexAnswer) {
          itemAnswer.votes++;
        }
        return itemAnswer;
      }
    );
    setAnswers(mapAnswers);
    setCurrentIndex(index);
    setWinner(getWinnerIndex(poll.answers));
    setTotal(getTotalVotes(poll.answers));
  };

  return (
    <PollWrapper>
      <Title>{poll.question.text}</Title>
      {poll.answers.map((answer, index) => (
        <AnswerComponent
          percentage={
            currentIndex > -1 ? getPercentage(answer.votes, total) : 0
          }
          onAnswerClick={onAnswerClick}
          key={answer.text}
          index={index}
          isCurrent={index === currentIndex}
          isWinner={index === winner}
          text={answer.text}
          votes={answer.votes}
        />
      ))}
      <TextTotal>{`${total} votes`}</TextTotal>
    </PollWrapper>
  );
}
