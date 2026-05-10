import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/images/logo.svg';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio.'),
  email: Yup.string()
    .email('Ingresa un correo válido')
    .required('El correo es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener 6 caracteres o más')
    .required('La contraseña es obligatoria'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          placeholder="Tu nombre completo"
        />
        <Input
          name="email"
          type="email"
          placeholder="Tu correo electrónico"
        />
        <Input
          name="password"
          type="password"
          placeholder="Tu contraseña"
        />

        <button type="submit">Crear cuenta</button>

        <Link to="/">Ya tengo cuenta</Link>
      </Form>
    </>
  );
}
