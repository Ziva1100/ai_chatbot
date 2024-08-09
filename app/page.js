'use client'

import {Box, Stack, TextField, Button} from '@mui/material'
import {useState} from "react"

export default function Home() {
  const [messages, setMessages] = useState([
    {role: 'assistant', content:`Hi! I'm the Headstarter support assistant. How can I help you today?`}
  ])

  const [message, setMessage] = useState('')

  const sendMessage = async () => {
    setMessage('')
    setMessages((messages)=> [...messages, {role:'user', content: message}])
    const response = await fetch('api/chat', {
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify([...messages, {role:'user', content:message}]),
    })
    const data=await response.json()
    setMessages((messages)=>[...messages,{role:'assistant', content:data.message}])
  }

  return (
   <Box
    width='100vw'
    height='100hv'
    display ='flex'
    flexDirection='column'
    alignItems={'center'}
    justifyContent='center'  >
      <Stack
        direction='column' width="500px" height="500px"  spacing={3}  border={1} borderRadius={4} >
          <Stack flexGrow={1}  overflow='auto'
            direction='column'
            spacing={1} p={2}
          >
            {
              messages.map((message,index)=>
              <Box
                key={index}
                display='flex'
                justifyContent={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
                >
                <Box
                  bgcolor={message.role ==="assistant" ? 'primary.main' : 'secondary.main'
                  }
                  color='white'
                  borderRadius={14}
                  p={3}
                >{message.content}</Box>
                </Box>)
            }
          </Stack>
          <Stack
            direction='row' spacing={2}
          >
           <TextField label='Message' fullWidth
           value={message}
           onChange={(e) =>
            setMessage(e.target.value)
           }

           />
           <Button variant='contained' onClick={sendMessage} >send</Button> 
          </Stack>
        </Stack>
    </Box>
  );
}
