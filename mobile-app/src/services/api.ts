/**
 * API Service
 * Handles all server communication
 * Simple REST calls with timeout handling
 */

const API_BASE_URL = 'https://api.telemedicine-nabha.in/v1';
const TIMEOUT = 10000; // 10 seconds

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch with timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Generic API request handler
 */
const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  const response = await fetchWithTimeout(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data: ApiResponse<T> = await response.json();
  
  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }
  
  return data.data as T;
};

/**
 * API Methods
 */
export const api = {
  // Patient
  getPatient: (patientId: string) =>
    request<any>(`/patients/${patientId}`),
  
  // Symptoms
  submitSymptoms: (data: {
    patientId: string;
    symptoms: string[];
    notes: string;
    photoPath?: string;
    voicePath?: string;
    createdAt: string;
  }) =>
    request<{ id: string }>('/symptoms', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // Records
  getRecords: (patientId: string) =>
    request<any[]>(`/patients/${patientId}/records`),
  
  // Consultation
  getUpcomingConsultation: (patientId: string) =>
    request<any>(`/patients/${patientId}/consultation`),
  
  // Medicines
  getMedicines: (patientId: string) =>
    request<any[]>(`/patients/${patientId}/medicines`),
  
  // Feedback
  submitFeedback: (data: { patientId: string; rating: number; comment: string }) =>
    request<void>('/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  // File upload
  uploadFile: async (
    type: 'photo' | 'voice',
    filePath: string,
    patientId: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append('file', {
      uri: filePath,
      type: type === 'photo' ? 'image/jpeg' : 'audio/m4a',
      name: type === 'photo' ? 'photo.jpg' : 'voice.m4a',
    } as any);
    formData.append('patientId', patientId);
    formData.append('type', type);
    
    const response = await fetchWithTimeout(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const data = await response.json();
    return data.url;
  },
};
