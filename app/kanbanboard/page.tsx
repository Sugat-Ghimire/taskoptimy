import React from "react";
import { KanbanBoard as Kanban } from "@/components/dashboard/kanban-board";
import { SessionProvider } from "next-auth/react";

const KanbanBoard = () => {
  return (
    <SessionProvider>
      <div>
        <Kanban />
      </div>
    </SessionProvider>
  );
};

export default KanbanBoard;
