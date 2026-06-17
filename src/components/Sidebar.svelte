<script lang="ts">
  const props = $props();
  import UserRound from "@lucide/svelte/icons/user";
  import Home from "@lucide/svelte/icons/home";
  import Search from "@lucide/svelte/icons/search";
  import Cookies from "universal-cookie";
  const cookie = new Cookies();
  const token = cookie.get("token");
  let user: any = $state(null);

  async function fetchProfile() {
    try {
      const res = await fetch("https://neon-node.vercel.app/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      user = data;
    } catch (error) {
      alert("Error in getting profile");
    }
  }

  $effect(() => {
    fetchProfile();
  });
</script>

<div
  class="w-80 px-3 rounded-xl h-full xxl:flex xl:flex lg:flex sm:hidden hidden items-center justify-center"
>
  <aside
    class="bg-[#1d1d1f] h-[95%] w-full flex flex-col justify-between pb-5 rounded-2xl"
  >
    <div class="flex flex-col mt-5 gap-3">
      <h3 class="text-white title opacity-[0.75] text-2xl font-bold pl-6">
        Sangeet
      </h3>
      <div class="flex flex-col items-start gap-3 px-3">
        <a
          class="text-white flex items-center gap-3 py-2 hover:bg-black w-full px-2 rounded-lg opacity-[0.75] text-sm"
          href="/home"
        >
          <Home />
          <span class="desc">Home</span>
        </a>
        <a
          class="text-white flex items-center gap-3 py-2 hover:bg-black w-full px-2 rounded-lg opacity-[0.75] text-sm"
          href="/home"
        >
          <Search />
          <span class="desc">Search</span>
        </a>
      </div>
    </div>

    <div class="flex px-3 items-center justify-between">
      {#if token}
        <div class="flex items-center gap-3 justify-between w-full px-3">
          <div class="flex items-center gap-2">
            <UserRound color="white" size={18} />
            <h3 class="title text-white opacity-[0.75]">{user?.name}</h3>
          </div>

          <button
            class="text-xs hover:text-red-500 text-white opacity-[0.75] desc cursor-pointer"
            onclick={() => {
              cookie.remove("token");
              window.location.reload();
            }}>Sign out</button
          >
        </div>
      {:else}
        <a
          href="/login"
          class="bg-rose-500 flex items-center justify-center hover:bg-rose-400 text-white w-full h-10 rounded-full cursor-pointer title text-sm"
          ><span class="title">Sign in</span></a
        >
      {/if}
    </div>
  </aside>
</div>

<style>
  .desc {
    font-family: var(--primary-text-medium-font);
  }
  .title {
    font-family: var(--primary-bold-font);
  }
</style>
