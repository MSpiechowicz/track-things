<script lang="ts">
	import { t } from '$lib/translations';
</script>

<footer class="mb-8 flex h-[64px] items-center justify-center text-white md:mb-0 md:px-8">
	<div
		class="flex flex-1 flex-col justify-between gap-3 text-sm md:flex-row md:items-center md:gap-0"
	>
		<p class="order-3 md:order-1">{t('footer.copyright')}</p>
		<div class="order-1 flex gap-4 md:order-2">
			<a href="/terms-of-service" class="order-1 hover:underline md:order-2">
				{t('footer.termsOfService')}
			</a>
			<a href="/privacy-policy" class="order-2 hover:underline md:order-3">
				{t('footer.privacyPolicy')}
			</a>
		</div>
		<div class="order-1 flex gap-4 md:order-3">
			<a
				href="https://github.com/MSpiechowicz/track-things"
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 hover:opacity-80"
			>
				<span>{t('footer.github')}</span>
			</a>
		</div>
	</div>
</footer>
