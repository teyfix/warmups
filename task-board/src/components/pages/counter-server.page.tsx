"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { classed } from "@/lib/utils";
import {
  useDecrementCounterMutation,
  useGetCounterQuery,
  useIncrementCounterMutation,
  useSetCounterMutation,
} from "@/redux/api/counterApi";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const CounterDescription = classed(
  CardDescription,
  "h-10 leading-10 text-center",
  {
    variants: {
      variant: {
        counter: "text-4xl font-semibold",
        destructive: "text-destructive",
      },
    },
  },
);

type Messages = Record<"success" | "error" | "loading", string>;

const messages = {
  increment: {
    loading: "Incrementing counter",
    success: "Counter incremented to {value}",
    error: "Could not increment the counter",
  },
  decrement: {
    loading: "Decrementing counter",
    success: "Counter decremented to {value}",
    error: "Could not decrement the counter",
  },
  reset: {
    loading: "Resetting counter",
    success: "Counter reset to {value}",
    error: "Could not reset the counter",
  },
};

const interpolate = (
  message: string,
  params: Record<string, number | string> = {},
) =>
  Object.entries(params).reduce(
    (acc, [name, value]) => acc.replaceAll(`{${name}}`, String(value)),
    message,
  );

const handlePromise = <T extends { value: number }>(
  fn: () => Promise<T>,
  messages: Messages,
) => {
  toast.promise(fn, {
    loading: messages.loading,
    success: (result) => interpolate(messages.success, result),
    error: (_error) => messages.error,
  });
};

export function CounterApiPage() {
  const { isLoading, isError, data: counter } = useGetCounterQuery();

  const [increment, incrementResult] = useIncrementCounterMutation();
  const [decrement, decrementResult] = useDecrementCounterMutation();
  const [setCounter, setCounterResult] = useSetCounterMutation();

  const isDisabled =
    incrementResult.isLoading ||
    decrementResult.isLoading ||
    setCounterResult.isLoading;

  const handleIncrement = () => {
    handlePromise(() => increment().unwrap(), messages.increment);
  };

  const handleDecrement = () => {
    handlePromise(() => decrement().unwrap(), messages.decrement);
  };

  const handleReset = () => {
    handlePromise(() => setCounter(0).unwrap(), messages.reset);
  };

  return (
    <div className="grid place-items-center min-h-screen [&_button]:cursor-pointer">
      <Card className="max-w-sm w-full">
        <CardHeader>
          <CardTitle>Counter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription>
            Use buttons to change the current value
          </CardDescription>
          {isLoading ? (
            <CounterDescription>Loading counter value...</CounterDescription>
          ) : isError ? (
            <CounterDescription variant="destructive">
              Could not fetch the counter value
            </CounterDescription>
          ) : (
            <CounterDescription variant="counter">
              {counter?.value}
            </CounterDescription>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button
            onClick={handleDecrement}
            disabled={isDisabled}
            size="icon-lg"
            aria-label="Decrement"
          >
            <Minus />
          </Button>
          <Button
            onClick={handleReset}
            disabled={isDisabled}
            size="icon-lg"
            variant="destructive"
            aria-label="Reset counter"
          >
            <RotateCcw />
          </Button>
          <Button
            onClick={handleIncrement}
            disabled={isDisabled}
            size="icon-lg"
            aria-label="Increment"
          >
            <Plus />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
