import axios from "axios"



const chatBot=axios.create({
    baseURL:"http://127.0.0.1:8000"

})


export default chatBot;