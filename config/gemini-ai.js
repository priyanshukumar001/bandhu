import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();
const newAPIKey = localStorage.getItem('newAPIKey');
console.log(newAPIKey);
const genAI = new GoogleGenerativeAI((newAPIKey && typeof newAPIKey === "string" && newAPIKey.trim() !== "") ? (newAPIKey) : process.env.KEY_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


export default model;