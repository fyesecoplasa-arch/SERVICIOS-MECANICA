
export enum ServiceType {
  OIL_CHANGE = 'Cambio de aceite y filtro',
  FILTERS = 'Cambio de filtros (Aire/Gasolina/AC)',
  PLUGS_INJECTORS = 'Bujías y Lavado de inyectores',
  LEVELS = 'Revisión de niveles',
  BRAKES_STD = 'Frenos (Pastillas Std)',
  BRAKES_EPB = 'Frenos EPB (Electrónico)',
  SCANNER = 'Servicio de Escáner General',
  LIGHTING = 'Upgrade Iluminación LED'
}

export interface BrandingConfig {
  logoUrl: string;
  primaryColor: string;
  workshopName: string;
  address: string;
  phone: string;
}

export interface ServiceOrder {
  id: string;
  folio: string;
  date: string;
  time: string;
  technician: string;
  client: {
    name: string;
    phone: string;
    email: string;
    vehicle: {
      make: string;
      model: string;
      year: string;
      plate: string;
    }
  };
  services: ServiceType[];
  evidence: {
    type: 'before' | 'after' | 'scanner';
    url: string;
    timestamp: string;
  }[];
  financials: {
    labor: number;
    parts: number;
    total: number;
  };
  signatures: {
    technician: string;
    client: string;
  };
  notes: string;
}
