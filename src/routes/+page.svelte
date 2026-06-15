<script lang="ts">
  import BottomPlayer from "../components/BottomPlayer.svelte";
  import ScrollSection from "../components/ScrollSection.svelte";

  const ScrollSectionAny = ScrollSection as any;

  let { data } = $props();
  let currentSongs = $state(null);

  function handleMusicEnd() {
    const rno = Math.floor(Math.random() * data.data.length);
    currentSongs = data.data[rno];

  }
</script>

<section class="flex relative flex-col py-5 px-5 w-full h-full">
  <h3 class="text-white title text-3xl opacity-[0.75]">Home</h3>

  <ScrollSection bind:currentSongs songs={data.data} />

  {#if currentSongs}
    <BottomPlayer bind:handleMusicEnd songSelected={currentSongs} />
  {/if}
</section>

<style>
  .title {
    font-family: var(--primary-bold-font);
  }
</style>
