import { Button, Link } from "@heroui/react";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

const Footer = () => {
  return (
    <section className="mb-10 mt-5 p-5 space-y-4 text-center">
      <div className="flex justify-center items-center space-x-10">
        <div className="h-full space-x-5 content-center">
          <Link href="/" className="text-4xl">
            <FaLinkedin />
          </Link>
          <Link href="/" className="text-4xl">
            <FaXTwitter />
          </Link>
          <Link href="/" className="text-4xl">
            <ImFacebook2 />
          </Link>
        </div>
        <div className="space-x-10">
          <Link href="/about" className="text-sm content-center">
            ABOUT
          </Link>
          <Link href="/faq" className="text-sm content-center">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm content-center">
            CONTACT US
          </Link>
        </div>
      </div>
      <div className="">
        <span className="text-base">Copyright © 2024 JURBLE</span>
      </div>
    </section>
  );
};

export default Footer;
