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

  if (!isAuthenticated) return null;
  return <>{children}</>;
}
