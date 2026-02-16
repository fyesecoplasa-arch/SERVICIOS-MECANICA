
import React, { useRef } from 'react';
import { 
  User, 
  Car, 
  MapPin, 
  Wrench, 
  Camera, 
  Info,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Zap,
  Cpu,
  Search,
  CheckCircle2
} from 'lucide-react';
import { ServiceType, BrandingConfig, ServiceOrder } from '../types';
import SignaturePad from './SignaturePad';

interface Props {
  branding: BrandingConfig;
  order: Partial<ServiceOrder>;
  onUpdate: (updates: Partial<ServiceOrder>) => void;
  onGenerate: () => void;
  onReset: () => void;
}

const WorkshopForm: React.FC<Props> = ({ branding, order, onUpdate, onGenerate }) => {
  
  const handleServiceToggle = (service: ServiceType) => {
    const current = order.services || [];
    if (current.includes(service)) {
      onUpdate({ services: current.filter(s => s !== service) });
    } else {
      onUpdate({ services: [...current, service] });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after' | 'scanner') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newEvidence = [...(order.evidence || []), {
          type,
          url: reader.result as string,
          timestamp: new Date().toLocaleString()
        }];
        onUpdate({ evidence: newEvidence });
      };
      reader.readAsDataURL(file);
    }
  };

  const epbSelected = order.services?.includes(ServiceType.BRAKES_EPB);
  const lightingSelected = order.services?.includes(ServiceType.LIGHTING);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* Sección: Información General con Acento AGC */}
      <section className="bg-white rounded-3xl border-2 p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
        <h2 className="text-xl font-black text-[#222d32] mb-8 flex items-center gap-3 border-b-2 pb-4 relative z-10" style={{ borderColor: branding.primaryColor }}>
          <Info className="text-[#d38122]" size={24} /> INFORMACIÓN DE RECEPCIÓN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Técnico Certificado AGC</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-300" size={18} />
                <input 
                  type="text" 
                  placeholder="Nombre del especialista"
                  value={order.technician}
                  onChange={(e) => onUpdate({ technician: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#d38122] rounded-xl focus:bg-white outline-none transition-all font-bold text-[#222d32]"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Fecha de Ingreso</label>
                <input type="date" value={order.date} className="w-full p-3 bg-gray-50 border-2 border-transparent rounded-xl font-bold" onChange={e => onUpdate({date: e.target.value})} />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">Hora</label>
                <input type="time" value={order.time} className="w-full p-3 bg-gray-50 border-2 border-transparent rounded-xl font-bold" onChange={e => onUpdate({time: e.target.value})} />
              </div>
            </div>
          </div>
          <div className="bg-[#222d32] p-6 rounded-2xl border-l-8 text-white" style={{ borderLeftColor: branding.primaryColor }}>
             <h4 className="text-xs font-black text-orange-400 uppercase mb-3 flex items-center gap-2">
               <ShieldCheck size={16} /> COMPROMISO DE CALIDAD AGC
             </h4>
             <p className="text-sm opacity-80 leading-relaxed font-medium">
               Este reporte digital vincula la evidencia fotográfica con el diagnóstico de escáner, asegurando que cada intervención en el vehículo cumpla con los estándares de seguridad AGC.
             </p>
          </div>
        </div>
      </section>

      {/* Sección: Datos de la Unidad */}
      <section className="bg-white rounded-3xl border-2 p-8 shadow-sm">
        <h2 className="text-xl font-black text-[#222d32] mb-8 flex items-center gap-3 border-b-2 pb-4" style={{ borderColor: branding.primaryColor }}>
          <Car className="text-[#d38122]" size={24} /> DATOS DEL CLIENTE Y UNIDAD
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Propietario</label>
            <input 
              className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-[#d38122] rounded-xl outline-none font-bold" 
              placeholder="Nombre completo"
              value={order.client?.name || ''}
              onChange={(e) => onUpdate({ client: { ...order.client!, name: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Contacto</label>
            <input 
              className="w-full p-3 bg-gray-50 border-2 border-transparent rounded-xl font-bold" 
              placeholder="Teléfono"
              value={order.client?.phone || ''}
              onChange={(e) => onUpdate({ client: { ...order.client!, phone: e.target.value } })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Marca</label>
            <input 
              className="w-full p-3 bg-gray-50 border-2 border-transparent rounded-xl font-bold" 
              placeholder="Ej. BMW, Audi, etc"
              value={order.client?.vehicle?.make || ''}
              onChange={(e) => onUpdate({ client: { ...order.client!, vehicle: { ...order.client?.vehicle!, make: e.target.value } } })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Modelo / Año</label>
            <input 
              className="w-full p-3 bg-gray-50 border-2 border-transparent rounded-xl font-bold" 
              placeholder="Ej. X5 2022"
              value={order.client?.vehicle?.model || ''}
              onChange={(e) => onUpdate({ client: { ...order.client!, vehicle: { ...order.client?.vehicle!, model: e.target.value } } })}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Número de Placas</label>
            <input 
              className="w-full p-3 bg-[#222d32] text-white border-2 border-transparent rounded-xl font-mono font-black uppercase text-center text-lg tracking-widest" 
              placeholder="PLA-CAS"
              value={order.client?.vehicle?.plate || ''}
              onChange={(e) => onUpdate({ client: { ...order.client!, vehicle: { ...order.client?.vehicle!, plate: e.target.value } } })}
            />
          </div>
        </div>
      </section>

      {/* Grid de Servicios AGC */}
      <section className="bg-white rounded-3xl border-2 p-8 shadow-sm">
        <h2 className="text-xl font-black text-[#222d32] mb-8 flex items-center gap-3 border-b-2 pb-4" style={{ borderColor: branding.primaryColor }}>
          <Wrench className="text-[#d38122]" size={24} /> CATÁLOGO DE OPERACIONES AGC
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.values(ServiceType).map((service) => {
            const isSelected = order.services?.includes(service);
            return (
              <button
                key={service}
                onClick={() => handleServiceToggle(service)}
                className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all group ${
                  isSelected 
                    ? 'bg-[#222d32] border-[#222d32] text-white shadow-xl scale-105 z-10' 
                    : 'bg-white border-gray-100 text-gray-500 hover:border-orange-200'
                }`}
              >
                <div className={`mb-3 transition-transform group-hover:scale-110 ${isSelected ? 'text-orange-400' : 'text-gray-300'}`}>
                   {service.includes('aceite') && <Zap size={28} />}
                   {service.includes('filtros') && <Wrench size={28} />}
                   {service.includes('bujías') && <Cpu size={28} />}
                   {service.includes('niveles') && <Info size={28} />}
                   {service.includes('Frenos') && <ShieldCheck size={28} />}
                   {service.includes('Escáner') && <Search size={28} />}
                   {service.includes('LED') && <Zap size={28} />}
                </div>
                <span className="text-[10px] text-center font-black uppercase leading-tight tracking-tighter">{service}</span>
              </button>
            );
          })}
        </div>

        {/* Lógica Crítica EPB */}
        {epbSelected && (
          <div className="mt-8 p-6 bg-red-50 border-2 border-red-100 rounded-2xl animate-in zoom-in-95">
            <h4 className="text-base font-black text-red-700 flex items-center gap-2 mb-3">
              <AlertCircle size={20} /> VALIDACIÓN DE SEGURIDAD EPB
            </h4>
            <p className="text-xs text-red-600 mb-5 font-bold uppercase tracking-tight">
              SISTEMA DETECTADO: El freno electrónico requiere liberación de pistones vía software. Es obligatorio adjuntar captura de confirmación del escáner.
            </p>
            <div className="flex items-center gap-6">
               <label className="flex items-center gap-3 bg-red-600 text-white px-6 py-3 rounded-xl cursor-pointer hover:bg-red-700 transition-all font-black shadow-lg uppercase text-xs">
                  <Camera size={18} /> Captura de Escáner
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'scanner')} />
               </label>
               {order.evidence?.some(e => e.type === 'scanner') && (
                 <div className="flex items-center gap-2 text-green-600 font-black text-xs uppercase">
                   <div className="bg-green-100 p-2 rounded-full"><CheckCircle2 size={16} /></div>
                   Evidencia Validada
                 </div>
               )}
            </div>
          </div>
        )}

        {/* Lógica Iluminación */}
        {lightingSelected && (
          <div className="mt-8 p-6 bg-orange-50 border-2 border-orange-100 rounded-2xl animate-in zoom-in-95">
             <h4 className="text-base font-black text-orange-800 flex items-center gap-2 mb-4">
              <Zap size={20} /> CONFIGURACIÓN UPGRADE LED AGC
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[9px] font-black text-orange-600 uppercase mb-2">Módulo Canbus Compatible</label>
                <select className="w-full p-3 border-2 border-orange-200 rounded-xl bg-white font-bold text-sm outline-none">
                  <option>Seleccionar adaptador...</option>
                  <option>AGC-H4 Ultra White</option>
                  <option>AGC-H7 Anti-Error</option>
                  <option>AGC-9005 High Power</option>
                </select>
              </div>
              <div className="flex items-center gap-3 text-xs text-orange-700 font-bold bg-white/50 p-4 rounded-xl">
                <ShieldCheck size={24} className="opacity-50" />
                Validación de compatibilidad eléctrica certificada por el sistema AGC.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Control de Evidencia Visual */}
      <section className="bg-white rounded-3xl border-2 p-8 shadow-sm">
        <h2 className="text-xl font-black text-[#222d32] mb-8 flex items-center gap-3 border-b-2 pb-4" style={{ borderColor: branding.primaryColor }}>
          <Camera className="text-[#d38122]" size={24} /> CONTROL DE CALIDAD VISUAL
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="aspect-square flex flex-col items-center justify-center border-3 border-dashed border-gray-100 rounded-2xl hover:border-orange-400 cursor-pointer transition-all group bg-gray-50">
            <Camera size={40} className="text-gray-200 group-hover:text-orange-400 mb-3" />
            <span className="text-[10px] font-black text-gray-400 group-hover:text-orange-600 uppercase">Estado Inicial</span>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'before')} />
          </label>
          <label className="aspect-square flex flex-col items-center justify-center border-3 border-dashed border-gray-100 rounded-2xl hover:border-green-400 cursor-pointer transition-all group bg-gray-50">
            <CheckCircle2 size={40} className="text-gray-200 group-hover:text-green-400 mb-3" />
            <span className="text-[10px] font-black text-gray-400 group-hover:text-green-600 uppercase">Resultado Final</span>
            <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'after')} />
          </label>
          {order.evidence?.map((img, idx) => (
             <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white shadow-lg ring-1 ring-gray-100">
                <img src={img.url} alt="Evidencia AGC" className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-orange-500 text-white p-1 rounded-bl-lg">
                   <p className="text-[8px] font-black uppercase px-1">{img.type}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#222d32]/80 backdrop-blur-sm p-1.5">
                   <p className="text-[7px] text-white text-center font-mono font-bold leading-tight">{img.timestamp}</p>
                </div>
             </div>
          ))}
        </div>
      </section>

      {/* Liquidación y Firmas AGC */}
      <section className="bg-white rounded-3xl border-2 p-8 shadow-sm mb-10">
        <h2 className="text-xl font-black text-[#222d32] mb-8 flex items-center gap-3 border-b-2 pb-4" style={{ borderColor: branding.primaryColor }}>
          <ShieldCheck className="text-[#d38122]" size={24} /> LIQUIDACIÓN Y CIERRE DE ORDEN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Mano de Obra Certificada</span>
              <div className="flex items-center gap-2">
                 <span className="text-gray-300 font-bold">$</span>
                 <input 
                  type="number" 
                  className="w-28 p-2 text-right border-2 rounded-lg font-black text-[#222d32] focus:border-orange-500 outline-none"
                  value={order.financials?.labor}
                  onChange={e => onUpdate({ financials: { ...order.financials!, labor: Number(e.target.value) } })}
                />
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Refacciones y Consumibles</span>
              <div className="flex items-center gap-2">
                 <span className="text-gray-300 font-bold">$</span>
                 <input 
                  type="number" 
                  className="w-28 p-2 text-right border-2 rounded-lg font-black text-[#222d32] focus:border-orange-500 outline-none"
                  value={order.financials?.parts}
                  onChange={e => onUpdate({ financials: { ...order.financials!, parts: Number(e.target.value) } })}
                />
              </div>
            </div>
            <div className="bg-[#222d32] text-white p-6 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform border-b-8" style={{ borderBottomColor: branding.primaryColor }}>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-orange-400 uppercase tracking-[0.2em] mb-1">Total Liquidación AGC</p>
                  <p className="text-4xl font-black font-mono tracking-tighter">
                    ${((order.financials?.labor || 0) + (order.financials?.parts || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <ShieldCheck size={48} className="opacity-20 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Firma de Conformidad Cliente</p>
              <div className="bg-gray-50 rounded-2xl p-2 border-2 border-dashed border-gray-200">
                <SignaturePad 
                  onSave={(sig) => onUpdate({ signatures: { ...order.signatures!, client: sig } })}
                  label="Cliente"
                />
              </div>
            </div>
            <div className="space-y-2">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Validación Técnico AGC</p>
               <div className="bg-gray-50 rounded-2xl p-2 border-2 border-dashed border-gray-200">
                <SignaturePad 
                  onSave={(sig) => onUpdate({ signatures: { ...order.signatures!, technician: sig } })}
                  label="Técnico"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WorkshopForm;
