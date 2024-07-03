import { excludedRoutes } from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";

interface GuardProps {
  children: JSX.Element;
}

export function Guard({ children }: GuardProps) {
  const { data: user } = useGetMe();

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
}
