import { CALENDAR_VIEWS } from "$lib/constants";

type ViewType = typeof CALENDAR_VIEWS[keyof typeof CALENDAR_VIEWS];

export const calendarStore = $state({
  date: new Date(),
  day: new Date().getDay(),
  week: {
    start: new Date(),
    end: new Date(),
  },
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  viewType: CALENDAR_VIEWS.DAY as ViewType,
  setTodayDate: () => {
    calendarStore.date = new Date();
    calendarStore.viewType = CALENDAR_VIEWS.DAY as ViewType;
  },
  setDayDate: () => {
    calendarStore.date = new Date(calendarStore.date);
    calendarStore.viewType = CALENDAR_VIEWS.DAY as ViewType;
  },
  setWeekDate: () => {
    calendarStore.week.start = new Date(calendarStore.date);
    calendarStore.week.start.setDate(calendarStore.week.start.getDate() - calendarStore.day);
    calendarStore.week.end = new Date(calendarStore.week.start);
    calendarStore.week.end.setDate(calendarStore.week.end.getDate() + 6);
    calendarStore.viewType = CALENDAR_VIEWS.WEEK as ViewType;
  },
  setMonthDate: () => {
    calendarStore.date = new Date(calendarStore.date);
    calendarStore.date.setMonth(calendarStore.date.getMonth());
    calendarStore.viewType = CALENDAR_VIEWS.MONTH as ViewType;
  },
  setYearDate: () => {
    calendarStore.date = new Date(calendarStore.date);
    calendarStore.date.setFullYear(calendarStore.date.getFullYear());
    calendarStore.viewType = CALENDAR_VIEWS.YEAR as ViewType;
  },
  incrementDate: () => {
    if (calendarStore.viewType === CALENDAR_VIEWS.DAY) {
      calendarStore.date = new Date(calendarStore.date);
      calendarStore.date.setDate(calendarStore.date.getDate() + 1);
      calendarStore.day = calendarStore.date.getDay();
    } else if (calendarStore.viewType === CALENDAR_VIEWS.WEEK) {
      calendarStore.week.start = new Date(calendarStore.week.start);
      calendarStore.week.start.setDate(calendarStore.week.start.getDate() + 7);
      calendarStore.week.end = new Date(calendarStore.week.start);
      calendarStore.week.end.setDate(calendarStore.week.end.getDate() + 6);
    } else if (calendarStore.viewType === CALENDAR_VIEWS.MONTH) {
      calendarStore.date = new Date(calendarStore.date);
      calendarStore.date.setMonth(calendarStore.date.getMonth() + 1);
      calendarStore.month = calendarStore.date.getMonth();
    } else if (calendarStore.viewType === CALENDAR_VIEWS.YEAR) {
      calendarStore.date = new Date(calendarStore.date);
      calendarStore.date.setFullYear(calendarStore.date.getFullYear() + 1);
      calendarStore.year = calendarStore.date.getFullYear();
    }
  },
  decrementDate: () => {
    if (calendarStore.viewType === CALENDAR_VIEWS.DAY) {
      calendarStore.date = new Date(calendarStore.date);
      calendarStore.date.setDate(calendarStore.date.getDate() - 1);
      calendarStore.day = calendarStore.date.getDay();
    } else if (calendarStore.viewType === CALENDAR_VIEWS.WEEK) {
      calendarStore.week.start = new Date(calendarStore.week.start);
      calendarStore.week.start.setDate(calendarStore.week.start.getDate() - 7);
      calendarStore.week.end = new Date(calendarStore.week.start);
      calendarStore.week.end.setDate(calendarStore.week.end.getDate() + 6);
    } else if (calendarStore.viewType === CALENDAR_VIEWS.MONTH) {
      calendarStore.date = new Date(calendarStore.date);
      calendarStore.date.setMonth(calendarStore.date.getMonth() - 1);
      calendarStore.month = calendarStore.date.getMonth();
    } else if (calendarStore.viewType === CALENDAR_VIEWS.YEAR) {
      calendarStore.date = new Date(calendarStore.date);
      calendarStore.date.setFullYear(calendarStore.date.getFullYear() - 1);
      calendarStore.year = calendarStore.date.getFullYear();
    }
  }
});
