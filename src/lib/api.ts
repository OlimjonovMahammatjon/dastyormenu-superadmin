// API Base URL - production uchun o'zgartiring
const BASE_URL = 'http://localhost:8000';

// API xatoliklarini boshqarish
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// API so'rovlarini yuborish uchun yordamchi funksiya
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
    Object.assign(headers, options.headers);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Xatolik yuz berdi' }));
    throw new ApiError(response.status, error.detail || 'Xatolik yuz berdi');
  }

  return response.json();
}

// Auth API
export const authAPI = {
  // Login
  async login(email: string, password: string) {
    const response = await fetchAPI('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ login: email, password }),
    });
    
    // Token va user ma'lumotlarini saqlash
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('isAuthenticated', 'true');
    }
    
    return response;
  },

  // Logout
  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  },

  // Token yangilash
  async refreshToken() {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('Refresh token topilmadi');
    }

    const response = await fetchAPI('/api/auth/refresh/', {
      method: 'POST',
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.access) {
      localStorage.setItem('access_token', response.access);
    }

    return response;
  },

  // Joriy foydalanuvchi ma'lumotlarini olish
  async getCurrentUser() {
    return fetchAPI('/api/auth/user/');
  },
};

// Profile API
export const profileAPI = {
  // Profil ma'lumotlarini olish
  async getProfile() {
    return fetchAPI('/api/auth/user/');
  },

  // Profil ma'lumotlarini yangilash
  async updateProfile(data: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }) {
    return fetchAPI('/api/auth/user/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Parolni o'zgartirish
  async changePassword(oldPassword: string, newPassword: string) {
    return fetchAPI('/api/auth/change-password/', {
      method: 'POST',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  },
};

// Restaurants API
export const restaurantsAPI = {
  // Barcha restoranlarni olish
  async getAll() {
    return fetchAPI('/api/restaurants/');
  },

  // Bitta restoranni olish
  async getById(id: string) {
    return fetchAPI(`/api/restaurants/${id}/`);
  },

  // Yangi restoran qo'shish
  async create(data: any) {
    return fetchAPI('/api/restaurants/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Restoranni yangilash
  async update(id: string, data: any) {
    return fetchAPI(`/api/restaurants/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  // Restoranni o'chirish
  async delete(id: string) {
    return fetchAPI(`/api/restaurants/${id}/`, {
      method: 'DELETE',
    });
  },
};

// Export qilish
export { ApiError, BASE_URL };
