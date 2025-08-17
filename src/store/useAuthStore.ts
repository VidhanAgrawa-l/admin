import { create } from "zustand";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profile_image: string;
  _id: string;
  profileId: {
    _id: string;
  };
  profileCompleted: Boolean;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  initializeUser: () => void; // Function to initialize user on app load
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // Initial user state
  setUser: (user) => set({ user }), // Function to set user data
  initializeUser: () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      set({ user: JSON.parse(savedUser) });
    }
  },
}));
