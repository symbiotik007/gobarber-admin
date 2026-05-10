import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { MdSave, MdAdd, MdEdit, MdStoreMallDirectory, MdDelete, MdSecurity, MdContentCut } from 'react-icons/md';
import api from '~/services/api';
import {
  Container, PageTitle, TabBar, Tab, Section, SectionTitle,
  FormGrid, FormGroup, Label, Input, Select, Hint,
  SaveBtn, GhostBtn, Actions, Spinner, SuccessMsg,
  ServiceTable, ServiceRow, ServiceName, ServiceDetail, StatusToggle, EditBtn,
  Overlay, Modal, ModalTitle, ModalActions, CancelBtn, LoadingWrap,
} from './styles';

const TABS = ['Pagos', 'Reservas', 'Horarios', 'Servicios', 'Sucursales', 'Negocio', 'Barberos'];

var EMPTY_SERVICE = {
  name: '', duration_minutes: 30, price: 0,
  deposit_min: 0, deposit_max: 0, deposit_percentage_max: 30, is_active: true,
};

function fmt(n) { return '$' + Number(n).toLocaleString('es-CO'); }

/* ─── Tab: Pagos ─────────────────────────────────────────── */
function PaymentTab({ settings, onSave, saving }) {
  var [form, setForm] = useState({
    payment_provider: settings.payment_provider || 'llave',
    llave_number: settings.llave_number || '',
    llave_owner: settings.llave_owner || '',
    llave_bank: settings.llave_bank || 'Nequi',
  });
  var [saved, setSaved] = useState(false);

  function handleSave() {
    if (!form.llave_number) { toast.error('Ingresa el número de llave.'); return; }
    onSave(form, function() { setSaved(true); setTimeout(function() { setSaved(false); }, 3000); });
  }

  return (
    <Section>
      <SectionTitle>Proveedor de pagos</SectionTitle>
      <FormGrid>
        <FormGroup>
          <Label>Proveedor activo</Label>
          <Select value={form.payment_provider} onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { payment_provider: e.target.value }); }); }}>
            <option value="llave">Llave Bre-B (manual)</option>
            <option value="wompi" disabled>Wompi (próximamente)</option>
          </Select>
        </FormGroup>
      </FormGrid>

      <SectionTitle>Datos de la llave</SectionTitle>
      <FormGrid cols={2}>
        <FormGroup>
          <Label>Número de llave / teléfono</Label>
          <Input
            placeholder="3001234567"
            value={form.llave_number}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { llave_number: e.target.value }); }); }}
          />
          <Hint>Este número se muestra al cliente para realizar la transferencia.</Hint>
        </FormGroup>
        <FormGroup>
          <Label>Titular de la llave</Label>
          <Input
            placeholder="TROYA BARBER STUDIO"
            value={form.llave_owner}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { llave_owner: e.target.value }); }); }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Banco / billetera</Label>
          <Select value={form.llave_bank} onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { llave_bank: e.target.value }); }); }}>
            <option value="Nequi">Nequi</option>
            <option value="Daviplata">Daviplata</option>
            <option value="Bancolombia">Bancolombia</option>
            <option value="Bre-B">Bre-B</option>
            <option value="Otro">Otro</option>
          </Select>
        </FormGroup>
      </FormGrid>

      <Actions>
        <SaveBtn onClick={handleSave} disabled={saving}>
          {saving ? <Spinner /> : <MdSave size={16} />}
          {saving ? 'Guardando...' : 'Guardar'}
        </SaveBtn>
      </Actions>
      {saved && <SuccessMsg>✓ Configuración de pagos guardada.</SuccessMsg>}
    </Section>
  );
}

