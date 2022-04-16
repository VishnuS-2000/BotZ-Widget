import axios from "axios"




const chatBot=axios.create({
    baseURL:"http://127.0.0.1:8000"

})


export const getResponse=async(intents,message)=>{


    const training_data={
        'data':{
            intents
        },
        'query':message
    }

    console.log(training_data)
    const data=await chatBot.post("/predict",training_data)
    return {reply:data.data.reply}

}
