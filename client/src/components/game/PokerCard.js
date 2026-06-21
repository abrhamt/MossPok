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

/**
 * ⚡ Bolt Performance Optimization:
 * Custom comparison function to deep compare the `card` object and dynamically shallow compare other props.
 * This prevents unnecessary re-renders when the parent component passes new object references for the `card` prop,
 * which happens frequently during game updates.
 * Impact: Significantly reduces React re-renders for card components on the board and in players' hands.
 */
const areEqual = (prevProps, nextProps) => {
  // Deep compare the specific nested object properties
  if (
    prevProps.card?.suit !== nextProps.card?.suit ||
    prevProps.card?.rank !== nextProps.card?.rank
  ) {
    return false;
  }

  // Dynamically shallow compare all other properties to be future-proof
  const allKeys = new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  for (const key of allKeys) {
    if (key === 'card') continue; // Handled above
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }

  return true;
};

export default React.memo(PokerCard, areEqual);
