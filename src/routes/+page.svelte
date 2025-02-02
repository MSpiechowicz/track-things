<script lang="ts">
  import { Button } from "$lib/components/ui/button";

  let { data } = $props();

  $inspect(data.user);
</script>

<Button href="/auth/login">Login to the site!</Button>
