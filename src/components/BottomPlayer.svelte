<script lang="ts">
  import Play from "@lucide/svelte/icons/play";
  import Pause from "@lucide/svelte/icons/pause";
  let { handleMusicEnd = $bindable() ,songSelected}= $props();

  let loading: boolean = $state(false);
  let audio: HTMLAudioElement | null = null;

  $effect(() => {
    if (!songSelected) return;

    audio = new Audio(songSelected.audio_url);
    // console.log(songSelected,"song selected")

    const handleLoadStart = () => {
      loading = true;
    };

    const handleLoadedMetadata = () => {
      loading = false;
      audio?.play();
      audioState = {
        isPlaying: true,
        isMuted: false,
      };
    };

    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended",handleMusicEnd)
    return () => {
      audio?.pause();

      audio?.removeEventListener("loadstart", handleLoadStart);
      audio?.removeEventListener("loadedmetadata", handleLoadedMetadata);

      audio = null;
    };
  });

  let audioState = $state({
    isPlaying: false,
    isMuted: false,
  });

  function handlePlay() {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      audioState = {
        isPlaying: true,
        isMuted: false,
      };
    } else {
      audio.pause();
      audioState = {
        isPlaying: false,
        isMuted: false,
      };
    }
  }
</script>

<!-- <audio src={props.songSelected.audio_url}
bind:this={audio}
></audio> -->

<div
  class="bottom-5 absolute flex items-center justify-center h-15 bg-transparent xxl:w-[95%] xl:w-[95%] lg:w-[95%] sm:w-full w-full sm:left-0 left-0"
>
  <div class="bottom-player">
    {#if songSelected}
      <div
        class="w-full h-full px-5 flex items-center justify-between bg-transparent"
      >
        <div class="flex items-center gap-3 xxl:w-[60%] xl:w-[60%] lg:w-[60%] sm:w-[60%] w-[60%]">
          <img
            src={songSelected.poster_url}
            class="w-10 rounded-lg border border-[gray]"
            alt=""
            srcset={songSelected.poster_url}
          />

          <div class="flex flex-col w-full">
            <h3
              class="text-white name opacity-[0.75] text-sm text-nowrap overflow-hidden"
            >
              {songSelected.title}
            </h3>
            <span class="text-xs desc text-nowrap overflow-hidden"
              >{songSelected.artists}</span
            >
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            onclick={handlePlay}
            class="flex items-center justify-center w-12.5 h-12.5"
          >
            {#if loading}
              <!-- <img src="https://imgs.search.brave.com/Zjbyyja9SKpTq9dj8pBS7C3KH6CQDhxlzkMrJqQBPxk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/OS1DaW8zZlRtbkFB/QUFBTS9mYWtlLWxv/YWRpbmctbG9hZGlu/Zy5naWY.gif" class="w-10 h-10" alt=""> -->
               <h3 class="text-xs text-white animate-pulse">Loading...</h3>
            {:else if !audioState.isPlaying}
              <Play size={20} color="white" />
            {:else}
              <Pause size={20} color="white" />
            {/if}
          </button>
        </div>
      </div>
    {:else}
      <div class="flex items-center justify-center w-full h-full">
        <p class="text-white title">Sangeet</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .name {
    font-family: var(--primary-bold-font);
    letter-spacing: 0.5px;
  }

  .desc {
    font-family: var(--primary-text-medium-font);
    color: gray;
    /* letter-spacing: 1px; */
  }

  .bottom-player {
    backdrop-filter: saturate(220%) blur(16px);
    background: var(--glassMaterialBackground);
    border-radius: 50px;
    box-shadow: 0 10px 40px var(--glassMaterialShadowColor);
    /* content: ""; */
    /* inset: 0; */
    /* position: absolute; */
    /* bottom: 0;
    right: 0;*/
    /* left: 0;  */
    width: 60%;
    height: 100%;

    z-index: var(--z-default);
  }


  @media (max-width:780px){
    .bottom-player{
    width: 90%;
    }
  }

  .title {
    /* opacity: 0.75; */
    color: gray;
    font-family: var(--primary-bold-font);
  }
</style>
