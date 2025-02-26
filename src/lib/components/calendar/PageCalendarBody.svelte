<script lang="ts">
  import PageCalendarBodyDay from './PageCalendarBodyDay.svelte';

  // Define props using Svelte 5 runes
  const { date = new Date(), view = 'day' } = $props<{
    date?: Date;
    view?: 'day' | 'week' | 'month';
  }>();

  // Sample events data for demonstration
  const events = $state([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 15),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 10),
      color: '#3b82f6' // blue
    },
    {
      id: '2',
      title: 'Lunch Break',
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0),
      color: '#10b981' // green
    },
    {
      id: '3',
      title: 'Project Review',
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30),
      color: '#f59e0b' // amber
    }
  ]);
</script>

<div class="calendar-body">
  {#if view === 'day'}
    <PageCalendarBodyDay date={date} events={events} />
  {:else if view === 'week'}
    <!-- Week view will be implemented later -->
    <div class="placeholder">Week view coming soon</div>
  {:else if view === 'month'}
    <!-- Month view will be implemented later -->
    <div class="placeholder">Month view coming soon</div>
  {/if}
</div>

<style>
  .calendar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1.25rem;
    color: #6b7280;
  }
</style>
