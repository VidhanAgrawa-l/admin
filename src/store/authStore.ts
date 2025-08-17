import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  user: {
    email: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  login: (email: string, token: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: (email, token, role) => {
        // Set cookie with token (you might want to use a library like js-cookie)
        document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`; // 1 day
        set({ token, user: { email, role }, isAuthenticated: true });
      },
      logout: () => {
        // Clear cookie
        document.cookie =
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
