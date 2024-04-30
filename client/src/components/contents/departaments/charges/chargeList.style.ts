import styled from "styled-components";

export const ChargesListHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ChargesRequestListActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;

export const ChargesButtonsHeader = styled.div`
  display: flex;
  justify-content: "flex-end";
`;

export const LeftHeaderButton = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export default {
  ChargesListHeaderWrapper,
  ChargesButtonsHeader,
  LeftHeaderButton,
};