/* ─── Tab: Reservas ──────────────────────────────────────── */
function BookingTab({ settings, onSave, saving }) {
  var [form, setForm] = useState({
    booking_expiry_minutes: settings.booking_expiry_minutes || '15',
    reschedule_window_hours: settings.reschedule_window_hours || '24',
  });
  var [saved, setSaved] = useState(false);

  function handleSave() {
    var exp = parseInt(form.booking_expiry_minutes, 10);
    var resc = parseInt(form.reschedule_window_hours, 10);
    if (isNaN(exp) || exp < 5) { toast.error('El tiempo de expiración debe ser mínimo 5 minutos.'); return; }
    if (isNaN(resc) || resc < 1) { toast.error('La ventana de reagendamiento debe ser mínimo 1 hora.'); return; }
    onSave({ booking_expiry_minutes: String(exp), reschedule_window_hours: String(resc) },
      function() { setSaved(true); setTimeout(function() { setSaved(false); }, 3000); });
  }

  return (
    <Section>
      <SectionTitle>Tiempos</SectionTitle>
      <FormGrid cols={2}>
        <FormGroup>
          <Label>Tiempo de expiración de reserva (minutos)</Label>
          <Input
            type="number"
            min="5"
            max="60"
            value={form.booking_expiry_minutes}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { booking_expiry_minutes: e.target.value }); }); }}
          />
          <Hint>Tiempo que tiene el cliente para pagar antes de que el horario se libere.</Hint>
        </FormGroup>
        <FormGroup>
          <Label>Ventana de reagendamiento (horas antes de la cita)</Label>
          <Input
            type="number"
            min="1"
            max="72"
            value={form.reschedule_window_hours}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { reschedule_window_hours: e.target.value }); }); }}
          />
          <Hint>El cliente solo puede reagendar hasta X horas antes de su cita.</Hint>
        </FormGroup>
      </FormGrid>
      <Actions>
        <SaveBtn onClick={handleSave} disabled={saving}>
          {saving ? <Spinner /> : <MdSave size={16} />}
          {saving ? 'Guardando...' : 'Guardar'}
        </SaveBtn>
      </Actions>
      {saved && <SuccessMsg>✓ Configuración de reservas guardada.</SuccessMsg>}
    </Section>
  );
}

/* ─── Service Modal ──────────────────────────────────────── */
function ServiceModal({ service, onClose, onSaved }) {
  var [form, setForm] = useState(service || EMPTY_SERVICE);
  var [saving, setSaving] = useState(false);

  function set(key, val) { setForm(function(f) { return Object.assign({}, f, { [key]: val }); }); }

  function validate() {
    if (!form.name.trim()) { toast.error('Nombre requerido.'); return false; }
    if (form.price < 1000) { toast.error('Precio inválido.'); return false; }
    if (form.deposit_min < 1000) { toast.error('Anticipo mínimo inválido.'); return false; }
    if (form.deposit_min > form.deposit_max) { toast.error('Anticipo mínimo no puede superar el máximo.'); return false; }
    if (form.deposit_percentage_max < 1 || form.deposit_percentage_max > 50) {
      toast.error('El porcentaje máximo debe estar entre 1% y 50%.');
      return false;
    }
    return true;
  }

  function handleSave() {
    if (!validate()) return;
    setSaving(true);
    var req = service
      ? api.put('/admin/services/' + service.id, form)
      : api.post('/admin/services', form);

    req.then(function() {
      toast.success(service ? 'Servicio actualizado.' : 'Servicio creado.');
      onSaved();
      onClose();
    }).catch(function(e) {
      var msg = e.response && e.response.data && e.response.data.error;
      toast.error(msg || 'Error al guardar.');
    }).finally(function() { setSaving(false); });
  }

  return (
    <Overlay onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <Modal>
        <ModalTitle>{service ? 'Editar servicio' : 'Nuevo servicio'}</ModalTitle>
        <FormGrid>
          <FormGroup>
            <Label>Nombre</Label>
            <Input placeholder="Corte clásico" value={form.name} onChange={function(e) { set('name', e.target.value); }} />
          </FormGroup>
        </FormGrid>
        <FormGrid cols={2}>
          <FormGroup>
            <Label>Duración (minutos)</Label>
            <Input type="number" min="10" value={form.duration_minutes} onChange={function(e) { set('duration_minutes', parseInt(e.target.value, 10) || 30); }} />
          </FormGroup>
          <FormGroup>
            <Label>Precio total (COP)</Label>
            <Input type="number" min="0" step="1000" value={form.price} onChange={function(e) { set('price', parseInt(e.target.value, 10) || 0); }} />
          </FormGroup>
          <FormGroup>
            <Label>Anticipo mínimo (COP)</Label>
            <Input type="number" min="0" step="1000" value={form.deposit_min} onChange={function(e) { set('deposit_min', parseInt(e.target.value, 10) || 0); }} />
          </FormGroup>
          <FormGroup>
            <Label>Anticipo máximo (COP)</Label>
            <Input type="number" min="0" step="1000" value={form.deposit_max} onChange={function(e) { set('deposit_max', parseInt(e.target.value, 10) || 0); }} />
          </FormGroup>
          <FormGroup>
            <Label>% máximo del total</Label>
            <Input type="number" min="1" max="50" value={form.deposit_percentage_max} onChange={function(e) { set('deposit_percentage_max', parseInt(e.target.value, 10) || 30); }} />
            <Hint>Máximo: 50%</Hint>
          </FormGroup>
        </FormGrid>
        <ModalActions>
          <CancelBtn onClick={onClose}>Cancelar</CancelBtn>
          <SaveBtn onClick={handleSave} disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
            {saving ? <Spinner /> : <MdSave size={16} />}
            {saving ? 'Guardando...' : 'Guardar'}
          </SaveBtn>
        </ModalActions>
      </Modal>
    </Overlay>
  );
}

