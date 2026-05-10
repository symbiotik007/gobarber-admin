import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  background: ${colors.bgDeepest};
  border-bottom: 1px solid rgba(79,142,247, 0.12);
  padding: 0 30px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  height: 68px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    gap: 24px;

    img {
      margin-right: 0;
      padding-right: 20px;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      filter: brightness(0) invert(1);
      opacity: 0.9;
    }

    a {
      font-weight: 600;
      color: ${colors.textSecondary};
      text-transform: uppercase;
      font-size: 13px;
      letter-spacing: 0.5px;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 0;
      border-bottom: 2px solid transparent;
      transition: color 0.2s, border-color 0.2s;

      &:hover {
        color: ${colors.textPrimary};
      }

      &.active {
        color: ${colors.primary};
        border-bottom-color: ${colors.primary};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  align-items: center;

  div {
    text-align: right;
    margin-right: 12px;

    strong {
      display: block;
      color: ${colors.textPrimary};
      font-size: 14px;
      font-weight: 600;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: ${colors.textMuted};
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${colors.primary};
      }
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(79,142,247, 0.4);
    transition: border-color 0.2s;

    &:hover {
      border-color: ${colors.primary};
    }
  }
`;

export const NavBadge = styled.span`
  background: ${colors.primary};
  color: ${colors.bgSurfaceAlt};
  font-size: 10px;
  font-weight: 800;
  border-radius: 10px;
  padding: 1px 6px;
  min-width: 18px;
  text-align: center;
`;
