<script>
  import { goto } from "$app/navigation";
  import { redirect } from "@sveltejs/kit";
  import Cookies from "universal-cookie";
  const cookie = new Cookies();
  let username = $state("");
  let password = $state("");
  let loading = $state(false);

  async function handleform() {
    loading = true;
    try {
      const res = await fetch("https://neon-node.vercel.app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert("Error in response CODE_RESPONSE_890");
      }

      if (result.message === "Success Created Account") {
        sessionStorage.setItem("temp_token", result.token);
        goto("/onboarding")
      } else {
        cookie.set("token", result.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        goto("/")
        //   fetchProfile();
      }
    } catch (error) {
      alert("Error in login");
      console.log(error)
    } finally {
      loading = false;
    }
  }
</script>

<div class="h-screen w-full flex items-center justify-center">
  <div
    
    class="bg-[#1d1d1f] rounded-xl login_form"
  >
    <h3 class="title text-white opacity-[0.75] text-2xl">Sign in</h3>

    <input
      bind:value={username}
      placeholder="Email address"
      class="border input"
      type="text"
      name="email"
      id=""
    />

    <input
      bind:value={password}
      placeholder="Password"
      class="border input"
      type="password"
      name="password"
      id=""
    />

    <button disabled={loading} onclick={handleform} class="px-5 py-1 btn bg-blue-600 text-white"
      >{loading ? "wait...":"Sign in"}</button
    >
</div>
</div>

<style>
  .btn {
    background-color: #06c;
    cursor: pointer;
    font-family: var(--primary-bold-font);
  }
  .title {
    font-family: var(--primary-bold-font);
    /* padding: 20px; */
  }
  .login_form {
    width: 450px;
    padding: 0 20px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  }

  .input {
    font-family: var(--primary-text-medium-font);
    border: 1px solid gray;
    outline: none;
    padding: 0 20px;
    color: white;
    height: 40px;
    border-radius: 10px;
    width: 100%;
  }
</style>