/* ─── Tab: Servicios ─────────────────────────────────────── */
function ServicesTab() {
  var [services, setServices] = useState([]);
  var [loading, setLoading] = useState(true);
  var [modal, setModal] = useState(null);
  var [toggling, setToggling] = useState(null);

  var load = useCallback(function() {
    api.get('/admin/services').then(function(r) {
      setServices(r.data);
    }).catch(function() {
      toast.error('Error al cargar servicios.');
    }).finally(function() { setLoading(false); });
  }, []);

  useEffect(function() { load(); }, [load]);

  function toggleActive(service) {
    setToggling(service.id);
    api.put('/admin/services/' + service.id, Object.assign({}, service, { is_active: !service.is_active }))
      .then(function() { load(); })
      .catch(function() { toast.error('Error.'); })
      .finally(function() { setToggling(null); });
  }

  if (loading) return <LoadingWrap><Spinner /></LoadingWrap>;

  return (
    <Section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <SectionTitle style={{ margin: 0 }}>Servicios</SectionTitle>
        <GhostBtn onClick={function() { setModal({}); }}>
          <MdAdd size={16} /> Nuevo servicio
        </GhostBtn>
      </div>

      <ServiceTable>
        {services.map(function(s) {
          return (
            <ServiceRow key={s.id}>
              <ServiceName>{s.name}</ServiceName>
              <ServiceDetail>{s.duration_minutes} min</ServiceDetail>
              <ServiceDetail>{fmt(s.price)}</ServiceDetail>
              <ServiceDetail>Anticipo {fmt(s.deposit_min)} – {fmt(s.deposit_max)}</ServiceDetail>
              <StatusToggle
                active={s.is_active}
                disabled={toggling === s.id}
                onClick={function() { toggleActive(s); }}
              >
                {s.is_active ? 'Activo' : 'Inactivo'}
              </StatusToggle>
              <EditBtn onClick={function() { setModal(s); }}>
                <MdEdit size={13} /> Editar
              </EditBtn>
            </ServiceRow>
          );
        })}
        {services.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666360', padding: '40px 0' }}>
            No hay servicios. Crea uno.
          </div>
        )}
      </ServiceTable>

      {modal !== null && (
        <ServiceModal
          service={modal.id ? modal : null}
          onClose={function() { setModal(null); }}
          onSaved={load}
        />
      )}
    </Section>
  );
}

/* ─── Tab: Horarios ──────────────────────────────────────── */
var DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
var DEFAULT_WORK_HOURS = {
  0: null,
  1: { open: 8, close: 20 },
  2: { open: 8, close: 20 },
  3: { open: 8, close: 20 },
  4: { open: 8, close: 20 },
  5: { open: 8, close: 20 },
  6: { open: 8, close: 14 },
};

function parseWorkHours(raw) {
  try { return raw ? JSON.parse(raw) : DEFAULT_WORK_HOURS; } catch (e) { return DEFAULT_WORK_HOURS; }
}

function parseHolidays(raw) {
  try { return raw ? JSON.parse(raw) : []; } catch (e) { return []; }
}

