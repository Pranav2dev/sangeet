<script>
    let username = $state("")
    let password = $state("")

    function handleform(){
        console.log(username,password)
    }
</script>

<div class="h-screen w-full flex items-center justify-center">
    <form action="/login" method="POST"  class="bg-[#1d1d1f] rounded-xl login_form">
        <h3 class="title text-white opacity-[0.75] text-2xl ">Sign in</h3>

        <input bind:value={username} placeholder="Email address" class="border input" type="text" name="email" id="">

        <input bind:value={password} placeholder="Password" class="border input" type="password" name="password" id="">


        <button onclick={handleform} class="px-5 py-1 btn bg-blue-600 text-white">Sign in</button>
    </form>
</div>

<style>
.btn{
    background-color: #06c;
    cursor: pointer;
    font-family: var(--primary-bold-font);

}
.title{
    font-family: var(--primary-bold-font);
    /* padding: 20px; */
}
.login_form{
    width: 450px;
    padding: 0 20px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}

.input{
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