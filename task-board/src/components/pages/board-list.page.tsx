"use client";

import { ArrowRight, Plus, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { toast } from "sonner";
import { useGetBoardsQuery } from "@/redux/api/boardListApi";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const CreateBoardButton = dynamic(
  () =>
    import("./board-list/create-board.button").then((m) => m.CreateBoardButton),
  {
    ssr: false,
    loading: () => (
      <Button>
        <Skeleton className="h-1 w-8" />
      </Button>
    ),
  }
);

export function BoardListPage() {
  const { data, isLoading, isError } = useGetBoardsQuery();

  return (
    <section className="space-y-4 p-4 max-w-7xl mx-auto">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Boards</h1>
        <CreateBoardButton>
          <Plus />
          <span>New Board</span>
        </CreateBoardButton>
      </header>

      <main>
        {isLoading ? (
          <p className="animate-pulse">Loading boards</p>
        ) : isError ? (
          <p className="text-destructive">Could not load boards</p>
        ) : (
          <ul className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {data?.boards.items.map((board) => (
              <Card key={board.id}>
                <CardHeader>
                  <CardTitle>{board.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription>
                    This board is created at{" "}
                    <strong className="font-semibold">
                      {new Date(board.created_at).toLocaleString()}
                    </strong>
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex justify-end gap-2">
                  {/* TODO: implement an alert dialog for confirmation */}
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast.error(
                        "Oops! Apparently, this feature is not implemented yet…"
                      );
                    }}
                  >
                    <Trash />
                    <span>Delete</span>
                  </Button>

                  <Button asChild>
                    <Link href={`/boards/${board.id}/tasks`}>
                      <span>View</span>
                      <ArrowRight />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ul>
        )}
      </main>
    </section>
  );
}