function ScheduleTab({ settings, onSave, saving }) {
  var rawHours = settings.work_hours || null;
  var rawBuffer = settings.slot_buffer_minutes || '0';
  var rawHolidays = settings.holidays || null;

  var [workHours, setWorkHours] = useState(function() { return parseWorkHours(rawHours); });
  var [buffer, setBuffer] = useState(rawBuffer);
  var [holidays, setHolidays] = useState(function() { return parseHolidays(rawHolidays); });
  var [holidayInput, setHolidayInput] = useState('');
  var [saved, setSaved] = useState(false);

  function toggleDay(dayIdx) {
    setWorkHours(function(prev) {
      var next = Object.assign({}, prev);
      if (next[dayIdx]) {
        next[dayIdx] = null;
      } else {
        next[dayIdx] = { open: 8, close: 20 };
      }
      return next;
    });
  }

  function setHour(dayIdx, field, val) {
    setWorkHours(function(prev) {
      var next = Object.assign({}, prev);
      next[dayIdx] = Object.assign({}, next[dayIdx], { [field]: Number(val) });
      return next;
    });
  }

  function addHoliday() {
    var val = holidayInput.trim();
    if (!val || holidays.indexOf(val) !== -1) return;
    setHolidays(function(h) { return h.concat([val]); });
    setHolidayInput('');
  }

  function removeHoliday(date) {
    setHolidays(function(h) { return h.filter(function(d) { return d !== date; }); });
  }

  function handleSave() {
    var buf = parseInt(buffer, 10);
    if (isNaN(buf) || buf < 0) { toast.error('El buffer debe ser 0 o mayor.'); return; }
    onSave({
      work_hours: JSON.stringify(workHours),
      slot_buffer_minutes: String(buf),
      holidays: JSON.stringify(holidays),
    }, function() { setSaved(true); setTimeout(function() { setSaved(false); }, 3000); });
  }

  var hourOpts = [];
  for (var h = 6; h <= 22; h++) { hourOpts.push(h); }

  return (
    <Section>
      <SectionTitle>Horario por día</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1,2,3,4,5,6,0].map(function(dayIdx) {
          var schedule = workHours[dayIdx];
          var open = schedule !== null && schedule !== undefined;
          return (
            <div key={dayIdx} style={{ background: '#232129', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <StatusToggle active={open ? 1 : 0} onClick={function() { toggleDay(dayIdx); }}>
                {open ? 'Abierto' : 'Cerrado'}
              </StatusToggle>
              <span style={{ minWidth: 90, fontSize: 14, color: '#f4ede8', fontWeight: 600 }}>
                {DAY_NAMES[dayIdx]}
              </span>
              {open && (
                <>
                  <FormGroup style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 'none' }}>
                    <Label style={{ margin: 0 }}>Abre</Label>
                    <Select value={schedule.open} onChange={function(e) { setHour(dayIdx, 'open', e.target.value); }} style={{ width: 80 }}>
                      {hourOpts.map(function(h) { return <option key={h} value={h}>{String(h).padStart(2,'0')}:00</option>; })}
                    </Select>
                  </FormGroup>
                  <FormGroup style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 'none' }}>
                    <Label style={{ margin: 0 }}>Cierra</Label>
                    <Select value={schedule.close} onChange={function(e) { setHour(dayIdx, 'close', e.target.value); }} style={{ width: 80 }}>
                      {hourOpts.map(function(h) { return <option key={h} value={h}>{String(h).padStart(2,'0')}:00</option>; })}
                    </Select>
                  </FormGroup>
                </>
              )}
            </div>
          );
        })}
      </div>

      <SectionTitle style={{ marginTop: 28 }}>Buffer entre citas</SectionTitle>
      <FormGrid cols={2}>
        <FormGroup>
          <Label>Minutos de buffer entre citas</Label>
          <Input
            type="number"
            min="0"
            max="60"
            value={buffer}
            onChange={function(e) { setBuffer(e.target.value); }}
          />
          <Hint>Tiempo libre que se deja entre una cita y la siguiente (0 = sin buffer).</Hint>
        </FormGroup>
      </FormGrid>

      <SectionTitle style={{ marginTop: 28 }}>Días festivos / cierre especial</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <Input
          type="date"
          value={holidayInput}
          onChange={function(e) { setHolidayInput(e.target.value); }}
          style={{ maxWidth: 200 }}
        />
        <GhostBtn onClick={addHoliday} style={{ padding: '8px 16px' }}>Agregar</GhostBtn>
      </div>
      {holidays.length === 0 && <Hint>No hay festivos configurados.</Hint>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {holidays.map(function(d) {
          return (
            <div key={d} style={{ background: 'rgba(244,67,54,0.1)', border: '1px solid rgba(244,67,54,0.3)', borderRadius: 8, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#f44336' }}>
              {d}
              <button onClick={function() { removeHoliday(d); }} style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>×</button>
            </div>
          );
        })}
      </div>

      <Actions>
        <SaveBtn onClick={handleSave} disabled={saving}>
          {saving ? <Spinner /> : <MdSave size={16} />}
          {saving ? 'Guardando...' : 'Guardar horarios'}
        </SaveBtn>
      </Actions>
      {saved && <SuccessMsg>✓ Horarios guardados correctamente.</SuccessMsg>}
    </Section>
  );
}

/* ─── Tab: Sucursales ────────────────────────────────────── */
var EMPTY_BRANCH = { name: '', address: '', phone: '' };

function BranchModal({ branch, onClose, onSaved }) {
  var [form, setForm] = useState(branch && branch.id ? branch : EMPTY_BRANCH);
  var [saving, setSaving] = useState(false);

  function set(key, val) { setForm(function(f) { return Object.assign({}, f, { [key]: val }); }); }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nombre requerido.'); return; }
    setSaving(true);
    var req = branch && branch.id
      ? api.put('/admin/branches/' + branch.id, form)
      : api.post('/admin/branches', form);

    req.then(function() {
      toast.success(branch && branch.id ? 'Sucursal actualizada.' : 'Sucursal creada.');
      onSaved();
      onClose();
    }).catch(function(e) {
      var msg = e.response && e.response.data && e.response.data.error;
      toast.error(msg || 'Error al guardar.');
    }).finally(function() { setSaving(false); });
  }

  return (
    <Overlay onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <Modal>
        <ModalTitle>{branch && branch.id ? 'Editar sucursal' : 'Nueva sucursal'}</ModalTitle>
        <FormGrid>
          <FormGroup>
            <Label>Nombre</Label>
            <Input placeholder="Sucursal Centro" value={form.name} onChange={function(e) { set('name', e.target.value); }} />
          </FormGroup>
        </FormGrid>
        <FormGrid cols={2}>
          <FormGroup>
            <Label>Dirección</Label>
            <Input placeholder="Calle 18 #49-75" value={form.address || ''} onChange={function(e) { set('address', e.target.value); }} />
          </FormGroup>
          <FormGroup>
            <Label>Teléfono</Label>
            <Input placeholder="3001234567" value={form.phone || ''} onChange={function(e) { set('phone', e.target.value); }} />
          </FormGroup>
        </FormGrid>
        <ModalActions>
          <CancelBtn onClick={onClose}>Cancelar</CancelBtn>
          <SaveBtn onClick={handleSave} disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
            {saving ? <Spinner /> : <MdSave size={16} />}
            {saving ? 'Guardando...' : 'Guardar'}
          </SaveBtn>
        </ModalActions>
      </Modal>
    </Overlay>
  );
}

