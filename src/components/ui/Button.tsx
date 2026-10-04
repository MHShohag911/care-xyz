import { Button as HeroButton } from "@heroui/react";

export function Button({
  children,
  ...props
}: React.ComponentProps<typeof HeroButton>) {
  return <HeroButton {...props}>{children}</HeroButton>;
}