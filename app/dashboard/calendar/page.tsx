import Calendar from "@/components/dashboard/calendar";
import { SessionProvider } from "next-auth/react";

import React from "react";

const CalendarPage = () => {
  return (
    <SessionProvider>
      <div>
        <Calendar />
      </div>
    </SessionProvider>
  );
};

export default CalendarPage;
