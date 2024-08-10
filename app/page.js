'use client'

import {Box, Stack, TextField, Button, Modal, Typography} from '@mui/material'
import {useState, useEffect} from "react"
import {} from 'firebase/firestore'
import {auth} from '@/firebase'
import {AuthErrorCodes, connectAuthEmulator, signInWithEmailAndPassword} from 'firebase/auth'

export default function Home() {
  const [messages, setMessages] = useState([
    {role: 'assistant', content:`Hi! I'm the Headstarter support assistant. How can I help you today?`}
  ])

  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [txtEmail, settxtEmail] = useState('')
  const [txtPassword, settxtPassword] = useState('')
  const [errMessage, seterrMessage] = useState('')

  useEffect(() => {
    setOpen(true)
    connectAuthEmulator(auth,"http://localhost:9099")
  },[])

  // connectAuthEmulator(auth,"http://localhost:9099")

  const loginEmailPassword = async () => {
    // const loginEmail = txtEmail.value 
    // const loginPassword = txtPassword.value

    try{
    const userCredential = await signInWithEmailAndPassword(auth, txtEmail, txtPassword)
    console.log(userCredential.user)
    }
    catch(error){
      console.log(error)
      showLoginError(error)
    }
}

  const showLoginError = (error) => {
    switch(error.code){
      case AuthErrorCodes.INVALID_PASSWORD:
        seterrMessage('Incorrect Password')
        break;
      case AuthErrorCodes.INVALID_EMAIL:
        seterrMessage('Incorrect Email')
        break;
      default:
        seterrMessage('Unknown Error. Please, try again')
        break;
            
    }
    
    }
  
  // btnLogin.addEventListener("click",loginEmailPassword)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)






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
     <Modal
      open={open}
      onCLose={handleClose}
          
     ><Box
     sx={{position:"absolute",
      top:"50%",
      left:"50%",
      width:400,
      bgcolor:"white",
      border:"2px solid #000",
      boxShadow:24,
      borderRadius:3,
      p:4,
      display:"flex",
      flexDirection:"column",
      gap:3,
      transform:"translate(-50%,-50%)",
    
      alignItems:"center",
      justifyContent:"center"}}
     >
      
     
      <Stack
        width='300px'
        height='200px'
        direction='column'
        display='flex'
        sx={{
        alignItems:"center",
        justifyContent:"center"}}

      
        spacing={2}

               
        >{errMessage && (<Typography color='error' variant='body2'>
          {errMessage}
        </Typography>)}
          <TextField
           variant='outlined'
           label='Email'
           fullWidth
           value={txtEmail}
           onChange = {(e)=>
            settxtEmail(e.target.value)
           }
           />
           <TextField
           variant='outlined'
           label='Password'
           fullWidth
           value={txtPassword}
           onChange = {(e)=>
            settxtPassword(e.target.value)
           }
           /><Stack
           direction='row'
           spacing={6}>
           <Button
           variant = 'contained'
           onClick={()=>{
            loginEmailPassword(txtEmail,txtPassword)
            handleClose()
           }
           }
           >log In</Button>
           <Button
           variant='contained'
                      >Sign up</Button></Stack>
        </Stack>
        </Box>
     </Modal>
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
