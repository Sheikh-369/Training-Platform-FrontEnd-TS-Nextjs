import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:7900/teaching/",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

export default API