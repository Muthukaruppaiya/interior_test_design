/**
 * SIRIZ INTERIORS - Lead Capture & CRM Dispatch
 * Centralized hook to store client consultation inquiries.
 * Connect this to your CRM (e.g. HubSpot, Salesforce), WhatsApp Business API,
 * or SendGrid email webhook when deploying to production.
 */

export interface LeadPayload {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  propertyType?: string;
  carpetArea?: number;
  stylePreference?: string;
  selectedRooms?: string[];
  budgetRange?: string;
  timeline?: string;
  preferredSlot?: string;
  indicativeEstimate?: string;
  source: 'concierge_chat' | 'consultation_form' | 'quiz';
}

export async function sendLead(payload: Omit<LeadPayload, 'id' | 'timestamp'>): Promise<{ success: boolean; leadId: string }> {
  const leadId = `SRZ-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
  const fullLead: LeadPayload = {
    ...payload,
    id: leadId,
    timestamp: new Date().toISOString(),
  };

  // 1. Persist to local / session storage for offline redundancy
  try {
    const existing = JSON.parse(localStorage.getItem('siriz_leads') || '[]');
    existing.unshift(fullLead);
    localStorage.setItem('siriz_leads', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('Could not store lead to localStorage:', err);
  }

  // 2. Mock network dispatch / logging for CRM integration
  console.log('🏛️ [SIRIZ STUDIO CRM] New Qualified Design Lead Dispatched:', fullLead);

  // In production, invoke your serverless API:
  // await fetch('/api/leads', { method: 'POST', body: JSON.stringify(fullLead) });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, leadId });
    }, 600);
  });
}
