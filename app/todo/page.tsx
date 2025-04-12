import React from "react";
import { SessionProvider } from "next-auth/react";
import { Todo as TodoComponent } from "@/components/dashboard/todo";
const Todo = () => {
  return (
    <SessionProvider>
      <div>
        <TodoComponent />
      </div>
    </SessionProvider>
  );
};

export default Todo;
