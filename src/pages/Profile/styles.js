import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/colors';

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
    border: 1px solid rgba(79,142,247,0.1);
    border-radius: 18px;
    padding: 28px;
    gap: 0;

    input {
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      height: 46px;
      padding: 0 16px;
      color: ${colors.textPrimary};
      margin: 0 0 12px;
      font-size: 14px;
      transition: border-color 0.2s, background 0.2s;

      &:focus {
        border-color: ${colors.primary};
        background: rgba(79,142,247,0.05);
      }

      &::placeholder {
        color: ${colors.textPlaceholder};
      }
    }

    span {
      color: ${colors.errorSoft};
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
      background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
      color: ${colors.bgBase};
      border: 0;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 800;
      letter-spacing: 0.5px;
      transition: all 0.2s;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 28px rgba(79,142,247,0.3);
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
    border: 3px solid rgba(79,142,247,0.4);
    transition: border-color 0.2s;
  }

  label {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: ${colors.primary};
    border: 2px solid ${colors.bgBase};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;

    &:hover {
      background: ${colors.primaryDark};
      transform: scale(1.1);
    }

    input {
      display: none;
    }

    svg {
      color: ${colors.bgBase};
    }
  }
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(79,142,247,0.2);
  border-top-color: ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: 80px auto;
`;
