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


//try2
// import axios from "axios";

// const APIWITHTOKEN = axios.create({
//   baseURL: "http://localhost:7900/teaching/",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
// });

// // Add a request interceptor to set the Authorization header dynamically
// APIWITHTOKEN.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers["Authorization"] = token;
//       } else {
//         delete config.headers["Authorization"];
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default APIWITHTOKEN;



//try3
// import axios from "axios";

// const APIWITHTOKEN = axios.create({
//   baseURL: "http://localhost:7900/teaching/",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//   },
// });

// // Add a request interceptor to set the Authorization header dynamically
// APIWITHTOKEN.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       console.log("Interceptor token:", token); // log token
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       } else {
//         delete config.headers["Authorization"];
//       }
//     }
//      console.log("Axios interceptor headers before request:", config.headers);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Optional: Add a response interceptor to handle 401 errors
// APIWITHTOKEN.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("token");
//       // Optionally redirect:
//       // window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default APIWITHTOKEN;

