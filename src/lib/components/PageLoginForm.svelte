<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button";
  import { IconBrandGithub, IconMail } from "@tabler/icons-svelte";
</script>

<!--
  const handleSignIn = async (provider: Provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error(`Error signing in with provider: ${provider}`, error);
    }
  };-->

    <div class="flex flex-col space-y-6">
      <div class="flex flex-col space-y-3">
        <Button
          variant="outline"
          class="h-11 w-full font-normal"
          onclick={async () => goto("/auth/login/github")}
        >
          <div class="mr-1 flex h-7 w-7 items-center justify-center rounded-full bg-custom-dark">
            <IconBrandGithub size={16} class="text-white" />
          </div>
          Continue with GitHub
        </Button>
        <Button
          variant="outline"
          class="h-11 w-full font-normal"
          onclick={async () => goto("/auth/login/google")}
        >
          <div class="mr-1 flex h-7 w-7 items-center justify-center rounded-full bg-custom-dark">
            <IconMail size={16} class="text-white" />
          </div>
          Continue with Google
        </Button>
      </div>

      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="text-muted-foreground bg-white px-2">or</span>
        </div>
      </div>

      <Button
        variant="outline"
        class="h-11 w-full font-normal"
        onclick={() => goto("/")}
      >
        Return to Home Page
      </Button>

      <p class="text-muted-foreground text-center text-sm">
        By signing in, you agree to our{" "}
        <a href="/terms-of-service" class="hover:text-primary underline underline-offset-4">
          Terms of Service
        </a>
      </p>
    </div>
