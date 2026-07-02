import React from 'react';
import styled from 'styled-components';
import cards from './cards';

const StyledPokerCardWrapper = styled.div`
  display: inline-block;
  margin: 1rem 0.5rem;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
  transition: all 0.5s;

  @keyframes fadeInUp {
    from {
      -webkit-transform: translate3d(0, 40px, 0);
      transform: translate3d(0, 40px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInUp {
    from {
      -webkit-transform: translate3d(0, 40px, 0);
      transform: translate3d(0, 40px, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  img {
    width: ${({ width }) => width || '7vw'};
    max-width: ${({ maxWidth }) => maxWidth || '80px'};
    min-width: ${({ minWidth }) => minWidth || '50px'};
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const PokerCard = ({ card: { suit, rank }, width, minWidth, maxWidth }) => {
  const concat = suit + rank;

  return (
    <StyledPokerCardWrapper
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
    >
      <img src={cards[concat]} alt={concat} />
    </StyledPokerCardWrapper>
  );
};

// ⚡ Bolt: Custom comparison function to prevent unnecessary re-renders
// Deep compares the nested 'card' object (suit, rank) which often changes reference,
// while dynamically shallow comparing the rest of the props.
const areEqual = (prevProps, nextProps) => {
  // Deep compare the card object
  if (
    prevProps.card?.suit !== nextProps.card?.suit ||
    prevProps.card?.rank !== nextProps.card?.rank
  ) {
    return false;
  }

  // Shallow compare remaining props dynamically
  const prevKeys = Object.keys(prevProps).filter((key) => key !== 'card');
  const nextKeys = Object.keys(nextProps).filter((key) => key !== 'card');

  if (prevKeys.length !== nextKeys.length) return false;

  for (let i = 0; i < prevKeys.length; i++) {
    const key = prevKeys[i];
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }

  return true;
};

export default React.memo(PokerCard, areEqual);
