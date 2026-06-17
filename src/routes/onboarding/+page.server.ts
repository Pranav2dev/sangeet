// src/routes/create-profile/+page.server.ts
import { fail, redirect, type RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies, fetch }:RequestEvent) => {
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email');
    const country = data.get('country');
    const profile_picture = data.get('profile_picture');

    const temp_token = sessionStorage.getItem("temp_token")

    const res = await fetch('https://neon-node.vercel.app/onboarding/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , "Authorization":`Bearer ${temp_token}`},
      body: JSON.stringify({ name, email,country,profile_picture }),
    });

    const result = await res.json();

    if (!res.ok) return fail(400, { message: result.message });

    // Now we have the token, clear pending email
    // cookies.delete('pending_email', { path: '/' });
    sessionStorage.removeItem("temp_token")
    cookies.set('token', result.token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect(302, '/');
  },
};