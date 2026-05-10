import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Brand, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Brand>
        <h1>TROYA</h1>
        <span>Admin Panel</span>
      </Brand>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
