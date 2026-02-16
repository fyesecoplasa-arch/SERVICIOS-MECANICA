
import { ServiceType } from '../types';

/**
 * Valida si se cumplen los requisitos mínimos para generar el reporte
 */
export const validateOrder = (order: any): string[] => {
  const errors: string[] = [];

  if (!order.technician) errors.push("Nombre del técnico es obligatorio.");
  if (!order.client?.name) errors.push("Nombre del cliente es obligatorio.");
  if (order.services.length === 0) errors.push("Debe seleccionar al menos un servicio.");
  
  // Regla EPB: Requiere evidencia de escáner
  if (order.services.includes(ServiceType.BRAKES_EPB)) {
    const hasScanner = order.evidence.some((e: any) => e.type === 'scanner');
    if (!hasScanner) {
      errors.push("El servicio EPB requiere evidencia fotográfica del escáner.");
    }
  }

  // Regla Firmas
  if (!order.signatures?.client || !order.signatures?.technician) {
    errors.push("Ambas firmas son obligatorias para cerrar la orden.");
  }

  return errors;
};

/**
 * Calcula el total automáticamente
 */
export const calculateTotal = (financials: any) => {
  return (financials.labor || 0) + (financials.parts || 0);
};
