import React from "react";
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../components/Calendar'), {
  ssr: false
});

function calendar() {
  return <Calendar />
}

export default calendar;
