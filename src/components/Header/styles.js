import styled from 'styled-components';

export const Container = styled.div`
  background: #0d0b12;
  border-bottom: 1px solid rgba(255, 144, 0, 0.12);
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
      color: #999591;
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
        color: #f4ede8;
      }

      &.active {
        color: #ff9000;
        border-bottom-color: #ff9000;
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
      color: #f4ede8;
      font-size: 14px;
      font-weight: 600;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #666360;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: #ff9000;
      }
    }
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(255, 144, 0, 0.4);
    transition: border-color 0.2s;

    &:hover {
      border-color: #ff9000;
    }
  }
`;

export const NavBadge = styled.span`
  background: #ff9000;
  color: #1a1720;
  font-size: 10px;
  font-weight: 800;
  border-radius: 10px;
  padding: 1px 6px;
  min-width: 18px;
  text-align: center;
`;
