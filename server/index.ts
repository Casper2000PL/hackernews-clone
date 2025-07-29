import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import type { ErrorResponse } from "@/shared/types";

const app = new Hono();

app.get("/", (c) => {
  throw new HTTPException(404, { message: "404 NOT FOUND" });

  return c.text("Hello Hono!");
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errorResponse =
      err.res ??
      c.json<ErrorResponse>({
        success: false,
        error: err.message,
        isFormError:
          err.cause && typeof err.cause === "object" && "form" in err.cause
            ? err.cause.form === true
            : false,
      });

    return errorResponse;
  }

  return c.json<ErrorResponse>(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : (err.stack ?? err.message),
      isFormError: false,
    },
    500,
  );
});

export default app;