function BranchesTab() {
  var [branches, setBranches] = useState([]);
  var [loading, setLoading] = useState(true);
  var [modal, setModal] = useState(null);
  var [toggling, setToggling] = useState(null);

  var load = useCallback(function() {
    api.get('/admin/branches').then(function(r) {
      setBranches(r.data);
    }).catch(function() {
      toast.error('Error al cargar sucursales.');
    }).finally(function() { setLoading(false); });
  }, []);

  useEffect(function() { load(); }, [load]);

  function toggleActive(br) {
    setToggling(br.id);
    api.put('/admin/branches/' + br.id, { is_active: !br.is_active })
      .then(function() { load(); })
      .catch(function() { toast.error('Error.'); })
      .finally(function() { setToggling(null); });
  }

  if (loading) return <LoadingWrap><Spinner /></LoadingWrap>;

  return (
    <Section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <SectionTitle style={{ margin: 0 }}>Sucursales</SectionTitle>
        <GhostBtn onClick={function() { setModal({}); }}>
          <MdAdd size={16} /> Nueva sucursal
        </GhostBtn>
      </div>

      <ServiceTable>
        {branches.map(function(br) {
          return (
            <ServiceRow key={br.id}>
              <ServiceName>
                <MdStoreMallDirectory size={14} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                {br.name}
              </ServiceName>
              <ServiceDetail>{br.address || '—'}</ServiceDetail>
              <ServiceDetail>{br.phone || '—'}</ServiceDetail>
              <StatusToggle
                active={br.is_active}
                disabled={toggling === br.id}
                onClick={function() { toggleActive(br); }}
              >
                {br.is_active ? 'Activa' : 'Inactiva'}
              </StatusToggle>
              <EditBtn onClick={function() { setModal(br); }}>
                <MdEdit size={13} /> Editar
              </EditBtn>
            </ServiceRow>
          );
        })}
        {branches.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666360', padding: '40px 0' }}>
            No hay sucursales. Si manejas una sola sede, esto es opcional.
          </div>
        )}
      </ServiceTable>

      {modal !== null && (
        <BranchModal
          branch={modal.id ? modal : null}
          onClose={function() { setModal(null); }}
          onSaved={load}
        />
      )}
    </Section>
  );
}

