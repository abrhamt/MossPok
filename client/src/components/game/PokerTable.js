import React, { memo } from 'react';
import styled from 'styled-components';
import table from '../../assets/game/table.svg';

const StyledPokerTable = styled.img`
  display: block;
  pointer-events: none;
  width: 95%;
  margin: 0 auto;
`;

const PokerTable = () => <StyledPokerTable src={table} alt="Poker Table" />;

// ⚡ Bolt: Memoize PokerTable to prevent unnecessary re-renders. The table itself is static and never changes its props.
export default memo(PokerTable);
