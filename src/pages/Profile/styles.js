import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

export const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding: 36px 24px 80px;
  animation: ${fadeUp} 0.3s ease;

  form {
    display: flex;
    flex-direction: column;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,144,0,0.1);
    border-radius: 18px;
    padding: 28px;
    gap: 0;

    input {
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      height: 46px;
      padding: 0 16px;
      color: #f4ede8;
      margin: 0 0 12px;
      font-size: 14px;
      transition: border-color 0.2s, background 0.2s;

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

    hr {
      border: 0;
      height: 1px;
      background: rgba(255,255,255,0.06);
      margin: 16px 0;
    }

    button[type='submit'] {
      margin: 8px 0 0;
      height: 48px;
      background: linear-gradient(135deg, #ff9000, #e08000);
      color: #0f0d14;
      border: 0;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.5px;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 28px rgba(255,144,0,0.3);
      }
    }
  }
`;

export const AvatarInput = styled.div`
  align-self: center;
  margin-bottom: 28px;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid rgba(255,144,0,0.4);
    transition: border-color 0.2s;
  }

  label {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #ff9000;
    border: 2px solid #0f0d14;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover {
      background: #e08000;
      transform: scale(1.1);
    }

    input {
      display: none;
    }

    svg {
      color: #0f0d14;
    }
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,144,0,0.2);
  border-top-color: #ff9000;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: 80px auto;
`;
