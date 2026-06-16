import { fail, redirect, type RequestEvent } from "@sveltejs/kit";

export const actions = {
  default: async ({ request, cookies, fetch }: RequestEvent) => {
    const data = await request.formData();
    const username = data.get("email") as string;
    const password = data.get("password") as string;

    const res = await fetch("https://neon-node.vercel.app/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      return fail(400, { message: result.messge });
    }

    if (result.message === "Success Created Account") {
      cookies.set("temp_token", result.token, {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10,
      });
      redirect(302, "/onboarding");
    } else {
      cookies.set("token", result.token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      redirect(302, "/");
      //   fetchProfile();
    }
  },
};
