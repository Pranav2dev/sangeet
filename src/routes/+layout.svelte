<script>
  import favicon from "$lib/assets/favicon.svg";
  import "../app.css";
  import Sidebar from "../components/Sidebar.svelte";
  let { data , children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Sangeet Music App</title>
</svelte:head>

<div class="h-screen w-full overflow-y-scroll bg-black flex">
  <Sidebar/>
  <main class="h-full xxl:w-[80%] xl:w-[80%] lg:w-[80%] sm:w-full w-full bg-black">
    {@render children()}
    <h3 class="text-white">{data.user?.name}</h3>
  </main>
</div>
