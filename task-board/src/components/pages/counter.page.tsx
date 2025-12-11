"use client";

import { Minus, Plus, RotateCcw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  decrement,
  increment,
  resetCounter,
  selectCount,
} from "@/redux/slices/counterSlice";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function CounterPage() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(selectCount);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleReset = () => {
    dispatch(resetCounter());
  };

  const handleDecrement = () => {
    dispatch(decrement());
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
          <CardDescription className="text-4xl font-semibold text-center">
            {counter}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button
            onClick={handleDecrement}
            size="icon-lg"
            aria-label="Decrement"
          >
            <Minus />
          </Button>
          <Button
            onClick={handleReset}
            size="icon-lg"
            variant="destructive"
            aria-label="Reset counter"
          >
            <RotateCcw />
          </Button>
          <Button
            size="icon-lg"
            aria-label="Increment"
            onClick={handleIncrement}
          >
            <Plus />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
