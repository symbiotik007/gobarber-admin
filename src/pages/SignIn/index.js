import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Ingresa un correo válido')
    .required('El correo es obligatorio'),
  password: Yup.string().required('La contraseña es obligatoria'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Tu correo electrónico..." />
        <Input
          name="password"
          type="password"
          placeholder="Tu contraseña..."
        />

        <button type="submit">{!loading ? 'Ingresar' : 'Cargando...'}</button>

        <Link to="/register">Crear cuenta gratis</Link>
      </Form>
    </>
  );
}
