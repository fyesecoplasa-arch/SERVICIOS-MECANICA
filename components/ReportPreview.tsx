
import React from 'react';
import { 
  ChevronLeft, 
  Printer, 
  Share2, 
  Calendar, 
  Clock, 
  User, 
  Car, 
  CheckCircle2, 
  ShieldCheck,
  AlertCircle,
  Wrench,
  Camera
} from 'lucide-react';
import { BrandingConfig, ServiceOrder } from '../types';

interface Props {
  branding: BrandingConfig;
  order: ServiceOrder;
  onBack: () => void;
}

const ReportPreview: React.FC<Props> = ({ branding, order, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const total = (order.financials?.labor || 0) + (order.financials?.parts || 0);

  return (
    <div className="animate-in fade-in duration-700 max-w-3xl mx-auto mb-10">
      
      {/* Botones de Acción */}
      <div className="flex justify-between mb-6 print:hidden">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-800 transition-colors">
          <ChevronLeft size={20} /> Regresar
        </button>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border-2 rounded-lg hover:bg-gray-100 font-bold text-gray-600">
            <Share2 size={18} /> Compartir
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2 text-white rounded-lg shadow-lg font-black uppercase tracking-tighter" style={{ backgroundColor: branding.primaryColor }}>
            <Printer size={18} /> Imprimir Reporte
          </button>
        </div>
      </div>

      {/* Reporte Membrete AGC */}
      <div id="printable-report" className="bg-white p-10 shadow-2xl rounded-sm border-t-[12px]" style={{ borderColor: branding.primaryColor }}>
        
        {/* Membrete con Logotipo AGC */}
        <div className="flex justify-between items-start mb-10 pb-8 border-b-4 border-[#222d32]">
           <div className="flex items-center gap-6">
              <div className="w-28 h-28 p-2 border-2 rounded-xl bg-white shadow-md flex items-center justify-center" style={{ borderColor: branding.primaryColor }}>
                <img src={branding.logoUrl} alt="Logotipo AGC" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#222d32] uppercase tracking-tighter leading-none italic">{branding.workshopName}</h1>
                <p className="text-[10px] text-[#d38122] font-black tracking-[0.3em] mt-1 uppercase">Servicio de Mantenimiento Automotriz</p>
                <div className="flex gap-4 mt-4 text-[11px] font-black text-gray-400 uppercase">
                   <span className="flex items-center gap-1 border-r pr-4"><Calendar size={12} style={{ color: branding.primaryColor }} /> {order.date}</span>
                   <span className="flex items-center gap-1"><Clock size={12} style={{ color: branding.primaryColor }} /> {order.time} hrs</span>
                </div>
              </div>
           </div>
           <div className="text-right">
              <div className="bg-[#222d32] text-white px-5 py-3 rounded-lg border-b-4" style={{ borderBottomColor: branding.primaryColor }}>
                <p className="text-[9px] font-black uppercase leading-none opacity-60 tracking-widest">ORDEN DE SERVICIO</p>
                <p className="text-3xl font-mono font-bold">{order.folio}</p>
              </div>
           </div>
        </div>

        {/* Datos Maestros */}
        <div className="grid grid-cols-2 gap-12 mb-10">
           <div className="bg-gray-50 p-4 rounded-xl border-l-4" style={{ borderLeftColor: branding.primaryColor }}>
              <h4 className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Información Cliente</h4>
              <div className="space-y-1">
                 <p className="text-sm"><strong>Nombre:</strong> {order.client?.name}</p>
                 <p className="text-sm"><strong>Teléfono:</strong> {order.client?.phone}</p>
                 <p className="text-sm"><strong>Email:</strong> {order.client?.email || 'N/A'}</p>
              </div>
           </div>
           <div className="bg-gray-50 p-4 rounded-xl border-l-4" style={{ borderLeftColor: '#222d32' }}>
              <h4 className="text-[10px] font-black text-gray-400 uppercase mb-3 tracking-widest">Datos Unidad</h4>
              <div className="space-y-1">
                 <p className="text-sm"><strong>Vehículo:</strong> {order.client?.vehicle?.make} {order.client?.vehicle?.model}</p>
                 <p className="text-sm"><strong>Placas:</strong> <span className="bg-[#222d32] text-white px-2 py-0.5 rounded font-mono font-bold">{order.client?.vehicle?.plate}</span></p>
                 <p className="text-sm"><strong>Técnico:</strong> {order.technician}</p>
              </div>
           </div>
        </div>

        {/* Tabla Detallada */}
        <div className="mb-10">
           <h4 className="text-[11px] font-black text-[#222d32] uppercase mb-4 flex items-center gap-2">
             <Wrench size={16} style={{ color: branding.primaryColor }} /> Operaciones Realizadas
           </h4>
           <table className="w-full text-left text-sm">
              <thead className="bg-[#222d32] text-white">
                 <tr>
                    <th className="py-3 px-4 font-bold uppercase text-[11px]">Descripción del Servicio</th>
                    <th className="py-3 px-4 font-bold uppercase text-[11px] text-center">Estatus</th>
                    <th className="py-3 px-4 font-bold uppercase text-[11px] text-right">Garantía</th>
                 </tr>
              </thead>
              <tbody className="divide-y border-x">
                 {order.services?.map(s => (
                   <tr key={s} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-700">{s}</td>
                      <td className="py-4 px-4 text-center">
                         <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-black uppercase shadow-sm">Certificado</span>
                      </td>
                      <td className="py-4 px-4 text-right text-[10px] font-bold text-gray-400">1 AÑO / 20K KM</td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* Evidencia */}
        <div className="mb-10">
           <h4 className="text-[11px] font-black text-[#222d32] uppercase mb-4 flex items-center gap-2">
             <Camera size={16} style={{ color: branding.primaryColor }} /> Control de Calidad Visual
           </h4>
           <div className="grid grid-cols-3 gap-4">
              {order.evidence?.map((img, idx) => (
                <div key={idx} className="border-2 rounded-lg p-1 bg-white shadow-md" style={{ borderColor: branding.primaryColor }}>
                   <img src={img.url} className="w-full h-36 object-cover rounded-md mb-2" />
                   <div className="flex justify-between items-center px-1">
                      <span className="text-[9px] font-black text-[#222d32] uppercase">{img.type}</span>
                      <span className="text-[9px] font-mono font-bold text-orange-600">{img.timestamp.split(',')[1]}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Costos */}
        <div className="flex justify-end mb-12">
           <div className="w-72 bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="flex justify-between text-xs font-bold py-1">
                 <span className="text-gray-400 uppercase">Mano de Obra</span>
                 <span className="text-[#222d32]">${order.financials?.labor.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs font-bold py-1">
                 <span className="text-gray-400 uppercase">Refacciones</span>
                 <span className="text-[#222d32]">${order.financials?.parts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl py-3 mt-2 border-t-4 font-black italic tracking-tighter" style={{ color: branding.primaryColor }}>
                 <span>TOTAL</span>
                 <span className="font-mono">${total.toFixed(2)}</span>
              </div>
           </div>
        </div>

        {/* Firmas Digitales */}
        <div className="grid grid-cols-2 gap-20">
           <div className="text-center">
              <div className="border-b-2 h-24 flex items-end justify-center pb-2 bg-gray-50 rounded-t-lg">
                 {order.signatures?.technician && <img src={order.signatures.technician} className="max-h-20 mix-blend-multiply" />}
              </div>
              <p className="mt-3 text-[10px] font-black text-[#222d32] uppercase tracking-widest">Técnico Certificado</p>
           </div>
           <div className="text-center">
              <div className="border-b-2 h-24 flex items-end justify-center pb-2 bg-gray-50 rounded-t-lg">
                 {order.signatures?.client && <img src={order.signatures.client} className="max-h-20 mix-blend-multiply" />}
              </div>
              <p className="mt-3 text-[10px] font-black text-[#222d32] uppercase tracking-widest">Conformidad del Cliente</p>
           </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t-2 text-[9px] text-gray-400 text-center uppercase tracking-[0.4em] font-black">
           {branding.workshopName} | {branding.address} | TEL: {branding.phone}
           <p className="mt-2 opacity-40 italic">CALIDAD • SEGURIDAD • CONFIANZA</p>
        </div>

      </div>
    </div>
  );
};

export default ReportPreview;
