import { mockUsers, mockMatches } from '../utils/mockData';

export const auth = {
  login: async (credentials) => {
    // Mock successful login
    return { data: { token: 'mock-token', user: mockUsers[0] } };
  },
  register: async (userData) => {
    // Mock successful registration
    return { data: { token: 'mock-token', user: { ...mockUsers[0], ...userData } } };
  },
  getProfile: async () => {
    return { data: mockUsers[0] };
  },
  getPotentialMatches: async () => {
    return { data: mockUsers };
  },
  getMatches: async () => {
    return { data: mockMatches };
  },
  getCurrentUser: () => {
    return mockUsers[0];
  },
  likeUser: async ({ targetUserId, isSuperLike }) => {
    // Mock successful like
    return { data: { matched: Math.random() > 0.5 } };
  }
}; 