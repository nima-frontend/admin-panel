import { create } from "zustand"

interface UserState {
  name: string
  email: string
  avatarUrl: string
  setName: (name: string) => void
  setEmail: (email: string) => void
  setAvatarUrl: (url: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  name: "Nima Pourdad",
  email: "example@gmail.com",
  avatarUrl: "/avatar.png",
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setAvatarUrl: (url) => set({ avatarUrl: url }),
}))
