import { create } from "zustand";
import { axiosClient } from "@/libs/axiosClient";
import { devtools, persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware"; 
import { User } from "@/types/user";


interface Auth {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ isAuthenticated: boolean; error: string;}>;
  logout: () => void;
}

const useAuth = create<Auth>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user: User) => set({ user }),
        login: async (email: string, password: string) => {
          try {
            // Gửi yêu cầu đăng nhập
            const response = await axiosClient.post("/login", { email, password });

            if (response && response.status === 200) {
              // Lấy thông tin người dùng sau khi đăng nhập
              const userProfile = await axiosClient.get("/profile");

              // Lưu trữ thông tin người dùng, bao gồm role_id
              const { role_id, ...rest } = userProfile.data;

              set({
                user: { ...rest, role_id }, // Lưu role_id vào state user
                isAuthenticated: true,
              });

              return { isAuthenticated: true, error: "", role_id }; // Trả về role_id
            } else {
              return { isAuthenticated: false, error: "Invalid credentials" };
            }
          } catch (error: unknown) {
            console.error("Error during login:", error);
            return { isAuthenticated: false, error: "An error occurred during login" };
          }
        },
        logout: () => {
          set({ user: null, isAuthenticated: false });
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAuth;