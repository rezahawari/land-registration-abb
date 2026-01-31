// Token management utilities
export interface AuthToken {
  token: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  [key: string]: any;
}

// Simpan token ke localStorage
export const saveToken = (tokenData: AuthToken): void => {
  localStorage.setItem('authToken', tokenData.token);
  if (tokenData.refreshToken) {
    localStorage.setItem('refreshToken', tokenData.refreshToken);
  }
  if (tokenData.expiresIn) {
    const expiryTime = new Date().getTime() + tokenData.expiresIn * 1000;
    localStorage.setItem('tokenExpiry', expiryTime.toString());
  }
};

// Simpan user data
export const saveUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Ambil token dari localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Ambil user data dari localStorage
export const getUser = (): User | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Cek apakah token masih valid
export const isTokenValid = (): boolean => {
  const token = getToken();
  const expiry = localStorage.getItem('tokenExpiry');
  
  if (!token) return false;
  
  if (expiry) {
    const currentTime = new Date().getTime();
    return currentTime < parseInt(expiry);
  }
  
  // Jika tidak ada expiry time, anggap token valid
  return true;
};

// Cek apakah user sedang login
export const isLoggedIn = (): boolean => {
  return !!getToken() && isTokenValid();
};

// Logout - hapus semua auth data
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenExpiry');
};

// Get authorization header untuk API calls
export const getAuthHeader = (): Record<string, string> => {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};
