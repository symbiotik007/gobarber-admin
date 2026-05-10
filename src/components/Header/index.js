import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Container, Content, Profile, NavBadge } from './styles';
import Notifications from '~/components/Notifications';
import api from '~/services/api';
import logo from '~/assets/images/logo-interna.svg';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const pathname = window.pathname;
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    async function fetchPending() {
      try {
        const today = format(new Date(), 'yyyy-MM-dd');
        const { data } = await api.get('/admin/bookings', {
          params: { status: 'PENDING_PAYMENT', date: today, page: 1 },
        });
        setPendingCount(data.total || 0);
      } catch {
        // silencioso
      }
    }

    fetchPending();
    const interval = setInterval(fetchPending, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>
            Agenda
          </Link>
          <Link to="/bookings" className={pathname === '/bookings' ? 'active' : ''}>
            Reservas
            {pendingCount > 0 && <NavBadge>{pendingCount}</NavBadge>}
          </Link>
          <Link to="/settings" className={pathname === '/settings' ? 'active' : ''}>
            Configuración
          </Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Mi perfil</Link>
            </div>
            <img
              src={
                (profile.avatar && profile.avatar.url) ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=ff9000&color=1a1720&size=64`
              }
              alt={profile.name}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
