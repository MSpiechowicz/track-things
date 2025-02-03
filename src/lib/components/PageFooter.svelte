<script lang="ts">
  import IconGithubBrand from '$lib/components/svg/IconGithubBrand.svelte';
</script>

<footer class="flex h-[64px] items-center justify-center text-white mb-8 md:mb-0 md:px-8">
  <div class="flex flex-1 flex-col justify-between gap-3 text-sm md:flex-row md:items-center md:gap-0">
    <p class="order-3 md:order-1">© 2025 Maciej Spiechowicz. All rights reserved.</p>
    <div class="order-1 flex gap-4 md:order-2">
      <a href="/terms-of-service" class="order-1 hover:underline md:order-2">
        Terms of Service
      </a>
    <a href="/privacy-policy" class="order-2 hover:underline md:order-3">
        Privacy Policy
      </a>
    </div>
    <div class="order-1 flex gap-4 md:order-3">
      <a
        href="https://github.com/MSpiechowicz/track-things"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 hover:opacity-80"
      >
        <div class="flex h-7 w-7 items-center justify-center rounded-full bg-white">
          <IconGithubBrand strokeColor="black" additionalClass="w-4 h-4" />
        </div>
        <span>GitHub</span>
      </a>
    </div>
  </div>
</footer>
