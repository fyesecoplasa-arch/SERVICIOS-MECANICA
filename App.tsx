
import React, { useState, useEffect, useRef } from 'react';
import { 
  Wrench, 
  Car, 
  ClipboardCheck, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Trash2,
  Settings,
  User,
  MapPin,
  Calendar,
  Clock,
  Zap,
  ShieldCheck,
  Search
} from 'lucide-react';
import { ServiceType, BrandingConfig, ServiceOrder } from './types';
import WorkshopForm from './components/WorkshopForm';
import ReportPreview from './components/ReportPreview';

// Configuración Maestra basada en el Logotipo AGC proporcionado
const INITIAL_BRANDING: BrandingConfig = {
  // Se utiliza la URL del logotipo confirmada por el usuario
  logoUrl: 'https://i.ibb.co/XfXkY9f/agc-logo.png', 
  primaryColor: '#d38122', // Naranja AGC (extraído de la banda inferior del logo)
  workshopName: 'TALLER MECÁNICO GARRIDO',
  address: 'Av. Industrial Automotriz #456, Col. Mecánica',
  phone: '55 1234 5678'
};

const App: React.FC = () => {
  const [branding, setBranding] = useState<BrandingConfig>(INITIAL_BRANDING);
  const [showConfig, setShowConfig] = useState(false);
  const [order, setOrder] = useState<Partial<ServiceOrder>>({
    folio: 'AGC-' + Math.floor(Math.random() * 9000 + 1000).toString(),
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    services: [],
    evidence: [],
    financials: { labor: 0, parts: 0, total: 0 }
  });
  const [isGenerated, setIsGenerated] = useState(false);

  const handleUpdateOrder = (updates: Partial<ServiceOrder>) => {
    setOrder(prev => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    if(window.confirm('¿Deseas resetear la orden actual?')) {
      setOrder({
        folio: 'AGC-' + Math.floor(Math.random() * 9000 + 1000).toString(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        services: [],
        evidence: [],
        financials: { labor: 0, parts: 0, total: 0 }
      });
      setIsGenerated(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2eee3] pb-24"> {/* Tono crema sutil del fondo del logotipo */}
      
      {/* Header Estilo Escudo AGC */}
      <header className="bg-[#222d32] text-white sticky top-0 z-50 shadow-2xl border-b-4" style={{ borderBottomColor: branding.primaryColor }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded-lg border-2 shadow-inner" style={{ borderColor: branding.primaryColor }}>
              <img src={branding.logoUrl} alt="AGC Logo" className="h-12 w-12 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tighter leading-none italic">
                {branding.workshopName}
              </h1>
              <div className="bg-[#d38122] px-2 py-0.5 mt-1 rounded-sm">
                <p className="text-[9px] font-black text-[#222d32] uppercase tracking-[0.15em]">Servicio de Mantenimiento Automotriz</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right mr-4 border-r pr-4 border-gray-600">
              <p className="text-[10px] opacity-60 font-bold uppercase">Estatus de Sistema</p>
              <p className="text-xs font-black text-green-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> ONLINE PRO
              </p>
            </div>
            <button onClick={() => setShowConfig(!showConfig)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <Settings size={20} className="text-orange-400" />
            </button>
            <div className="bg-white text-[#222d32] px-4 py-1.5 rounded-md font-black shadow-lg border-b-2" style={{ borderBottomColor: branding.primaryColor }}>
              <span className="text-[8px] block opacity-70 leading-none">FOLIO</span>
              <span className="text-lg font-mono">{order.folio}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Panel de Configuración de Marca (White Label) */}
      {showConfig && (
        <div className="fixed inset-0 bg-[#222d32]/80 backdrop-blur-sm z-[60] flex justify-end">
          <div className="bg-white w-full max-w-md p-8 shadow-2xl animate-in slide-in-from-right duration-300">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 text-[#222d32]">
              <Settings className="text-[#d38122]" /> CONFIGURACIÓN
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-[#d38122]">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nombre Comercial</label>
                <input 
                  type="text" 
                  value={branding.workshopName}
                  onChange={(e) => setBranding({...branding, workshopName: e.target.value})}
                  className="w-full p-3 border-2 rounded-lg font-bold text-[#222d32] focus:border-[#d38122] outline-none"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-[#d38122]">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">URL del Logotipo</label>
                <input 
                  type="text" 
                  value={branding.logoUrl}
                  onChange={(e) => setBranding({...branding, logoUrl: e.target.value})}
                  className="w-full p-3 border-2 rounded-lg text-xs"
                  placeholder="https://enlace-a-tu-logo.png"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-[#d38122]">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Color Corporativo</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="color" 
                    value={branding.primaryColor}
                    onChange={(e) => setBranding({...branding, primaryColor: e.target.value})}
                    className="w-16 h-12 rounded cursor-pointer"
                  />
                  <span className="font-mono font-bold text-[#d38122]">{branding.primaryColor}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowConfig(false)}
                className="w-full bg-[#222d32] text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-8"
              >
                Actualizar Identidad
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 mt-8">
        {!isGenerated ? (
          <WorkshopForm 
            branding={branding} 
            order={order} 
            onUpdate={handleUpdateOrder} 
            onGenerate={() => setIsGenerated(true)}
            onReset={handleReset}
          />
        ) : (
          <ReportPreview 
            branding={branding} 
            order={order as ServiceOrder} 
            onBack={() => setIsGenerated(false)} 
          />
        )}
      </main>

      {/* Footer de Acciones AGC */}
      {!isGenerated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t-2 border-gray-100 p-4 shadow-2xl flex justify-center gap-4 z-40">
           <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-400 font-bold rounded-2xl hover:bg-gray-50 transition-all uppercase text-xs"
          >
            <Trash2 size={18} /> Limpiar Orden
          </button>
          <button 
            onClick={() => setIsGenerated(true)}
            className="flex items-center justify-center px-12 py-3 text-white font-black rounded-2xl shadow-2xl hover:opacity-90 transition-all active:scale-95 uppercase tracking-tighter text-sm min-w-[300px]"
            style={{ backgroundColor: branding.primaryColor }}
          >
            GENERAR REPORTE DE SERVICIO
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
