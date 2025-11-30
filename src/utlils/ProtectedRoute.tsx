import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import { supabase } from "../services/supabase";
import { Session } from "@supabase/supabase-js";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps ) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  if (session === null) return <div>Loading...</div>;

  return session ? children : <Navigate to="/login" replace />;
}
