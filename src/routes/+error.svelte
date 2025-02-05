<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import IconMoodWrrr from '$lib/components/svg/IconMoodWrrr.svelte';
  import { Button } from '$lib/components/ui/button';

    const errorList: Array<{
        code: number;
        title: string;
        message: string;
    }> = [
        {
            code: 404,
            title: "Page not found",
            message: "Sorry, we couldn't find the page you're looking for."
        },
        {
            code: 500,
            title: "Internal server error",
            message: "We've encountered an unexpected error. Please try again later."
        },
        {
            code: 401,
            title: "Unauthorized",
            message: "You are not authorized to access this page."
        },
    ]

    console.log($page.status);
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-2 text-white">
  <IconMoodWrrr additionalClass="h-16 w-16" />
  <h1 class="text-3xl font-bold tracking-tight md:text-4xl">{errorList.find(error => error.code === $page.status)?.title}</h1>
  <p class="text-muted-foreground text-center text-lg">
    {errorList.find(error => error.code === $page.status)?.message}
  </p>
  <div class="mt-4">
    <Button onclick={async () => await goto('/')}>Return to Home Page</Button>
  </div>
</div>
