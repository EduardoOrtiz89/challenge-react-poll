import * as React from 'react';
import styled from 'styled-components';
const check = require('../static/check-circle.svg');

type Props = {
  votes: number;
  index: number;
  percentage: number;
  text: String;
  onAnswerClick: any;
  isCurrent: boolean;
  isWinner: boolean;
};

type PercentageProps = {
  percentage: number;
  isWinner: boolean;
};

const AnswerWrapper = styled.div.attrs<PercentageProps>(
  (props: PercentageProps) => ({
    style: {
      fontWeight: props.isWinner ? 'bold' : 'normal',
    },
  })
)<PercentageProps>`
  display: flex;
  width: 100%;
  user-select: none;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #bababa;
  cursor: pointer;
  position: relative;
  font-size: 1.2rem;
  height: 50px;
  &:hover {
    font-size: 1.25rem;
  }
`;

const Background = styled('div').attrs<PercentageProps>(
  (props: PercentageProps) => ({
    style: {
      background: props.isWinner ? '#a2fff4' : '#e8e8e8',
      width: `${props.percentage ? props.percentage : 0}%`,
    },
  })
)<PercentageProps>`
  position: absolute;
  left: 0;
  top: 0;
  transition: width 1s;
  height: 100%;
  z-index: -1;
`;

const CheckIcon = styled.img`
  width: 28px;
  margin-left: 10px;
`;

const AnswerText = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerVotes = styled.div``;

export default function AnswerComponent({
  index,
  text,
  percentage,
  onAnswerClick,
  isCurrent,
  isWinner,
}: Props) {
  return (
    <AnswerWrapper
      onClick={onAnswerClick(index)}
      percentage={percentage}
      isWinner={isWinner}
    >
      <Background percentage={percentage} isWinner={isWinner} />
      <AnswerText>
        {text} {isCurrent ? <CheckIcon src={check} /> : null}
      </AnswerText>
      {percentage > 0 ? <AnswerVotes>{percentage} %</AnswerVotes> : null}
    </AnswerWrapper>
  );
}
