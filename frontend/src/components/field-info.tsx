import type { AnyFieldApi } from "@tanstack/react-form";

export function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <p className="text-destructive text-[0.8rem] font-medium">
          {field.state.meta.errors
            .map((error) =>
              typeof error === "string"
                ? error
                : error?.message || String(error),
            )
            .join(", ")}
        </p>
      ) : null}
    </>
  );
}
