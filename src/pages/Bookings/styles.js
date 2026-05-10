import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;
const spin = keyframes`from { transform: rotate(0deg); } to { transform: rotate(360deg); }`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 80px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #f4ede8;
  margin-bottom: 24px;
`;

/* ─── Stats bar ──────────────────────────────────────────── */
export const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 28px;

  @media (max-width: 640px) { grid-template-columns: repeat(2, 1fr); }
`;

export const StatCard = styled.div`
  background: #181620;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: #666360;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${p => p.color || '#f4ede8'};
`;

/* ─── Filters ────────────────────────────────────────────── */
export const Filters = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  align-items: center;
`;

export const FilterInput = styled.input`
  padding: 10px 14px;
  background: #181620;
  border: 2px solid transparent;
  border-radius: 10px;
  color: #f4ede8;
  font-size: 14px;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: #ff9000; }
  &::placeholder { color: #4a4757; }
`;

export const FilterSelect = styled.select`
  padding: 10px 14px;
  background: #181620;
  border: 2px solid transparent;
  border-radius: 10px;
  color: #f4ede8;
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23ff9000' d='M5 7L1 3h8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-color: #181620;
  padding-right: 32px;
  &:focus { outline: none; border-color: #ff9000; }
  option { background: #181620; }
`;

/* ─── Booking card ───────────────────────────────────────── */
const statusColors = {
  PENDING_PAYMENT: { bg: 'rgba(255,193,7,0.1)', border: 'rgba(255,193,7,0.3)', dot: '#ffc107', label: 'Pendiente pago' },
  CONFIRMED:       { bg: 'rgba(76,175,80,0.1)',  border: 'rgba(76,175,80,0.3)',  dot: '#4caf50', label: 'Confirmada' },
  COMPLETED:       { bg: 'rgba(100,100,100,0.1)',border: 'rgba(100,100,100,0.2)',dot: '#888',    label: 'Completada' },
  CANCELLED:       { bg: 'rgba(244,67,54,0.08)', border: 'rgba(244,67,54,0.2)', dot: '#f44336', label: 'Cancelada' },
  EXPIRED:         { bg: 'rgba(100,100,100,0.08)',border:'rgba(100,100,100,0.2)',dot: '#555',    label: 'Expirada' },
  NO_SHOW:         { bg: 'rgba(244,67,54,0.08)', border: 'rgba(244,67,54,0.2)', dot: '#f44336', label: 'No se presentó' },
};

export const BookingCard = styled.div`
  background: ${p => (statusColors[p.status] && statusColors[p.status].bg) || '#232129'};
  border: 1px solid ${p => (statusColors[p.status] && statusColors[p.status].border) || 'transparent'};
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 12px;
  animation: ${fadeIn} 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ClientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const ClientName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #f4ede8;
`;

export const ClientContact = styled.span`
  font-size: 13px;
  color: #666360;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${p => (statusColors[p.status] && statusColors[p.status].bg) || '#232129'};
  color: ${p => (statusColors[p.status] && statusColors[p.status].dot) || '#999'};
  border: 1px solid ${p => (statusColors[p.status] && statusColors[p.status].border) || 'transparent'};
  white-space: nowrap;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => (statusColors[p.status] && statusColors[p.status].dot) || '#999'};
    ${p => p.status === 'PENDING_PAYMENT' && css`
      animation: ${spin} 2s linear infinite;
      border: 2px solid currentColor;
      background: transparent;
    `}
  }
`;

export const CardMeta = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MetaLabel = styled.span`
  font-size: 11px;
  color: #666360;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetaValue = styled.span`
  font-size: 14px;
  color: ${p => p.$highlight ? '#ff9000' : '#f4ede8'};
  font-weight: ${p => (p.$highlight || p.$bold) ? '700' : '400'};
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const btnBase = css`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const BtnConfirm = styled.button`
  ${btnBase}
  background: #4caf50;
  color: #fff;
  &:hover:not(:disabled) { background: #43a047; }
`;

export const BtnComplete = styled.button`
  ${btnBase}
  background: #ff9000;
  color: #1a1720;
  &:hover:not(:disabled) { background: #e08000; }
`;

export const BtnNoShow = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(244,67,54,0.4);
  color: #f44336;
  &:hover:not(:disabled) { background: rgba(244,67,54,0.1); }
`;

export const BtnCancel = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #666360;
  &:hover:not(:disabled) { color: #f44336; border-color: rgba(244,67,54,0.3); }
`;

export const ReferenceCode = styled.span`
  font-family: monospace;
  font-size: 11px;
  color: #4a4757;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666360;
  font-size: 15px;
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,144,0,0.2);
  border-top-color: #ff9000;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: 60px auto;
`;

export const ConfirmModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

export const ModalBox = styled.div`
  background: #1e1c28;
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #f4ede8;
`;

export const ModalText = styled.p`
  font-size: 14px;
  color: #666360;
  line-height: 1.6;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  background: #181620;
  border: 2px solid rgba(255,144,0,0.2);
  border-radius: 10px;
  color: #f4ede8;
  font-size: 14px;
  &:focus { outline: none; border-color: #ff9000; }
  &::placeholder { color: #4a4757; }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const BtnPrimary = styled.button`
  ${btnBase}
  flex: 1;
  background: #4caf50;
  color: #fff;
  justify-content: center;
  &:hover { background: #43a047; }
`;

export const BtnSecondary = styled.button`
  ${btnBase}
  flex: 1;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: #666360;
  justify-content: center;
  &:hover { color: #f4ede8; }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  color: #666360;
  font-size: 14px;
`;

export const PageBtn = styled.button`
  ${btnBase}
  background: #181620;
  color: #f4ede8;
  padding: 8px 14px;
  &:disabled { opacity: 0.3; cursor: not-allowed; }
  &:hover:not(:disabled) { background: #1e1c28; }
`;

export const ExportBtn = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(255,144,0,0.3);
  color: #ff9000;
  padding: 8px 16px;
  font-size: 13px;
  margin-left: auto;
  &:hover:not(:disabled) { background: rgba(255,144,0,0.08); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const RevenueBar = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const RevenueCard = styled.div`
  background: linear-gradient(135deg, #181620, #1e1c28);
  border: 1px solid rgba(255,144,0,0.15);
  border-radius: 12px;
  padding: 16px 18px;
`;

export const RevenueLabel = styled.div`
  font-size: 11px;
  color: #666360;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
`;

export const RevenueValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.color || '#ff9000'};
`;
