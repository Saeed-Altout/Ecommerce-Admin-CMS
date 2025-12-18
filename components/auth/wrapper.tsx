import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "./github";
import { Google } from "./google";
import { BackButton } from "./back-button";

export function Wrapper({
  title,
  description,
  google,
  github,
  redirectTo,
  children,
}: React.ComponentProps<typeof Card> & {
  title: string;
  description?: string;
  google?: boolean;
  github?: boolean;
  redirectTo?: {
    href: string;
    label: string;
  };
}) {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {(github || google) && (
        <CardFooter className="justify-center gap-2">
          {github && <Github />}
          {google && <Google />}
        </CardFooter>
      )}
      {redirectTo && (
        <CardFooter className="border-t">
          <BackButton redirectTo={redirectTo} className="w-full" />
        </CardFooter>
      )}
    </Card>
  );
}
