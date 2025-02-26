export const calendarStore = $state({
  date: new Date(),
  setTodayDate: () => {
    calendarStore.date = new Date();
  },
  incrementDate: () => {
    calendarStore.date = new Date(calendarStore.date);
    calendarStore.date.setDate(calendarStore.date.getDate() + 1);
  },
  decrementDate: () => {
    calendarStore.date = new Date(calendarStore.date);
    calendarStore.date.setDate(calendarStore.date.getDate() - 1);
  }
});
