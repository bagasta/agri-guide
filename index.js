// const { Client } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const { clientOptions } = require('./src/config/clientConfig');
// const openai = require('openai');

// // Konfigurasi OpenAI API
// openai.apiKey = 'sk-proj-uCNC7ZM1oXoJNBFX369vT3BlbkFJ3z7fBUw0icAq8QIDpvTt;
// const openaiModel = 'gpt-4-turbo';  // Ubah sesuai dengan model yang Anda ingin gunakan

// const client = new Client(clientOptions);

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
// });

// client.on('message_create', async (message) => {
//     const userMessage = message.body;
//     console.log('Received message:', userMessage);

//     try {
//         const response = await openai.Completion.create({
//             model: openaiModel,
//             prompt: userMessage,
//             max_tokens: 150,
//             n: 1,
//             stop: null,
//             temperature: 0.2,
//         });

//         const botResponse = response.choices[0].text.trim();
//         console.log('OpenAI response:', botResponse);
        
//         await message.reply(botResponse);
//         console.log('Replied to message');
//     } catch (error) {
//         console.error('Error with OpenAI API:', error);
//         await message.reply('Sorry, I could not process your request.');
//     }
// });

// client.initialize();


//Fix
// import dotenv from 'dotenv';
// dotenv.config();

// import whatsapp from 'whatsapp-web.js';
// const { Client, NoAuth } = whatsapp;
// import { ZepClient } from '@getzep/zep-cloud';
// import { v4 as uuidv4 } from 'uuid';
// import qrcode from 'qrcode-terminal';
// import axios from 'axios';

// const API_TOKEN = process.env.API_TOKEN; // Gunakan token dari variabel lingkungan
// const API_URL = process.env.API_URL; // Gunakan URL dari variabel lingkungan

// const zepClient = new ZepClient({
//   apiKey: process.env.ZEP_API_KEY
// });

// const client = new Client({
//   puppeteer: { headless: true },
//   authStrategy: new NoAuth(),
//   webVersionCache: {
//     type: 'remote',
//     remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
//   }
// });

// const sessionStates = new Map();

// // client.on('ready', () => {
// //   console.log('Client is ready!');
// // });

// // client.on('qr', (qr) => {
// //   qrcode.generate(qr, { small: true });
// //   console.log('QR Code generated and displayed.');
// // });

