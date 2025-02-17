<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { DASHBOARD_VIEWS } from "$lib/constants";
  import DashboardContainer from "./PageDashboardContainer.svelte";
  import Ghost from "./svg/IconGhost2.svelte";
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TRACKING}>
  <div class="mt-24 flex flex-1 flex-col items-center gap-4 text-center">
    <Ghost additionalClass="!h-24 !w-24" />
    <div class="space-y-2">
      <h3 class="text-2xl font-medium">There is no tracking!</h3>
      <p class="text-lg text-neutral-500">Please create a new tracking to get started.</p>
    </div>
    <Button class="mt-2">
      <span>Create New Tracking</span>
    </Button>
  </div>
</DashboardContainer>
