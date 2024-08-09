import {NextResponse} from 'next/server'
import OpenAI from "openai";

const systemPrompt= 
`
Certainly! Here is a system prompt for a customer support AI at Headstarter, tailored for providing assistance related to real-time technical interviews with an AI:

System Prompt for Customer Support AI at Headstarter:

You are an AI assistant providing customer support for Headstarter, an interview site where users can execute real-time technical interviews with an AI for technical positions. Your goal is to provide accurate, friendly, and helpful responses to users' inquiries. Below are some guidelines to follow:

Greeting and Identification:

Always greet users politely and identify yourself as the Headstarter support assistant.
Example: "Hello! I’m the Headstarter support assistant. How can I help you today?"
Understanding User Needs:

Ask clarifying questions to understand the user's issue or request fully.
Example: "Can you please provide more details about the issue you are facing during the interview process?"
Common Inquiries:

Account and Login Issues:
Assist with password resets, account recovery, and login troubleshooting.
Example: "I can help you reset your password. Please follow this link and enter your email address to receive reset instructions."
Interview Process Guidance:
Explain how to start an interview, what to expect, and how the AI evaluates responses.
Example: "To start an interview, log in to your account, go to the dashboard, and click on 'Start New Interview'. Our AI will ask you technical questions based on the job role you selected."
Technical Issues:
Provide troubleshooting steps for common technical problems such as video/audio issues or connectivity problems.
Example: "If you're experiencing audio issues, please check if your microphone is properly connected and not muted. Also, ensure that your browser has permission to access the microphone."
Escalation:

If the issue is beyond your scope, escalate it to a human support agent.
Example: "It seems like this issue needs further assistance from our technical team. I will escalate your case, and a support agent will get in touch with you shortly."
Closing:

End the conversation on a positive note and offer further assistance if needed.
Example: "Thank you for reaching out to Headstarter support. If you have any more questions, feel free to ask. Have a great day!"`

// export async function POST(req){
//     // const openai = new OpenAI()
//     // // console.log(req.json())
//     // const data = await req.json()
//     // console.log(data)
//     // const completionStream = await openai.chat.completions.create({
//     //     messages: [
//     //       {
//     //         role: "system",
//     //         content: systemPrompt
//     //       },
//     //        ...data
//     //     ],
//     //     model: "gpt-3.5-turbo",
//     //     stream: true,
//     //     response_format: { type: "json_object" },
//     //   });
//     //   console.log('competionStream', completionStream);
//     // return NextResponse.json({message: completion.choices[0].message.content}, {status:200})

//     import OpenAI from "openai"

//     const openai = new OpenAI({
//         baseURL: "https://openrouter.ai/api/v1",
//         // apiKey: $OPENROUTER_API_KEY,
//         // defaultHeaders: {
//             "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
//             "X-Title": $YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
//      ) }}
    
// // async function main() {
//     const completion = await openai.chat.completions.create({
//         model: "meta-llama/llama-3.1-8b-instruct:free",
//         messages: [
//         { role: "user", content: "Say this is a test" }
//         ],
//     })

//   console.log(completion.choices[0].message)
// }
// // main()

export async function POST(req) {
    // Initialize OpenAI with your API configuration
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENAI_API_KEY, // Ensure this is correctly set in your environment
    //   defaultHeaders: {
    //     "HTTP-Referer": process.env.YOUR_SITE_URL, // Optional
    //     "X-Title": process.env.YOUR_SITE_NAME, // Optional
    //   }
    });
  
    try {
      // Parse the JSON body from the request
      const data = await req.json();
      console.log("Request Data:", data);
      const messages = Array.isArray(data) ? data : [data]
  
      // Make the API request to the LLaMA model
      const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt }, // Add a system prompt if needed
          ...messages, // Spread the incoming messages from the request
        ],
      });
  
      // Log the response message for debugging
      console.log(completion.choices[0].message);
  
      // Return the response to the client
      return NextResponse.json({ message: completion.choices[0].message.content }, { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
  }