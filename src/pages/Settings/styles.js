import styled, { keyframes, css } from 'styled-components';
import { colors } from '../../styles/colors';

const fadeIn = keyframes`from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); }`;
const spin = keyframes`from { transform:rotate(0deg); } to { transform:rotate(360deg); }`;

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 80px;
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 32px;
`;

export const TabBar = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 28px;
  border-bottom: 1px solid ${colors.bgElevated};
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export const Tab = styled.button`
  padding: 10px 18px;
  background: none;
  border: none;
  border-bottom: 2px solid ${p => p.active ? colors.primary : 'transparent'};
  color: ${p => p.active ? colors.primary : colors.textMuted};
  font-size: 14px;
  font-weight: ${p => p.active ? '600' : '400'};
  cursor: pointer;
  white-space: nowrap;
  margin-bottom: -1px;
  transition: all 0.2s;
  &:hover { color: ${colors.textPrimary}; }
`;

export const Section = styled.div`
  animation: ${fadeIn} 0.25s ease;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
  margin-top: 28px;
  &:first-child { margin-top: 0; }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${p => p.cols ? `repeat(${p.cols}, 1fr)` : '1fr'};
  gap: 16px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: ${colors.textSecondary};
  font-weight: 500;
`;

export const Input = styled.input`
  padding: 12px 14px;
  background: ${colors.bgSurface};
  border: 2px solid ${p => p.error ? colors.errorSoft : 'rgba(79,142,247,0.15)'};
  border-radius: 10px;
  color: ${colors.textPrimary};
  font-size: 14px;
  transition: border-color 0.2s;
  &:focus { outline: none; border-color: ${colors.primary}; }
  &::placeholder { color: ${colors.textPlaceholder}; }
`;

export const Select = styled.select`
  padding: 12px 14px;
  background: ${colors.bgSurface};
  border: 2px solid rgba(79,142,247,0.15);
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

export const Hint = styled.span`
  font-size: 11px;
  color: ${colors.textPlaceholder};
  line-height: 1.4;
`;

const btnBase = css`
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const SaveBtn = styled.button`
  ${btnBase}
  background: ${colors.primary};
  color: ${colors.bgSurfaceAlt};
  &:hover:not(:disabled) { background: ${colors.primaryDark}; }
`;

export const DangerBtn = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(244,67,54,0.4);
  color: ${colors.error};
  &:hover:not(:disabled) { background: rgba(244,67,54,0.1); }
`;

export const GhostBtn = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(79,142,247,0.3);
  color: ${colors.primary};
  &:hover:not(:disabled) { background: rgba(79,142,247,0.08); }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(79,142,247,0.2);
  border-top-color: ${colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const SuccessMsg = styled.div`
  background: rgba(76,175,80,0.1);
  border: 1px solid rgba(76,175,80,0.3);
  border-radius: 10px;
  padding: 12px 16px;
  color: ${colors.success};
  font-size: 13px;
  margin-top: 12px;
  animation: ${fadeIn} 0.2s ease;
`;

/* ─── Services table ──────────────────────────────────────── */
export const ServiceTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ServiceRow = styled.div`
  background: ${colors.bgSurface};
  border-radius: 12px;
  padding: 16px 20px;
  display: grid;
  grid-template-columns: 1fr auto auto auto auto auto;
  align-items: center;
  gap: 12px;
  animation: ${fadeIn} 0.2s ease;
  @media (max-width: 700px) { grid-template-columns: 1fr; }
`;

export const ServiceName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.textPrimary};
`;

export const ServiceDetail = styled.span`
  font-size: 13px;
  color: ${colors.textMuted};
  white-space: nowrap;
`;

export const StatusToggle = styled.button`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: ${p => p.active ? 'rgba(76,175,80,0.15)' : 'rgba(244,67,54,0.1)'};
  color: ${p => p.active ? colors.success : colors.error};
  transition: all 0.2s;
  white-space: nowrap;
`;

export const EditBtn = styled.button`
  ${btnBase}
  padding: 6px 12px;
  font-size: 12px;
  background: rgba(79,142,247,0.1);
  color: ${colors.primary};
  &:hover { background: rgba(79,142,247,0.2); }
`;

/* ─── Modal ───────────────────────────────────────────────── */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
`;

export const Modal = styled.div`
  background: ${colors.bgCard};
  border-radius: 16px;
  padding: 28px;
  width: 100%;
  max-width: 480px;
  animation: ${fadeIn} 0.2s ease;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.textPrimary};
  margin-bottom: 20px;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

export const CancelBtn = styled.button`
  ${btnBase}
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: ${colors.textMuted};
  &:hover { color: ${colors.textPrimary}; }
`;

export const LoadingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
`;
