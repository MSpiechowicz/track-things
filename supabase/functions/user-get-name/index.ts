import { serve } from 'https://deno.land/std@0.182.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.14.0';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "user-get-name" up and running!`);

serve(async (req: Request) => {
	// This is needed if you're planning to invoke your function from a browser.
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		// Parse the email from the request body
		const { email } = await req.json();

		if (!email) {
			throw new Error('Email is required');
		}

		const supabaseAdmin = createClient(
			Deno.env.get('SUPABASE_URL') ?? '',
			Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
		);

		// Query the profiles and profile_settings tables to get the user's name
		const { data: profiles, error: profileError } = await supabaseAdmin
			.from('profiles')
			.select('name')
			.eq('email', email)
			.single();

		if (profileError) throw profileError;
		if (!profiles) throw new Error('Profile not found');

		return new Response(
			JSON.stringify({
				name: profiles.name,
				profile_id: profiles.id
			}),
			{
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 200
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({ error: error.message }),
			{
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 400
			}
		);
	}
});
