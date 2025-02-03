<script lang="ts">
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";

  const { id, displayName } = $props();

  function handleLogoClick(e: MouseEvent) {
    e.preventDefault();
		if (id) {
			goto('/dashboard');
		} else {
			goto('/');
		}
  };
</script>

<nav class="flex h-[96px] items-center justify-between border-b border-white/15">
  <Button
    onclick={handleLogoClick}
    variant="link"
    class="flex flex-shrink-0 items-center cursor-pointer hover:no-underline"
  >
    <div class="flex text-3xl font-bold sm:hidden">
      <span class="text-white">t</span>
      <img
        src="https://550azscrsk.ufs.sh/f/5uPOqSj68BeJOovyMb4dm9u4r1nX7PQVMvkYiSZTRCFLb8jx"
        alt="Logo foots"
        width={12}
        height={12}
        class="h-auto w-auto"
      />
      <span class="text-blue-600">t</span>
    </div>
    <div class="hidden text-3xl font-bold sm:flex">
      <span class="text-white">track</span>
      <img
        src="https://550azscrsk.ufs.sh/f/5uPOqSj68BeJOovyMb4dm9u4r1nX7PQVMvkYiSZTRCFLb8jx"
        alt="Logo"
        width={12}
        height={12}
        class="h-auto w-auto"
      />
      <span class="text-blue-600">things</span>
    </div>
    <span class="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">ALPHA</span>
  </Button>
  {#if id !== null}
    <div class="flex items-center gap-4 text-white">
      <span class="hidden text-lg sm:block">{displayName}</span>
      <div class="hidden sm:block">
        <!--<UserMenu isMobile={false} />-->
      </div>
      <div class="sm:hidden">
        <!--<UserMenu isMobile={true} />-->
      </div>
    </div>
  {:else}
    <Button href="/auth/login">Sign In</Button>
  {/if}
</nav>
