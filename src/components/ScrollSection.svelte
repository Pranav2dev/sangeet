<script lang="ts">
  let {currentSongs = $bindable(),songs} = $props();
  // let {  } = $props()
  // console.log(songs,"songs")
</script>

<section class="flex flex-col">
  <h3 class="text-white opacity-[0.75] title">Recently added &rarr;</h3>

  <div class="flex items-center gap-3 scroll py-1 overflow-x-scroll">
    {#each songs as item}
      <button onclick={() => currentSongs = item} class="shrink-0">
        <picture class="w-72 h-72 shadow-2xl">
          <source srcset={item.poster_url} />
          <img class="w-42 shadow rounded-xl shadow-[#1d1d1]" src={item.poster_url} alt="" />
        </picture>
        <h3 class="text-white text-nowrap overflow-hidden w-42 opacity-[0.75] text-sm song-name ">{item.title}</h3>
        <span class="desc text-xs w-42 overflow-hidden text-nowrap flex">{item.artists}</span>
      </button>
    {/each}
  </div>
</section>

<style>
  .title {
    font-family: var(--primary-bold-font);
  }

  .scroll::-webkit-scrollbar {
    display: none;
  }

  .desc{
    color: gray;
    /* letter-spacing: 0.6px; */
    
  }

  .song-name{
    font-family: var( --primary-text-medium-font);
    font-weight: 500;
    
  }
</style>
