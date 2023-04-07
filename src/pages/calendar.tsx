import React from "react";
import dynamic from 'next/dynamic';
import Layout from "@/components/Layout";

const Calendar = dynamic(() => import('../components/Calendar'), {
  ssr: false
});

function calendar() {
  return (
    <Layout>
      <Calendar />
    </Layout>
  )
}

export default calendar;
