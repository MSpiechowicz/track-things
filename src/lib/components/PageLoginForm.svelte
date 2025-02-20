<script lang="ts">
	import { goto } from '$app/navigation';
	import IconGithubBrand from '$lib/components/svg/IconGithubBrand.svelte';
	import IconMail from '$lib/components/svg/IconMail.svelte';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/translations';

	const socialLogins = [
		{
			icon: IconGithubBrand,
			text: t('loginForm.button.github.label'),
			href: '/auth/login/github'
		},
		{
			icon: IconMail,
			text: t('loginForm.button.google.label'),
			href: '/auth/login/google'
		}
	];
</script>

<div class="flex flex-col space-y-6">
	<div class="flex flex-col space-y-3">
		{#each socialLogins as { icon: Icon, text, href }}
			<Button variant="outline" class="h-11 w-full font-normal" href={href} data-sveltekit-reload>
				<div class="bg-custom-dark mr-1 flex h-7 w-7 items-center justify-center rounded-full">
					<svelte:component this={Icon} />
				</div>
				{text}
			</Button>
		{/each}
	</div>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t"></span>
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="text-muted-foreground bg-white px-2">or</span>
		</div>
	</div>
	<Button variant="outline" class="h-11 w-full font-normal" onclick={() => goto('/')}>
		{t('loginForm.button.returnToHomePage.label')}
	</Button>
	<p class="text-muted-foreground text-center text-sm">
		<span>{t('loginForm.label_1')}</span>
		<span>{' '}</span>
		<a href="/terms-of-service" class="hover:text-primary underline underline-offset-4">
			{t('loginForm.label_2')}
		</a>
	</p>
</div>
