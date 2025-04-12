import React from "react";
import { Notes as Note } from "@/components/dashboard/notes";
import { SessionProvider } from "next-auth/react";

const Notes = () => {
  return (
    <SessionProvider>
      <div>
        <Note />
      </div>
    </SessionProvider>
  );
};

export default Notes;
