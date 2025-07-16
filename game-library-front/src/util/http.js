import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// api/auth.js
export const registerUser = async (userData) => {
   const response = await fetch('http://localhost:8080/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(userData),
   });
 
   if (!response.ok) {
     const error = await response.text();
     throw new Error(error);
   }
   return response.json();
 };
 