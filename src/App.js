import React ,{useState,useEffect} from 'react';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {db} from "./firebase"

import { onSnapshot,doc } from 'firebase/firestore';

import { v4 as uuidv4 } from 'uuid';


import chatBot from './chatapiService';

import logo from "./assets/images/botz.png"


export default function App({domElement}){


    const [showBot,setShowBot]=useState(false);


    const [chats,setChats]=useState([])

    const [bot,setBot]=useState({})

    const[loading,setLoading]=useState(false)

    const [message,setMessage]=useState("")


    const appId=domElement.getAttribute("appId")

    const docRef=doc(db,"users",appId)


    useEffect(()=>{

      const unsub=onSnapshot(docRef,(snapshot)=>{

            if(snapshot.exists()){

                setBot(snapshot.data().bot)

            }

        console.log(snapshot.data())


      })


    },[])



  const getResponse=async(intents,query)=>{


    const training_data={
        'data':{
            'intents':intents
        },
        'query':query
    }

    

    

    const data=await chatBot.post("/predict",training_data)
  
    if(data){
      setLoading(false)
    }

    console.log(data)
   return data.data 
    
    }

    const handleChange=(e)=>{

      setMessage(e.target.value)
      
    }

    const handlePress=(e)=>{

      if(e.key=="Enter"){
        handleSubmit(e)
      }

    }


    const handleSubmit=async(e)=>{
        e.preventDefault()        
        setLoading(true)
        const data=await getResponse(bot.intents,message)

        console.log(data)
        setChats([...chats,{id:uuidv4(),message:message,bot:false},{id:uuidv4(),message:data.reply,bot:true}])

        setMessage("")
    

    }


 
    return (
      <div>
      
      {showBot&&
      <div className='flex flex-col  h-full w-full z-50  fixed right-0 bottom-0 top-0 rounded-3xl  justify-start  bg-white border self-end md:w-1/3 top-auto  lg:h-3/4 px-0 py-0'>
        
        {/* Chatbot Header */}
  
        <div className={`flex justify-between items-center w-full p-4 rounded-tr-xl rounded-tl-xl   bg-gradient-to-r ${bot.theme.start} ${bot.theme.end}`}>
          <h1 className="text-2xl  text-gray-50">{bot?.name}</h1>

        <button className="text-2xl font-extrabold text-gray-50 " onClick={()=>{setShowBot(false)}}><MoreHorizIcon style={{fontSize:"2.5rem"}}/></button>
  
       
          </div>
  
          
        {/* Chatbot Content Section */}
  
          <div className="flex relative top-0 bottom-50 w-full h-full flex-col overflow-y-auto  p-10">
  

          {chats.map((chat)=>{

                return <Chat key={chat.id} bot={chat.bot} content={chat.message} theme={bot.theme} name={bot.name}/>


          })}

          {loading&&<>
            
            <Chat key={uuidv4()} bot={false} content={message} theme={bot.theme}  name={bot.name}/>
            <Chat key={uuidv4()} bot={true} content={null} theme={bot.theme}  name={bot.name}/>

            </>}


        

          </div>
  
  
               {/* Chatbot Input Section */}
  
          <div className="flex justify-evenly py-2 bottom-0  w-full relative border-t border-gray-300 bg-gray-50">
    
          <input type="text" className="p-5 h-full w-full outline-none  rounded-lg text-lg md:text-xl" value={message} placeholder="Type a Message" onChange={handleChange} onKeyPress={handlePress} />
          {message&&<button type="submit" className={`px-5 py-3 rounded-full mr-5 drop-shadow cursor-pointer bg-gradient-to-r ${bot.theme.start} ${bot.theme.end}`} onClick={handleSubmit} ><SendIcon style={{fontSize:"1.rem",color:"white"}}/></button>}

          </div>
      
  
        </div>}
  
               {/* Chatbot Show */}
        
        {!showBot&&<button className={`  rounded-full text-2xl font-bold fixed bottom-5 right-5 z-50`} onClick={()=>{setShowBot(!showBot)}}>
            <img src={logo} width={60} height={60} className=""/>
          </button>}
  
  
          
  
  
      </div>
    )

}

const Chat=({content,bot,theme,name})=>{

  const [loading,setLoading]=useState(true)
  
  
  useEffect(()=>{
  
    if(content){
      setLoading(false)
    }
  
  },[])
  
    return <div className={bot?`flex flex-col flex-wrap w-fit text-gray-100  p-3 max-w-xs m-2 bg-gradient-to-r ${theme.start} ${theme.end} rounded-tl-2xl rounded-br-2xl rounded-tr-2xl self-start`:"flex flex-col flex-wrap max-w-xs p-5 m-2 bg-gray-200 border rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl w-fit self-end"}>
      
      <div >
      {bot?<p>{name}</p>:<p>You</p>}
      </div>
      {loading?<p className='text-sm font-medium lg:text-lg'>...</p>:<p className="text-sm font-medium lg:text-lg">{content}</p>}
       
      </div>
  
  

  
  }
