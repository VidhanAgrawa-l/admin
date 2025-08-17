import { create } from "zustand";

interface SupplierProfileStore {
  profileId: string | null;
  setProfileId: (id: string) => void;
  resetProfileId: () => void;
  loadProfileId: () => void;
}

export const useSupplierProfileStore = create<SupplierProfileStore>((set) => {
  const loadProfileId = () => {
    const storedProfileId = localStorage.getItem("profile-id");
    if (storedProfileId) {
      set({ profileId: storedProfileId });
    }
  };

  loadProfileId(); // Load profileId from localStorage when the store is created

  return {
    profileId: null,
    setProfileId: (id) => {
      localStorage.setItem("profile-id", id); // Store profileId in localStorage
      set({ profileId: id });
    },
    resetProfileId: () => {
      localStorage.removeItem("profile-id"); // Remove profileId from localStorage
      set({ profileId: null });
    },
    loadProfileId, // Method to manually load profileId
  };
});
