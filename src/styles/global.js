import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  body, html {
    height: auto;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #0f0d14;
    color: #f4ede8;
    background-image: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,144,0,0.07) 0%, transparent 70%),
      radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 100% 100%, 28px 28px;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 10px 0 20px;
  }
`;
