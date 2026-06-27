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
 * ⚡ Bolt Performance Optimization
 * Added React.memo with a custom comparison function to prevent unnecessary re-renders of the PokerCard.
 * This is crucial because presentational components often receive inline object props (like 'card')
 * which change reference frequently, triggering re-renders even when the underlying data is identical.
 * By doing a deep comparison on 'card' and shallow comparison on the rest dynamically, we ensure
 * stable performance without making it brittle to future prop changes.
 */
const areEqual = (prevProps, nextProps) => {
  // Deep compare the specific nested object
  if (
    prevProps.card?.suit !== nextProps.card?.suit ||
    prevProps.card?.rank !== nextProps.card?.rank
  ) {
    return false;
  }

  // Dynamic shallow comparison for remaining props
  const allKeys = new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  for (const key of allKeys) {
    if (key !== 'card' && prevProps[key] !== nextProps[key]) {
      return false;
    }
  }

  return true;
};

export default React.memo(PokerCard, areEqual);
