"use client";

import { ReactNode } from "react";
import { store } from "@/lib/store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children, session }: { children: ReactNode; session: any }) {

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
      {children}
      </SessionProvider>
    </Provider>
  );
}
