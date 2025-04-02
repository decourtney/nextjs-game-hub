import { Button } from "@heroui/react";
import React from "react";

const themeSwitcherSkeleton = () => {
  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      radius="full"
      className="text-lg text-[hsl(var(--nextui-secondary-100))]"
    >
      {" "}
    </Button>
  );
};

export default themeSwitcherSkeleton;
