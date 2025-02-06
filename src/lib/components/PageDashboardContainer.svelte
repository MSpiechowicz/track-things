<script lang="ts">
  const { title, children } = $props();
</script>

<div class="mt-2 flex flex-1 flex-col">
  <h2 class="text-2xl font-medium">{title}</h2>
  {@render children()}
</div>
