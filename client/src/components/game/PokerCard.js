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

/*
 * ⚡ BOLT OPTIMIZATION
 * 💡 What: Wrapped PokerCard in React.memo with a custom comparison function.
 * 🎯 Why: PokerCard is frequently re-rendered by parent components (like Seat or Hand)
 *         due to inline object props (`card`) changing references. This prevents
 *         unnecessary re-renders when the actual card values haven't changed.
 * 📊 Impact: Significantly reduces React render cycle overhead during game state updates.
 * 🔬 Measurement: Verify via React Profiler that PokerCard skips renders when
 *                 parent state changes but card data remains identical.
 */
const areEqual = (prevProps, nextProps) => {
  // Deep compare the nested 'card' object properties
  if (
    prevProps.card?.suit !== nextProps.card?.suit ||
    prevProps.card?.rank !== nextProps.card?.rank
  ) {
    return false;
  }

  // Dynamically shallow compare all other props
  const prevKeys = Object.keys(prevProps).filter((k) => k !== 'card');
  const nextKeys = Object.keys(nextProps).filter((k) => k !== 'card');

  if (prevKeys.length !== nextKeys.length) return false;

  for (let key of prevKeys) {
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }

  return true;
};

export default React.memo(PokerCard, areEqual);
