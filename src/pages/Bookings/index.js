import React, { useState, useEffect, useCallback } from 'react';
import { format, parseISO, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { MdCheck, MdClose, MdCheckCircle, MdErrorOutline, MdFileDownload } from 'react-icons/md';
import { toast } from 'react-toastify';
import api from '~/services/api';
import {
  Container, PageTitle, StatsBar, StatCard, StatLabel, StatValue,
  Filters, FilterInput, FilterSelect,
  BookingCard, CardTop, ClientInfo, ClientName, ClientContact,
  StatusBadge, CardMeta, MetaItem, MetaLabel, MetaValue,
  CardActions, BtnConfirm, BtnComplete, BtnNoShow, BtnCancel,
  ReferenceCode, EmptyState, Spinner,
  ConfirmModal, ModalBox, ModalTitle, ModalText, ModalInput, ModalActions,
  BtnPrimary, BtnSecondary,
  Pagination, PageBtn,
  ExportBtn, RevenueBar, RevenueCard, RevenueLabel, RevenueValue,
} from './styles';

const STATUS_LABELS = {
  PENDING_PAYMENT: 'Pendiente pago',
  CONFIRMED: 'Confirmada',
  COMPLETED: 'Completada',
  CANCELLED: 'Cancelada',
  EXPIRED: 'Expirada',
  NO_SHOW: 'No se presentó',
};

function fmt(n) {
  return '$' + Number(n).toLocaleString('es-CO');
}

function fmtDate(iso) {
  return format(parseISO(iso), "dd MMM yyyy 'a las' HH:mm'h'", { locale: es });
}

function safeGet(obj) {
  return obj || {};
}

export default function Bookings() {
  var [bookings, setBookings] = useState([]);
  var [stats, setStats] = useState({ pending: 0, confirmed: 0, completed: 0, noShow: 0 });
  var [revenue, setRevenue] = useState({ deposits: 0, balance: 0, noShowDeposits: 0 });
  var [loading, setLoading] = useState(true);
  var [exporting, setExporting] = useState(false);
  var [page, setPage] = useState(1);
  var [totalPages, setTotalPages] = useState(1);

  var [filterDate, setFilterDate] = useState('');
  var [filterStatus, setFilterStatus] = useState('');
  var [filterBranch, setFilterBranch] = useState('');
  var [branches, setBranches] = useState([]);

  var [modal, setModal] = useState(null);
  var [txId, setTxId] = useState('');
  var [actionLoading, setActionLoading] = useState(false);

  useEffect(function() {
    api.get('/admin/branches').then(function(r) { setBranches(r.data); }).catch(function() {});
  }, []);

  var load = useCallback(function() {
    setLoading(true);
    var params = { page: page };
    if (filterDate) params.date = filterDate;
    if (filterStatus) params.status = filterStatus;
    if (filterBranch) params.branch_id = filterBranch;

    var from30 = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    var today = format(new Date(), 'yyyy-MM-dd');

    Promise.all([
      api.get('/admin/bookings', { params: params }),
      api.get('/admin/bookings/stats', { params: { from: from30, to: today } }),
    ])
      .then(function(results) {
        var bookingsRes = results[0];
        var statsRes = results[1];

        setBookings(bookingsRes.data.bookings);
        setTotalPages(bookingsRes.data.pages);

        var s = statsRes.data;
        setStats({
          pending:   s.pending || 0,
          confirmed: s.confirmed || 0,
          completed: s.completed || 0,
          noShow:    s.no_show || 0,
        });
        setRevenue({
          deposits:       s.revenue_deposits || 0,
          balance:        s.revenue_balance || 0,
          noShowDeposits: (s.no_show || 0) > 0 ? s.revenue_deposits : 0,
        });
      })
      .catch(function() {
        toast.error('Error al cargar reservas.');
      })
      .finally(function() {
        setLoading(false);
      });
  }, [page, filterDate, filterStatus, filterBranch]);

  useEffect(function() { load(); }, [load]);

  useEffect(function() {
    var t = setInterval(load, 20000);
    return function() { clearInterval(t); };
  }, [load]);

  function handleExport() {
    setExporting(true);
    var params = {};
    if (filterDate) { params.from = filterDate; params.to = filterDate; }
    if (filterStatus) params.status = filterStatus;

    api.get('/admin/bookings/export', { params: params, responseType: 'blob' })
      .then(function(res) {
        var url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
        var a = document.createElement('a');
        a.href = url;
        a.download = 'reservas-' + format(new Date(), 'yyyyMMdd') + '.csv';
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(function() {
        toast.error('Error al exportar.');
      })
      .finally(function() {
        setExporting(false);
      });
  }

  function handleConfirmPayment() {
    setActionLoading(true);
    api.post('/admin/bookings/' + modal.id + '/confirm', { transaction_id: txId || undefined })
      .then(function() {
        toast.success('Pago confirmado. Reserva confirmada.');
        setModal(null);
        setTxId('');
        load();
      })
      .catch(function(e) {
        var msg = e.response && e.response.data && e.response.data.error;
        toast.error(msg || 'Error al confirmar.');
      })
      .finally(function() {
        setActionLoading(false);
      });
  }

  function handleStatus(id, status, label) {
    if (!window.confirm('¿Marcar esta reserva como "' + label + '"?')) return;
    api.patch('/admin/bookings/' + id + '/status', { status: status })
      .then(function() {
        toast.success('Reserva marcada como ' + label + '.');
        load();
      })
      .catch(function(e) {
        var msg = e.response && e.response.data && e.response.data.error;
        toast.error(msg || 'Error.');
      });
  }

  function getApprovedPayment(b) {
    if (!b.payments) return null;
    return b.payments.find(function(p) { return p.status === 'APPROVED'; });
  }

  function getPendingPayment(b) {
    if (!b.payments) return null;
    return b.payments.find(function(p) { return p.status === 'PENDING'; });
  }

  function getFirstPaymentRef(b) {
    if (!b.payments || !b.payments[0]) return '—';
    return b.payments[0].reference;
  }

  var ACTIVE_STATUSES = ['PENDING_PAYMENT', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  var displayBookings = filterStatus
    ? bookings
    : bookings.filter(function(b) { return ACTIVE_STATUSES.includes(b.status); });

  return (
    <Container>
      <PageTitle>Reservas</PageTitle>

      <StatsBar>
        <StatCard>
          <StatLabel>Pendientes</StatLabel>
          <StatValue color="#ffc107">{stats.pending}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Confirmadas</StatLabel>
          <StatValue color="#4caf50">{stats.confirmed}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Completadas</StatLabel>
          <StatValue color="#ff9000">{stats.completed}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>No se presentaron</StatLabel>
          <StatValue color="#f44336">{stats.noShow}</StatValue>
        </StatCard>
      </StatsBar>

      <RevenueBar>
        <RevenueCard>
          <RevenueLabel>Anticipos cobrados (30d)</RevenueLabel>
          <RevenueValue>{fmt(revenue.deposits)}</RevenueValue>
        </RevenueCard>
        <RevenueCard>
          <RevenueLabel>Saldo pendiente por cobrar</RevenueLabel>
          <RevenueValue color="#4caf50">{fmt(revenue.balance)}</RevenueValue>
        </RevenueCard>
        <RevenueCard>
          <RevenueLabel>No-shows (anticipos perdidos)</RevenueLabel>
          <RevenueValue color="#f44336">{stats.noShow} citas</RevenueValue>
        </RevenueCard>
      </RevenueBar>

      <Filters>
        <FilterInput
          type="date"
          value={filterDate}
          onChange={function(e) { setFilterDate(e.target.value); setPage(1); }}
        />
        <FilterSelect
          value={filterStatus}
          onChange={function(e) { setFilterStatus(e.target.value); setPage(1); }}
        >
          <option value="">Pendientes · Confirmadas · Completadas · Canceladas</option>
          {Object.entries(STATUS_LABELS).map(function(entry) {
            return <option key={entry[0]} value={entry[0]}>{entry[1]}</option>;
          })}
        </FilterSelect>
        {branches.length > 0 && (
          <FilterSelect
            value={filterBranch}
            onChange={function(e) { setFilterBranch(e.target.value); setPage(1); }}
          >
            <option value="">Todas las sucursales</option>
            {branches.map(function(br) {
              return <option key={br.id} value={br.id}>{br.name}</option>;
            })}
          </FilterSelect>
        )}
        <ExportBtn onClick={handleExport} disabled={exporting}>
          <MdFileDownload size={16} />
          {exporting ? 'Exportando...' : 'Exportar CSV'}
        </ExportBtn>
      </Filters>

      {loading ? (
        <Spinner />
      ) : displayBookings.length === 0 ? (
        <EmptyState>No hay reservas {filterStatus ? 'para el estado seleccionado' : 'activas en este momento'}.</EmptyState>
      ) : (
        displayBookings.map(function(b) {
          var paid = getApprovedPayment(b);
          var pending = getPendingPayment(b);
          var saldo = b.total_amount - (paid ? paid.amount : 0);
          var customer = safeGet(b.guest_customer);
          var service = safeGet(b.service);
          var barber = safeGet(b.barber);

          return (
            <BookingCard key={b.id} status={b.status}>
              <CardTop>
                <ClientInfo>
                  <ClientName>{customer.name || '—'}</ClientName>
                  <ClientContact>
                    {customer.phone} · {customer.email}
                  </ClientContact>
                  <ReferenceCode>{b.reference}</ReferenceCode>
                </ClientInfo>
                <StatusBadge status={b.status}>
                  {STATUS_LABELS[b.status] || b.status}
                </StatusBadge>
              </CardTop>

              <CardMeta>
                <MetaItem>
                  <MetaLabel>Fecha</MetaLabel>
                  <MetaValue $bold>{fmtDate(b.date)}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Servicio</MetaLabel>
                  <MetaValue>{service.name}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Barbero</MetaLabel>
                  <MetaValue>{barber.name}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Anticipo pagado</MetaLabel>
                  <MetaValue highlight={!!paid}>
                    {paid
                      ? fmt(paid.amount)
                      : pending
                        ? fmt(pending.amount) + ' (pendiente)'
                        : '—'
                    }
                  </MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Saldo restante</MetaLabel>
                  <MetaValue>{fmt(saldo)}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Total servicio</MetaLabel>
                  <MetaValue>{fmt(b.total_amount)}</MetaValue>
                </MetaItem>
              </CardMeta>

              <CardActions>
                {b.status === 'PENDING_PAYMENT' && (
                  <BtnConfirm onClick={function() { setModal(b); }}>
                    <MdCheck size={16} /> Confirmar pago
                  </BtnConfirm>
                )}
                {b.status === 'CONFIRMED' && (
                  <React.Fragment>
                    <BtnComplete onClick={function() { handleStatus(b.id, 'COMPLETED', 'Confirmada'); }}>
                      <MdCheckCircle size={16} /> Confirmar cita
                    </BtnComplete>
                    <BtnNoShow onClick={function() { handleStatus(b.id, 'NO_SHOW', 'No se presentó'); }}>
                      <MdErrorOutline size={16} /> No se presentó
                    </BtnNoShow>
                  </React.Fragment>
                )}
                {(b.status === 'PENDING_PAYMENT' || b.status === 'CONFIRMED') && (
                  <BtnCancel onClick={function() { handleStatus(b.id, 'CANCELLED', 'Cancelada'); }}>
                    <MdClose size={16} /> Cancelar
                  </BtnCancel>
                )}
              </CardActions>
            </BookingCard>
          );
        })
      )}

      {totalPages > 1 && (
        <Pagination>
          <PageBtn disabled={page === 1} onClick={function() { setPage(function(p) { return p - 1; }); }}>
            ← Anterior
          </PageBtn>
          <span>Página {page} de {totalPages}</span>
          <PageBtn disabled={page >= totalPages} onClick={function() { setPage(function(p) { return p + 1; }); }}>
            Siguiente →
          </PageBtn>
        </Pagination>
      )}

      {modal && (
        <ConfirmModal onClick={function(e) { if (e.target === e.currentTarget) setModal(null); }}>
          <ModalBox>
            <ModalTitle>Confirmar pago recibido</ModalTitle>
            <ModalText>
              Cliente: <strong>{safeGet(modal.guest_customer).name}</strong><br />
              Anticipo: <strong style={{ color: '#ff9000' }}>{fmt(modal.deposit_amount)}</strong><br />
              Referencia: <strong>{getFirstPaymentRef(modal)}</strong>
            </ModalText>
            <ModalInput
              placeholder="ID de transacción (opcional)"
              value={txId}
              onChange={function(e) { setTxId(e.target.value); }}
            />
            <ModalActions>
              <BtnSecondary onClick={function() { setModal(null); setTxId(''); }}>
                Cancelar
              </BtnSecondary>
              <BtnPrimary onClick={handleConfirmPayment} disabled={actionLoading}>
                {actionLoading ? 'Confirmando...' : 'Confirmar pago'}
              </BtnPrimary>
            </ModalActions>
          </ModalBox>
        </ConfirmModal>
      )}
    </Container>
  );
}
