import styled, { keyframes, css } from 'styled-components';
import { colors } from '../../styles/colors';

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
  color: ${colors.textPrimary};
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
  background: ${colors.bgSurface};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: ${p => p.color || colors.textPrimary};
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
  background: ${colors.bgSurface};
  border: 2px solid transparent;
  border-radius: 10px;
  color: ${colors.textPrimary};
  font-size: 14px;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: ${colors.primary}; }
  &::placeholder { color: ${colors.textPlaceholder}; }
`;

export const FilterSelect = styled.select`
  padding: 10px 14px;
  background: ${colors.bgSurface};
  border: 2px solid transparent;
  border-radius: 10px;
  color: ${colors.textPrimary};
  font-size: 14px;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%234f8ef7' d='M5 7L1 3h8z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-color: ${colors.bgSurface};
  padding-right: 32px;
  &:focus { outline: none; border-color: ${colors.primary}; }
  option { background: ${colors.bgSurface}; }
`;

/* ─── Booking card ───────────────────────────────────────── */
export const statusColors = {
  PENDING_PAYMENT: { bg: 'rgba(255,193,7,0.1)',   border: 'rgba(255,193,7,0.3)',   dot: colors.warning,  label: 'Pendiente pago' },
  CONFIRMED:       { bg: 'rgba(76,175,80,0.1)',    border: 'rgba(76,175,80,0.3)',   dot: colors.success,  label: 'Confirmada' },
  COMPLETED:       { bg: 'rgba(100,100,100,0.1)',  border: 'rgba(100,100,100,0.2)', dot: colors.grayMid,  label: 'Completada' },
  CANCELLED:       { bg: 'rgba(244,67,54,0.08)',   border: 'rgba(244,67,54,0.2)',   dot: colors.error,    label: 'Cancelada' },
  EXPIRED:         { bg: 'rgba(100,100,100,0.08)', border: 'rgba(100,100,100,0.2)', dot: colors.grayDark, label: 'Expirada' },
  NO_SHOW:         { bg: 'rgba(244,67,54,0.08)',   border: 'rgba(244,67,54,0.2)',   dot: colors.error,    label: 'No se presentó' },
};

export const BookingCard = styled.div`
  background: ${p => (statusColors[p.status] && statusColors[p.status].bg) || colors.bgRaised};
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
  color: ${colors.textPrimary};
`;

export const ClientContact = styled.span`
  font-size: 13px;
  color: ${colors.textMuted};
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${p => (statusColors[p.status] && statusColors[p.status].bg) || colors.bgRaised};
  color: ${p => (statusColors[p.status] && statusColors[p.status].dot) || colors.textSecondary};
  border: 1px solid ${p => (statusColors[p.status] && statusColors[p.status].border) || 'transparent'};
  white-space: nowrap;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${p => (statusColors[p.status] && statusColors[p.status].dot) || colors.textSecondary};
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
  color: ${colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetaValue = styled.span`
  font-size: 14px;
  color: ${p => p.$highlight ? colors.primary : colors.textPrimary};
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
  background: ${colors.success};
  color: ${colors.white};
  &:hover:not(:disabled) { background: ${colors.successDark}; }
`;

export const BtnComplete = styled.button`
  ${btnBase}
  background: ${colors.primary};
  color: ${colors.bgSurfaceAlt};
  &:hover:not(:disabled) { background: ${colors.primaryDark}; }
`;

export const BtnNoShow = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(244,67,54,0.4);
  color: ${colors.error};
  &:hover:not(:disabled) { background: rgba(244,67,54,0.1); }
`;

export const BtnCancel = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: ${colors.textMuted};
  &:hover:not(:disabled) { color: ${colors.error}; border-color: rgba(244,67,54,0.3); }
`;

export const ReferenceCode = styled.span`
  font-family: monospace;
  font-size: 11px;
  color: ${colors.textPlaceholder};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${colors.textMuted};
  font-size: 15px;
`;

export const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(79,142,247,0.2);
  border-top-color: ${colors.primary};
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
  background: ${colors.bgCard};
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
  color: ${colors.textPrimary};
`;

export const ModalText = styled.p`
  font-size: 14px;
  color: ${colors.textMuted};
  line-height: 1.6;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  background: ${colors.bgSurface};
  border: 2px solid rgba(79,142,247,0.2);
  border-radius: 10px;
  color: ${colors.textPrimary};
  font-size: 14px;
  &:focus { outline: none; border-color: ${colors.primary}; }
  &::placeholder { color: ${colors.textPlaceholder}; }
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 10px;
`;

export const BtnPrimary = styled.button`
  ${btnBase}
  flex: 1;
  background: ${colors.success};
  color: ${colors.white};
  justify-content: center;
  &:hover { background: ${colors.successDark}; }
`;

export const BtnSecondary = styled.button`
  ${btnBase}
  flex: 1;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: ${colors.textMuted};
  justify-content: center;
  &:hover { color: ${colors.textPrimary}; }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  color: ${colors.textMuted};
  font-size: 14px;
`;

export const PageBtn = styled.button`
  ${btnBase}
  background: ${colors.bgSurface};
  color: ${colors.textPrimary};
  padding: 8px 14px;
  &:disabled { opacity: 0.3; cursor: not-allowed; }
  &:hover:not(:disabled) { background: ${colors.bgCard}; }
`;

export const ExportBtn = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(79,142,247,0.3);
  color: ${colors.primary};
  padding: 8px 16px;
  font-size: 13px;
  margin-left: auto;
  &:hover:not(:disabled) { background: rgba(79,142,247,0.08); }
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
  background: linear-gradient(135deg, ${colors.bgSurface}, ${colors.bgCard});
  border: 1px solid rgba(79,142,247,0.15);
  border-radius: 12px;
  padding: 16px 18px;
`;

export const RevenueLabel = styled.div`
  font-size: 11px;
  color: ${colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 6px;
`;

export const RevenueValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${p => p.color || colors.primary};
`;
