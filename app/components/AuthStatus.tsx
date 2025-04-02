import React from "react";
import UserPanel from "./UserPanel";
import { Button, Link, NavbarContent, NavbarItem } from "@heroui/react";
import { useSession } from "next-auth/react";

const AuthStatus = () => {
  const { data: session, status } = useSession();

  // if (!session) return <SignIn />;

  return (
    <>
      {session ? (
        <UserPanel />
      ) : (
        <NavbarContent className="" justify="end">
          <NavbarItem className="">
            <Button as={Link} color="primary" href="/login" variant="flat">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/register" variant="flat">
              Register
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </>
  );
};

export default AuthStatus;
