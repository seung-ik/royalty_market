import React from "react";
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../components/Calendar'), {
  ssr: false
});

function calendar() {
  return (
    <div>
      <Calendar />
    </div>
  )
}

export default calendar;
