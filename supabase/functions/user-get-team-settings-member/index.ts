import { serve } from 'https://deno.land/std@0.182.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.14.0';
import { corsHeaders } from '../_shared/cors.ts';

console.log(`Function "user-get-team-settings-member" up and running!`);

serve(async (req: Request) => {
	// This is needed if you're planning to invoke your function from a browser.
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		const { email } = await req.json();

		if (!email) {
			throw new Error('User email is required');
		}

		const supabaseAdmin = createClient(
			Deno.env.get('SUPABASE_URL') ?? '',
			Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
		);

		const { data: teamMembersData, error: teamMembersError } = await supabaseAdmin
			.from('team_members')
			.select('id, team_id, created_at, permissions')
			.eq('email', email);

		if (teamMembersError) {
			throw teamMembersError;
		}

		if (!teamMembersData) {
			throw new Error('User is not a member of any team');
		}

		// Create the team data based on the provided member data and the team name.
		const teamsData = await Promise.all(
			teamMembersData.map(
				async (member: {
					id: string;
					team_id: string;
					created_at: string;
					permissions: string;
				}) => {
					const { data: teamData, error: teamError } = await supabaseAdmin
						.from('team_settings')
						.select('id, name')
						.eq('id', member.team_id)
						.single();

					if (teamError) {
						throw teamError;
					}

					return {
						id: member.id,
						name: teamData.name,
						team_id: member.team_id,
						created_at: member.created_at,
						permissions: member.permissions
					};
				}
			)
		);

		return new Response(
			JSON.stringify({
				data: teamsData
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
