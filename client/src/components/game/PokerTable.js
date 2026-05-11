import React from 'react';
import styled from 'styled-components';
import table from '../../assets/game/table.svg';

const StyledPokerTable = styled.img`
  display: block;
  pointer-events: none;
  width: 95%;
  margin: 0 auto;
`;

const PokerTable = () => <StyledPokerTable src={table} alt="Poker Table" />;

// ⚡ Bolt Performance Optimization:
// Wrapped the static PokerTable SVG component in React.memo so it does not
// unnecessarily re-render whenever parent state (like the current bet) changes.
export default React.memo(PokerTable);
