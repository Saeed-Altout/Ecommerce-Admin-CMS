import { UserIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";

export function NameInput({ ...props }: React.ComponentProps<"input">) {
  return (
    <InputGroup>
      <InputGroupInput type="text" placeholder="name" {...props} />
      <InputGroupAddon>
        <UserIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
