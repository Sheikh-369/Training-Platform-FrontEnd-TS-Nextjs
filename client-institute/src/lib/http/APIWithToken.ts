import axios from "axios"

const APIWITHTOKEN = axios.create({
    baseURL : "http://localhost:7900/teaching/", 
    headers : {
        "Authorization" : typeof window !== 'undefined' ? localStorage.getItem("token") : null,
        "Content-Type" : "application/json", // send vayirako data ko format 
        "Accept" : "application/json" // receive huda kasto type ko format ko receive garne 
    }
})

export default APIWITHTOKEN

// // lib/http/APIWITHTOKEN.ts
// import axios from "axios";

// const APIWITHTOKEN = axios.create({
//   baseURL: "http://localhost:7900/teaching/",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
// });

// // ✅ Add Authorization dynamically with Bearer prefix
// APIWITHTOKEN.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// export default APIWITHTOKEN;
