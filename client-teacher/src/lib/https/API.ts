import axios from "axios";

const teacherAPI=axios.create({
    baseURL:"http://localhost:7900/teaching/",
    headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
})

export default teacherAPI