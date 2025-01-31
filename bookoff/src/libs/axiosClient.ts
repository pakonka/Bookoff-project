import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/users";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST
axiosClient.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("token");
    console.log("Current token:", token); // Log token để kiểm tra
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// RESPONSE

axiosClient.interceptors.response.use(
  async (response) => {
    console.log("Full response:", response); // In ra toàn bộ phản hồi
    console.log(response.status)

    // Kiểm tra cấu trúc phản hồi
    if (response.data && response.data) {
      const { access_token, refresh_token } = response.data;

      if (access_token) {
        window.localStorage.setItem("token", access_token);
      }
      if (refresh_token) {
        window.localStorage.setItem("refreshToken", refresh_token);
      }
    } else {
      console.error("Unexpected response structure:", response.data);
    }

    return response;
  },
  async (error) => {
    // Kiểm tra xem có phản hồi không
    if (error.response) {
      console.error("Axios error response:", error.response.data); // Log dữ liệu lỗi
      console.error("Response status:", error.response.status);
    } else {
      console.error("Axios error message:", error.message); // Nếu không có phản hồi
    }
  
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    const originalConfig = error.config;

    if (error?.response?.status === 401 && !originalConfig.sent) {
      console.log("Error 🚀", error);
      originalConfig.sent = true;
      try {
        // Trường hợp không có token thì chuyển sang trang LOGIN
        const token = window.localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return Promise.reject(error);
        }

        const refreshToken = window.localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axiosClient.post("/refresh-token", {
            refreshToken: refreshToken,
          });

          const { access_token } = response.data;
          window.localStorage.setItem("token", access_token);

          originalConfig.headers = {
            ...originalConfig.headers,
            authorization: `Bearer ${access_token}`,
          };

          return axiosClient(originalConfig);
        } else {
          return Promise.reject(error);
        }
      } catch (err) {
        return Promise.reject(err); 
      }
    }
  }
);

export { axiosClient };