/* ─── Tab: Negocio ───────────────────────────────────────── */
function BusinessTab({ settings, onSave, saving }) {
  var [form, setForm] = useState({
    shop_name: settings.shop_name || '',
    shop_phone: settings.shop_phone || '',
    shop_address: settings.shop_address || '',
    shop_url: settings.shop_url || '',
  });
  var [saved, setSaved] = useState(false);

  function handleSave() {
    if (!form.shop_name.trim()) { toast.error('Nombre del negocio requerido.'); return; }
    onSave(form, function() { setSaved(true); setTimeout(function() { setSaved(false); }, 3000); });
  }

  return (
    <Section>
      <SectionTitle>Información del negocio</SectionTitle>
      <FormGrid cols={2}>
        <FormGroup>
          <Label>Nombre del negocio</Label>
          <Input
            placeholder="TROYA BARBER STUDIO"
            value={form.shop_name}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { shop_name: e.target.value }); }); }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Teléfono / WhatsApp</Label>
          <Input
            placeholder="+573017381452"
            value={form.shop_phone}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { shop_phone: e.target.value }); }); }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Dirección</Label>
          <Input
            placeholder="Calle 18 #49-75, Pasto, Nariño"
            value={form.shop_address}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { shop_address: e.target.value }); }); }}
          />
        </FormGroup>
        <FormGroup>
          <Label>URL del sitio cliente</Label>
          <Input
            placeholder="https://troyabarber.com"
            value={form.shop_url}
            onChange={function(e) { setForm(function(f) { return Object.assign({}, f, { shop_url: e.target.value }); }); }}
          />
          <Hint>Se usa en los links del email de confirmación.</Hint>
        </FormGroup>
      </FormGrid>
      <Actions>
        <SaveBtn onClick={handleSave} disabled={saving}>
          {saving ? <Spinner /> : <MdSave size={16} />}
          {saving ? 'Guardando...' : 'Guardar'}
        </SaveBtn>
      </Actions>
      {saved && <SuccessMsg>✓ Información del negocio guardada.</SuccessMsg>}
    </Section>
  );
}

/* ─── Tab: Barberos ──────────────────────────────────────── */
var EMPTY_USER = { name: '', email: '', password: '', provider: true };

