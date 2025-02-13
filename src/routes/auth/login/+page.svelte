<script lang="ts">
  import PageLoginForm from "$lib/components/PageLoginForm.svelte";
</script>

<div class="flex flex-1 items-center justify-center text-black">
  <div class="rounded-xl border bg-white p-8 shadow-lg max-w-md">
    <div class="flex flex-col space-y-6">
      <div class="flex flex-col space-y-2 text-center">
        <h2 class="text-3xl font-bold tracking-tight">Welcome!</h2>
        <p class="text-muted-foreground">
          To continue using the service, please sign in using your existing account.
        </p>
      </div>
      <PageLoginForm />
    </div>
  </div>
</div>
