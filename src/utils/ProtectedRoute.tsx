import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

import { styled } from "styled-components";
import { getCurrentUser } from "../services/auth";
import Spinner from "../ui/Spinner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const isAuthenticated = Boolean(user);

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  console.log(isAuthenticated);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
// ProtectedRoute.tsx
// import { useNavigate } from "react-router-dom";
// import { useEffect, ReactNode } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { styled } from "styled-components";

// import { supabase } from "../services/supabase";
// import { getCurrentUser } from "../services/auth";
// import Spinner from "../ui/Spinner";

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const FullPage = styled.div`
//   height: 100vh;
//   background-color: var(--color-grey-50);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   // ここからデバッグログ祭り
//   console.log("💡 ProtectedRoute component RENDERED");

//   const navigate = useNavigate();
//   const {
//     isLoading,
//     data: user,
//   } = useQuery({
//     queryKey: ["user"],
//     queryFn: getCurrentUser,
//   });

//   console.log("🔍 useQuery result:", { isLoading, user });

//   useEffect(() => {
//     console.log("🔥 useEffect fired inside ProtectedRoute");

//     supabase.auth.getSession().then((res) => {
//       console.log("📦 supabase.auth.getSession() result:", res);
//     });
//   }, []);

//   const isAuthenticated = Boolean(user);
//   console.log("🔐 isAuthenticated =", isAuthenticated);

//   if (isLoading) {
//     console.log("⏳ ProtectedRoute loading...");
//     return (
//       <FullPage>
//         <Spinner />
//       </FullPage>
//     );
//   }

//   if (!isAuthenticated) {
//     console.log("❌ Not authenticated → redirect to /login");
//     navigate("/login");
//     return null;
//   }

//   console.log("✅ Authenticated → show children!");

//   return <>{children}</>;
// }