function UserModal({ user, onClose, onSaved }) {
  var isEdit = !!(user && user.id);
  var [form, setForm] = useState(isEdit ? { name: user.name, email: user.email, password: '', provider: user.provider } : EMPTY_USER);
  var [saving, setSaving] = useState(false);

  function set(key, val) { setForm(function(f) { return Object.assign({}, f, { [key]: val }); }); }

  function handleSave() {
    if (!form.name.trim()) { toast.error('Nombre requerido.'); return; }
    if (!form.email.trim()) { toast.error('Correo requerido.'); return; }
    if (!isEdit && form.password.length < 6) { toast.error('La contraseña debe tener al menos 6 caracteres.'); return; }

    setSaving(true);
    var payload = { name: form.name, email: form.email, provider: form.provider };
    if (form.password) payload.password = form.password;

    var req = isEdit
      ? api.put('/admin/users/' + user.id, payload)
      : api.post('/admin/users', payload);

    req.then(function() {
      toast.success(isEdit ? 'Usuario actualizado.' : 'Usuario creado.');
      onSaved();
      onClose();
    }).catch(function(e) {
      var msg = e.response && e.response.data && e.response.data.error;
      toast.error(msg || 'Error al guardar.');
    }).finally(function() { setSaving(false); });
  }

  return (
    <Overlay onClick={function(e) { if (e.target === e.currentTarget) onClose(); }}>
      <Modal>
        <ModalTitle>{isEdit ? 'Editar usuario' : 'Nuevo usuario'}</ModalTitle>
        <FormGrid>
          <FormGroup>
            <Label>Nombre completo</Label>
            <Input placeholder="Luis Fernando" value={form.name} onChange={function(e) { set('name', e.target.value); }} />
          </FormGroup>
          <FormGroup>
            <Label>Correo electrónico</Label>
            <Input type="email" placeholder="barbero@troya.com" value={form.email} onChange={function(e) { set('email', e.target.value); }} />
          </FormGroup>
          <FormGroup>
            <Label>{isEdit ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'}</Label>
            <Input type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={function(e) { set('password', e.target.value); }} />
          </FormGroup>
        </FormGrid>
        <FormGroup style={{ marginTop: 12 }}>
          <Label>Rol</Label>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <StatusToggle active={form.provider ? 1 : 0} onClick={function() { set('provider', true); }}>
              <MdContentCut size={13} style={{ marginRight: 4 }} />
              Barbero
            </StatusToggle>
            <StatusToggle active={!form.provider ? 1 : 0} onClick={function() { set('provider', false); }}>
              <MdSecurity size={13} style={{ marginRight: 4 }} />
              Solo Admin
            </StatusToggle>
          </div>
          <Hint style={{ marginTop: 6 }}>Barbero = puede iniciar sesión en el admin y aparece en reservas. Solo Admin = acceso al panel pero no aparece como barbero.</Hint>
        </FormGroup>
        <ModalActions style={{ marginTop: 20 }}>
          <CancelBtn onClick={onClose}>Cancelar</CancelBtn>
          <SaveBtn onClick={handleSave} disabled={saving} style={{ flex: 1, justifyContent: 'center' }}>
            {saving ? <Spinner /> : <MdSave size={16} />}
            {saving ? 'Guardando...' : 'Guardar'}
          </SaveBtn>
        </ModalActions>
      </Modal>
    </Overlay>
  );
}

function BarbersTab() {
  var [users, setUsers] = useState([]);
  var [loading, setLoading] = useState(true);
  var [modal, setModal] = useState(null);
  var [deleting, setDeleting] = useState(null);
  var [confirmDelete, setConfirmDelete] = useState(null);

  var load = useCallback(function() {
    api.get('/admin/users').then(function(r) {
      setUsers(r.data);
    }).catch(function() {
      toast.error('Error al cargar usuarios.');
    }).finally(function() { setLoading(false); });
  }, []);

  useEffect(function() { load(); }, [load]);

  function handleDelete(user) {
    setDeleting(user.id);
    api.delete('/admin/users/' + user.id)
      .then(function() {
        toast.success('Usuario eliminado.');
        load();
      })
      .catch(function(e) {
        var msg = e.response && e.response.data && e.response.data.error;
        toast.error(msg || 'No se pudo eliminar.');
      })
      .finally(function() { setDeleting(null); setConfirmDelete(null); });
  }

  if (loading) return <LoadingWrap><Spinner /></LoadingWrap>;

  return (
    <Section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <SectionTitle style={{ margin: 0 }}>Usuarios del panel</SectionTitle>
        <GhostBtn onClick={function() { setModal({}); }}>
          <MdAdd size={16} /> Nuevo usuario
        </GhostBtn>
      </div>

      <ServiceTable>
        {users.map(function(u) {
          return (
            <ServiceRow key={u.id} style={{ gridTemplateColumns: 'auto 1fr auto auto auto' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: u.provider ? 'rgba(255,144,0,0.12)' : 'rgba(99,102,241,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {u.provider
                  ? <MdContentCut size={16} color="#ff9000" />
                  : <MdSecurity size={16} color="#818cf8" />
                }
              </div>
              <div style={{ minWidth: 0 }}>
                <ServiceName>{u.name}</ServiceName>
                <ServiceDetail>{u.email}</ServiceDetail>
              </div>
              <StatusToggle active={u.provider ? 1 : 0} style={{ cursor: 'default' }}>
                {u.provider ? 'Barbero' : 'Admin'}
              </StatusToggle>
              <EditBtn onClick={function() { setModal(u); }}>
                <MdEdit size={13} /> Editar
              </EditBtn>
              <button
                onClick={function() { setConfirmDelete(u); }}
                disabled={deleting === u.id}
                style={{ background: 'none', border: '1px solid rgba(244,67,54,0.3)', borderRadius: 8, color: '#f44336', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, opacity: deleting === u.id ? 0.4 : 1 }}
              >
                <MdDelete size={13} />
              </button>
            </ServiceRow>
          );
        })}
        {users.length === 0 && (
          <div style={{ textAlign: 'center', color: '#666360', padding: '40px 0' }}>No hay usuarios.</div>
        )}
      </ServiceTable>

      {modal !== null && (
        <UserModal
          user={modal.id ? modal : null}
          onClose={function() { setModal(null); }}
          onSaved={load}
        />
      )}

      {confirmDelete && (
        <Overlay onClick={function(e) { if (e.target === e.currentTarget) setConfirmDelete(null); }}>
          <Modal style={{ maxWidth: 360 }}>
            <ModalTitle>¿Eliminar usuario?</ModalTitle>
            <p style={{ color: '#666360', fontSize: 14, lineHeight: 1.6 }}>
              Se eliminará <strong style={{ color: '#f4ede8' }}>{confirmDelete.name}</strong> permanentemente. Esta acción no se puede deshacer.
            </p>
            <ModalActions style={{ marginTop: 20 }}>
              <CancelBtn onClick={function() { setConfirmDelete(null); }}>Cancelar</CancelBtn>
              <button
                onClick={function() { handleDelete(confirmDelete); }}
                disabled={deleting === confirmDelete.id}
                style={{ flex: 1, height: 44, background: 'rgba(244,67,54,0.9)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {deleting === confirmDelete.id ? <Spinner /> : <MdDelete size={16} />}
                Eliminar
              </button>
            </ModalActions>
          </Modal>
        </Overlay>
      )}
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════════ */
export default function Settings() {
  var [activeTab, setActiveTab] = useState(0);
  var [settings, setSettings] = useState(null);
  var [saving, setSaving] = useState(false);

  var loadSettings = useCallback(function() {
    api.get('/admin/settings').then(function(r) {
      setSettings(r.data);
    }).catch(function() {
      toast.error('Error al cargar configuración.');
    });
  }, []);

  useEffect(function() { loadSettings(); }, [loadSettings]);

  function handleSave(updates, onSuccess) {
    setSaving(true);
    api.patch('/admin/settings', updates)
      .then(function() {
        toast.success('Guardado.');
        loadSettings();
        if (onSuccess) onSuccess();
      })
      .catch(function(e) {
        var msg = e.response && e.response.data && e.response.data.error;
        toast.error(msg || 'Error al guardar.');
      })
      .finally(function() { setSaving(false); });
  }

  if (!settings) return <LoadingWrap><Spinner /></LoadingWrap>;

  return (
    <Container>
      <PageTitle>Configuración</PageTitle>

      <TabBar>
        {TABS.map(function(t, i) {
          return (
            <Tab key={t} active={activeTab === i} onClick={function() { setActiveTab(i); }}>
              {t}
            </Tab>
          );
        })}
      </TabBar>

      {activeTab === 0 && <PaymentTab settings={settings} onSave={handleSave} saving={saving} />}
      {activeTab === 1 && <BookingTab settings={settings} onSave={handleSave} saving={saving} />}
      {activeTab === 2 && <ScheduleTab settings={settings} onSave={handleSave} saving={saving} />}
      {activeTab === 3 && <ServicesTab />}
      {activeTab === 4 && <BranchesTab />}
      {activeTab === 5 && <BusinessTab settings={settings} onSave={handleSave} saving={saving} />}
      {activeTab === 6 && <BarbersTab />}
    </Container>
  );
}