// // const client = new Client();

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.on('qr', qr => {
//     qrcode.generate(qr, {small: true});
// });

// client.on('message_create', async (message) => {
//   if (!message.fromMe) {
//     const chatId = message.from;
//     let sessionInfo = sessionStates.get(chatId);

//     if (!sessionInfo) {
//       const sessionId = uuidv4();  // Generate a new session ID only if it does not exist
//       try {
//         await zepClient.memory.addSession({
//           sessionId: sessionId,
//           userId: chatId,
//           metadata: { startedAt: new Date().toISOString() }
//         });
//         sessionInfo = { sessionId: sessionId, lastInteraction: new Date().getTime() };
//         sessionStates.set(chatId, sessionInfo);
//       } catch (error) {
//         console.error('Failed to add session:', error);
//         return;
//       }
//     } else {
//       sessionInfo.lastInteraction = new Date().getTime();
//       sessionStates.set(chatId, sessionInfo);
//       await updateSessionInfo(sessionInfo.sessionId, { lastInteraction: new Date().toISOString() });
//     }

//     console.log('Received message from:', chatId);
//     console.log('Session ID:', sessionInfo.sessionId);

//     const apiResponse = await queryFlowiseAPI(message.body, sessionInfo.sessionId);  // Ensure this is the session ID from your bot
//     const responseText = apiResponse && apiResponse.text ? apiResponse.text : "Sorry, I could not get a proper response from the API.";
//     await client.sendMessage(message.from, responseText);
    
//     // Setelah mengirim pesan, coba ambil kembali pesan dari API menggunakan sessionId
//     if (apiResponse && apiResponse.sessionId) {
//       const chatMessage = await fetchChatMessage(apiResponse.sessionId);
//       if (chatMessage) {
//         console.log('Chat message from API:', chatMessage.message);
//         // Lakukan validasi atau proses lainnya terhadap pesan yang dikirim oleh API
//       }
//     }
//   }
// });

// async function updateSessionInfo(sessionId, updateData) {
//   try {
//     await zepClient.memory.updateSession({
//       sessionId: sessionId,
//       updateData: updateData
//     });
//     console.log(`Session ${sessionId} updated successfully.`);
//   } catch (error) {
//     console.error(`Failed to update session ${sessionId}:`, error);
//   }
// }

// async function queryFlowiseAPI(question, sessionId) {
//   const headers = {
//     'Authorization': API_TOKEN,
//     'Content-Type': 'application/json'
//   };
//   // Mengubah struktur data yang dikirim untuk mencocokkan dengan yang diharapkan oleh API
//   const body = JSON.stringify({
//     question: question,
//     sessionId: sessionId  // Tambahkan sessionId ke dalam request body
//   });

//   try {
//     const response = await axios.post(API_URL, body, { headers });
//     console.log('API response:', response.data);
//     // Simpan pesan yang dikirim oleh API dalam sessionInfo
//     sessionStates.set(sessionId, { messageFromAPI: response.data.message });
//     return response.data;
//   } catch (error) {
//     console.error('Error when fetching from Flowise API:', error);
//     return "Halo ini error";
//   }
// }

// // Fungsi untuk mengambil kembali pesan menggunakan sessionId
// async function fetchChatMessage(sessionId) {
//   try {
//     const response = await axios.get(`https://bagasbgs2516-test-cpns.hf.space/api/v1/chatmessage/f7618740-48de-4aed-8086-8a27ee450663`, {
//       headers: { 'Authorization': API_TOKEN }
//     });
//     console.log('Chat message response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error when fetching chat message:', error);
//     return null;
//   }
// }

// client.initialize();









//-----------------------------------------//

// Script yang bisa cek session id//

// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const axios = require('axios');
// const redis = require("redis");

// // Setup Redis client
// const redisClient = redis.createClient({
//     url: "rediss://default:e18ab8c478b2425abe1e5d6fce3809f9@us1-great-dodo-42961.upstash.io:42961"
// });

// redisClient.on("error", function(err) {
//     console.error("Redis Client Error", err);
// });

// redisClient.connect();

// // Set up the WhatsApp client
// const whatsappClient = new Client({
//     puppeteer: { headless: true },
//     authStrategy: new LocalAuth(),
//         webVersionCache: {
//             type: 'remote',
//             remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
//         }
// });

// whatsappClient.on('ready', () => {
//     console.log('WhatsApp Client is ready!');
// });

// whatsappClient.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
// });

// async function queryAPI(data) {
//     try {
//         const response = await axios.post(
//             "https://bagasbgs2516-test-cpns.hf.space/api/v1/prediction/40da5cdd-3502-43e7-a5cb-74501cc50fe2",
//             data,
//             {
//                 headers: {
//                     "Authorization": "Bearer y9Sjkr7HO4heBmF3lFazJRd6j9G0kowJk0FmrsJ7m6A=",
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         console.log('API response:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error when fetching the API:', error);
//         return { text: `Failed to retrieve data from API: ${error.message}` };
//     }
// }

// whatsappClient.on('message_create', async message => {
//     if (!message.fromMe) {
//         const chatId = message.from;
//         console.log(`Handling message for chat ID: ${chatId}`);

//         let sessionData = await redisClient.get(chatId);

//         if (!sessionData) {
//             console.log('No session found, creating new session.');
//             sessionData = { context: "initial", awaitingAnswer: false, timestamp: new Date().toISOString() };
//             await redisClient.set(chatId, JSON.stringify(sessionData), 'EX', 3600); // Expire in 1 hour
//         } else {
//             console.log(`Session found: ${sessionData}`);
//             sessionData = JSON.parse(sessionData);
//             if (new Date() - new Date(sessionData.timestamp) > 3600000) { // Check if session is older than 1 hour
//                 console.log('Session expired, resetting.');
//                 sessionData = { context: "initial", awaitingAnswer: false, timestamp: new Date().toISOString() };
//             }
//         }

//         // Update and use sessionData as necessary
//     }
// });

// whatsappClient.initialize();

// const { Client, LocalAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');
// const axios = require('axios');
// const redis = require("redis");

// // Setup Redis client
// const redisClient = redis.createClient({
//     url: "rediss://default:e18ab8c478b2425abe1e5d6fce3809f9@us1-great-dodo-42961.upstash.io:42961"
// });

// redisClient.on("error", function(err) {
//     console.error("Redis Client Error", err);
// });

// redisClient.connect();

// // Set up the WhatsApp client
// const whatsappClient = new Client({
//     puppeteer: { headless: true },
//     authStrategy: new LocalAuth(),
//     webVersionCache: {
//         type: 'remote',
//         remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
//     }
// });

// whatsappClient.on('ready', () => {
//     console.log('WhatsApp Client is ready!');
// });

// whatsappClient.on('qr', qr => {
//     qrcode.generate(qr, { small: true });
// });

// async function queryAPI(data) {
//     const content = (data.answer || data.question || 'Default content').toString();  // Convert to string and ensure it's never null
//     const postData = { content };

//     console.log("Posting data to API with content:", content);

//     try {
//         const response = await axios.post(
//             "https://bagasbgs2516-test-cpns.hf.space/api/v1/prediction/40da5cdd-3502-43e7-a5cb-74501cc50fe2",
//             postData,
//             {
//                 headers: {
//                     "Authorization": "Bearer y9Sjkr7HO4heBmF3lFazJRd6j9G0kowJk0FmrsJ7m6A=",
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//         console.log('API response:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error when fetching the API:', error.response ? error.response.data : error.message);
//         return { text: `Failed to retrieve data from API: ${error.response ? error.response.data.message : error.message}` };
//     }
// }

// whatsappClient.on('message_create', async message => {
//     if (!message.fromMe) {
//         const chatId = message.from;
//         console.log(`Handling message for chat ID: ${chatId}`);

//         try {
//             let sessionData = await redisClient.get(chatId);
//             console.log(`Retrieved session data: ${sessionData}`);

//             if (!sessionData) {
//                 console.log('No session found, creating new session.');
//                 sessionData = { context: "initial", awaitingAnswer: false };
//                 await redisClient.set(chatId, JSON.stringify(sessionData));
//                 console.log(`New session state: ${JSON.stringify(sessionData)}`);
//             } else {
//                 sessionData = JSON.parse(sessionData);
//                 console.log(`Current session state: ${JSON.stringify(sessionData)}`);
//             }

//             if (message.body.startsWith('!ask') && sessionData.context === "initial") {
//                 const question = message.body.slice(5).trim();
//                 const apiResponse = await queryAPI({ question });
//                 await whatsappClient.sendMessage(chatId, apiResponse.text);
//                 sessionData.context = "questioning";
//                 sessionData.awaitingAnswer = true;
//                 sessionData.lastQuestion = question;
//                 console.log(`Updated session state for questioning: ${JSON.stringify(sessionData)}`);
//                 await redisClient.set(chatId, JSON.stringify(sessionData));
//             } else if (sessionData.awaitingAnswer) {
//                 const userResponse = message.body.trim();
//                 const apiResponse = await queryAPI({ answer: userResponse, context: sessionData.lastQuestion });
//                 await whatsappClient.sendMessage(chatId, apiResponse.text);
//                 sessionData.awaitingAnswer = false;
//                 sessionData.context = "initial";
//                 console.log(`Updated session state after answer: ${JSON.stringify(sessionData)}`);
//                 await redisClient.set(chatId, JSON.stringify(sessionData));
//             } else {
//                 console.log('Session is not awaiting an answer or command not recognized.');
//             }
//         } catch (error) {
//             console.error(`Error processing message for chat ID ${chatId}: ${error}`);
//         }
//     }
// });

// whatsappClient.initialize();






const { Client, NoAuth, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// const { Configuration, OpenAIApi } = require('openai');
// const { OpenAIApi } = require('openai');
const OpenAI = require ('openai');

// OpenAI configuration
const openai = new OpenAI({
  apiKey: 'sk-proj-uCNC7ZM1oXoJNBFX369vT3BlbkFJ3z7fBUw0icAq8QIDpvTt' // This is also the default, can be omitted
});
const openaiModel = 'gpt-4-turbo';  // Adjust model as needed

// WhatsApp Client configuration
const client = new Client({
  puppeteer: { headless: true },
  authStrategy: new NoAuth(),
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('QR code generated. Scan it with your phone.');
});

client.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

let thread = { messages: [] };

client.on('message', async (message) => {
  console.log('Received message:', message.body);
  thread.messages.push({ role: 'user', content: message.body });

  try {
    // Create a new thread
    const threadResponse = await openai.beta.threads.create({
      messages: thread.messages
    });
    console.log('Thread created:', threadResponse);

    // Run the assistant
    const runResponse = await openai.beta.threads.runs.create(
      threadResponse.id,
      { assistant_id: 'asst_Z3Uu2FuJeml0HkrCCaaoFs1V' }
    );
    console.log('Run response:', runResponse);

    // Polling for completion
    let runStatus = runResponse;
    while (runStatus.status === 'queued' || runStatus.status === 'running') {
      // Wait before checking the status again
      await new Promise(resolve => setTimeout(resolve, 2000));
      runStatus = await openai.beta.threads.Runs.Get(runStatus.id);
      console.log('Run status:', runStatus);
    }

    if (runStatus.status === 'completed') {
      const botResponse = runStatus.choices[0].message.content.trim();
      console.log('OpenAI response:', botResponse);

      thread.messages.push({ role: 'assistant', content: botResponse });
      await message.reply(botResponse);
      console.log('Replied to message');
    } else {
      console.error('Run failed or was cancelled:', runStatus);
      await message.reply('Sorry, I could not process your request.');
    }
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    await message.reply('Sorry, I could not process your request.');
  }
});

client.initialize();

