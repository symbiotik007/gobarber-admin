import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 24px 80px;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;
    background: #232129;
    border: 1px solid rgba(255, 144, 0, 0.15);
    border-radius: 14px;
    padding: 10px 8px;
    gap: 4px;

    button {
      border: 0;
      background: none;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      color: #666360;
      transition: background 0.2s, color 0.2s;

      &:hover {
        background: rgba(255, 144, 0, 0.1);
        color: #ff9000;
      }

      svg {
        color: inherit;
      }
    }

    strong {
      color: #f4ede8;
      font-size: 18px;
      font-weight: 700;
      margin: 0 16px;
      min-width: 180px;
      text-align: center;
      letter-spacing: 0.3px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 12px;
    margin-top: 28px;

    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const Time = styled.li`
  padding: 20px 22px;
  border-radius: 14px;
  background: #232129;
  border: 1px solid ${props =>
    props.available
      ? 'rgba(255,255,255,0.04)'
      : 'rgba(255, 144, 0, 0.2)'};
  opacity: ${props => (props.past ? 0.45 : 1)};
  animation: ${fadeIn} 0.2s ease;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;

  ${props =>
    !props.past &&
    !props.available &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 144, 0, 0.12);
      border-color: rgba(255, 144, 0, 0.4);
    }
  `}

  strong {
    display: block;
    color: ${props => (props.available ? '#4a4757' : '#ff9000')};
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  span {
    display: block;
    color: ${props => (props.available ? '#3d3b44' : '#f4ede8')};
    font-size: 14px;
    font-weight: ${props => (props.available ? '400' : '500')};
  }
`;
