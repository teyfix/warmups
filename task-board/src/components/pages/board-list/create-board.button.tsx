"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateBoardDomain } from "@/lib/api/feat/board/board.domains";
import { useCreateBoardMutation } from "@/redux/api/boardListApi";

const resolver = zodResolver(CreateBoardDomain);

export function CreateBoardButton(props: React.ComponentProps<typeof Button>) {
  const [isOpen, setOpen] = useState(false);
  const { register, handleSubmit } = useForm({ resolver });
  const [createBoard] = useCreateBoardMutation();
  const nameId = useId();

  const onSubmit = handleSubmit(
    (data) =>
      toast.promise(() => createBoard(data).then(() => setOpen(false)), {
        loading: "Creating board",
        success: "Board created",
        error: "Could not create board",
      }),
    (_err) => {
      toast.error("Please check invalid form fields");
    },
  );

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button {...props} />
      </DrawerTrigger>
      <DrawerContent className="max-w-md mx-auto">
        <DrawerHeader>
          <DrawerTitle>Create board</DrawerTitle>
          <DrawerDescription>
            Fill out the form to create a new board for organizing your tasks
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={onSubmit} className="px-4">
          <div className="space-y-2">
            <Label htmlFor={nameId}>Name</Label>
            <Input
              {...register("name")}
              id={nameId}
              placeholder="Give a name to this board"
            />
          </div>
        </form>

        <DrawerFooter>
          <Button size="lg" onClick={onSubmit}>
            <span>Create</span>
            <Check />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
