import client from './client';

export const attendanceApi = {
  checkin: async (sessionId: string, studentId: string): Promise<void> => {
    await client.post('/attendance/checkin', { sessionId, studentId });
  },

  checkout: async (sessionId: string, studentId: string): Promise<void> => {
    await client.post('/attendance/checkout', { sessionId, studentId });
  },

  setPresence: async (sessionId: string, studentId: string, isPresent: boolean): Promise<void> => {
    await client.put('/attendance/presence', { sessionId, studentId, isPresent });
  },

  setPayment: async (sessionId: string, studentId: string, paymentStatus: string): Promise<void> => {
    await client.put('/attendance/payment', { sessionId, studentId, paymentStatus });
  },
};
