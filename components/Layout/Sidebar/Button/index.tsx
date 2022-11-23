import React, { LegacyRef, MouseEventHandler } from "react";
import { useRouter } from "next/router";

interface IButton {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  children: React.ReactNode;
  text: string;
}

const Button = React.forwardRef(function Button(
  { onClick, href, children, text }: IButton,
  ref: LegacyRef<HTMLAnchorElement>
) {
  const router = useRouter();

  return (
    <a href={href} onClick={onClick} ref={ref}>
      <div
        className={`flex flex-col md:flex-row items-center gap-2 py-2 px-2 font-inter hover:text-green-500 ${
          router.pathname === href
            ? "md:bg-gray-50 dark:md:bg-gray-300 md:rounded-lg text-green-500"
            : "text-gray-500"
        }`}
      >
        {children}
        <p className={"text-sm md:text-base text-center"}>{text}</p>
      </div>
    </a>
  );
});

export default Button;
