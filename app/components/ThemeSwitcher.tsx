"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // Determine the current theme
  const currentTheme = theme;

  // Ensure the component is mounted before accessing the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    // Toggle between light and dark themes
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null; // Avoid rendering anything before mounting

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      radius="full"
      className="text-lg text-[hsl(var(--nextui-secondary-100))] hover:text-blue-500"
      onPress={handleThemeToggle}
    >
      {currentTheme === "dark" ? <BsFillMoonStarsFill /> : <BsSunFill />}
    </Button>
  );
};

export default ThemeSwitcher;
