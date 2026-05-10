import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 32px rgba(255,144,0,0.15); }
  50%       { box-shadow: 0 0 52px rgba(255,144,0,0.28); }
`;

export const Wrapper = styled.div`
  min-height: 100vh;
  background: #0f0d14;
  background-image:
    radial-gradient(ellipse 70% 55% at 50% -5%, rgba(255,144,0,0.1) 0%, transparent 65%),
    radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 100% 100%, 28px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const Brand = styled.div`
  margin-bottom: 36px;
  text-align: center;
  animation: ${fadeUp} 0.5s ease;

  h1 {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: 6px;
    text-transform: uppercase;
    background: linear-gradient(135deg, #ff9000, #ffb800);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
    margin-bottom: 4px;
  }

  span {
    font-size: 11px;
    color: #4a4757;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 340px;
  animation: ${fadeUp} 0.5s ease 0.1s both;

  form {
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,144,0,0.12);
    border-radius: 20px;
    padding: 32px 28px;
    animation: ${glowPulse} 4s ease infinite;

    input {
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      height: 46px;
      padding: 0 16px;
      color: #f4ede8;
      margin: 0 0 12px;
      font-size: 14px;
      transition: border-color 0.2s;

      &:focus {
        border-color: #ff9000;
        background: rgba(255,144,0,0.05);
      }

      &::placeholder {
        color: #4a4757;
      }
    }

    span {
      color: #e05555;
      align-self: flex-start;
      margin: 0 0 10px;
      font-size: 12px;
      font-weight: 600;
    }

    button {
      margin: 8px 0 0;
      height: 48px;
      background: linear-gradient(135deg, #ff9000, #e08000);
      color: #0f0d14;
      border: 0;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 28px rgba(255,144,0,0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }

    a {
      color: #666360;
      margin-top: 18px;
      font-size: 13px;
      text-align: center;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #ff9000;
      }
    }
  }
`;
