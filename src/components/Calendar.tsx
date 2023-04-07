import React from "react";
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

function CustomCalendar() {
  return <div style={{ width: '100%' }}>
    <Calendar isReadOnly={true} events={[
      {
        id: "1",
        calendarId: "0",
        title: "TOAST UI Calendar Study",
        category: "time",
        dueDateClass: "",
        start: 1680705676285,
        end: 1680705676285,
      }
    ]} view="month" month={{ workweek: false }} gridSelection={{ enableDblClick: false, enableClick: false }} useDetailPopup />
  </div>
}

export default CustomCalendar;
