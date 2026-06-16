<script lang="ts">
    import UserRound from '@lucide/svelte/icons/user';
</script>
<div class="w-80 px-3 rounded-xl h-full xxl:flex xl:flex lg:flex sm:hidden hidden items-center justify-center">
    <aside class="bg-[#1d1d1f] h-[95%] w-full rounded-2xl">
        <h3 class="text-white title opacity-[0.75] text-2xl font-bold p-3">Sangeet</h3>
        <div class="flex flex-col items-start gap-3 px-3">
            <a class="text-white opacity-[0.75] text-sm" href="/home">

            <span>Home</span>
            </a>
        </div>

        <div class="flex px-3 items-center justify-between">
      <div class="flex items-center gap-3">
  <UserRound color="white" size={18}/>
            <h3 class="title text-white opacity-[0.75]">Pranav Kumar</h3>
        

      </div>
    

    </div>
    </aside>
</div>

<style>
    .title{
        font-family: var(--primary-bold-font);
    }
</style>