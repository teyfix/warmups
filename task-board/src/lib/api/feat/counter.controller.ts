import Elysia from "elysia";
import {
  CounterDomain,
  type CounterModel,
  UpdateCounterDomain,
} from "./counter.models";

export default function CounterController(app: Elysia) {
  const counter: CounterModel = {
    value: 0,
  };

  return app.use(
    new Elysia({
      prefix: "/counter",
      tags: ["Counter"],
    })
      .model({
        CounterDomain,
        UpdateCounterDomain,
      })
      .get(
        "/",
        () => {
          return counter;
        },
        {
          response: "CounterDomain",
          detail: {
            summary: "Get counter value",
          },
        }
      )
      .put(
        "/",
        ({ body }) => {
          counter.value = body.value;

          return counter;
        },
        {
          body: "UpdateCounterDomain",
          response: "CounterDomain",
          detail: {
            summary: "Set counter value",
          },
        }
      )
      .post(
        "/",
        () => {
          counter.value++;

          return counter;
        },
        {
          response: "CounterDomain",
          detail: {
            summary: "Increment counter",
          },
        }
      )
      .delete(
        "/",
        () => {
          counter.value--;

          return counter;
        },
        {
          response: "CounterDomain",
          detail: {
            summary: "Decrement counter",
          },
        }
      )
  );
}
