// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');


  console.log(token,"token recieved")

  if (!token) {
    (event.locals as any).user = null;
    return resolve(event);
  }

  // Optional: verify token with your backend
  const res = await fetch('https://neon-node.vercel.app/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.ok) {
    (event.locals as any).user = await res.json();
    (event.locals as any).token = token;
  } else {
    (event.locals as any).user = null;
    event.cookies.delete('token', { path: '/' });
  }

  return resolve(event);
};