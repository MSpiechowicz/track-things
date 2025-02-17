import { serve } from 'https://deno.land/std@0.182.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.14.0';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "user-delete-team-settings-member" up and running!`);

serve(async (req: Request) => {
	// This is needed if you're planning to invoke your function from a browser.
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

  //const {user} = await req.json();

	try {
		const { email } = await req.json();

		if (!email) {
			throw new Error('User email is required');
		}

		//const {
		//	data: { user }
		//} = await supabaseClient.auth.getUser();

		//if (!user) {
		//	throw new Error('User not found');
		//}

		const supabaseAdmin = createClient(
			Deno.env.get('SUPABASE_URL') ?? '',
			Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
		);

		const { error } = await supabaseAdmin
			.from('team_members')
			.delete()
			.eq('email', email);

		if (error) {
			throw error;
		}

		return new Response(
			JSON.stringify({
				message: 'User was deleted from team'
			}),
			{
				headers: { ...corsHeaders, 'Content-Type': 'application/json' },
				status: 200
			}
		);
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 400
		});
	}
});
