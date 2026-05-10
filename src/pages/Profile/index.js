import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';
import AvatarInput from './AvatarInput';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" type="text" placeholder="Nombre completo" />
        <Input name="email" type="email" placeholder="Tu correo electrónico" />

        <hr />

        <Input
          name="oldPassword"
          type="password"
          placeholder="Contraseña actual"
        />

        <Input name="password" type="password" placeholder="Nueva contraseña" />

        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirma tu nueva contraseña"
        />

        <button type="submit">Actualizar perfil</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Salir de GoBarber
      </button>
    </Container>
  );
}
