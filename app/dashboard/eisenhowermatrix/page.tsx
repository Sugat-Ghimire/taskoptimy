import React from "react";
import { EisenhowerMatrix as EisenMatrix } from "@/components/dashboard/eisenhower-matrix";
import { SessionProvider } from "next-auth/react";

const EisenhowerMatrix = () => {
  return (
    <SessionProvider>
      <div>
        <EisenMatrix />
      </div>
    </SessionProvider>
  );
};

export default EisenhowerMatrix;
