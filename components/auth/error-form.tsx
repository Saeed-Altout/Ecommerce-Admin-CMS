"use client";

import { ErrorMessage } from "./error-message";
import { Wrapper } from "./wrapper";

export function ErrorForm() {
  return (
    <Wrapper
      title="Error"
      description="Something went wrong while processing your request"
      redirectTo={{ href: "/auth/login", label: "Go to login" }}
    >
      <ErrorMessage message="An error occurred while logging in" />
    </Wrapper>
  );
}
