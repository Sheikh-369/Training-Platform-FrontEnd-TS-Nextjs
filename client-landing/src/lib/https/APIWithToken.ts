// import axios from "axios"

// const APIWITHTOKEN = axios.create({
//     baseURL : "http://localhost:7900/teaching/", 
//     headers : {
//         "Authorization" : typeof window !== 'undefined' ? localStorage.getItem("token") : null,
//         "Content-Type" : "application/json", // send vayirako data ko format 
//         "Accept" : "application/json" // receive huda kasto type ko format ko receive garne 
//     }
// })

// export default APIWITHTOKEN


import axios from "axios";

const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:7900/teaching/",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

// ✅ Dynamically attach token to every request
APIWITHTOKEN.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default APIWITHTOKEN;
