import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import z from "zod";
import { fallback, zodSearchValidator } from "@tanstack/router-zod-adapter";
import { useForm } from "@tanstack/react-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { loginSchema } from "@/shared/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldInfo } from "@/components/field-info";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postSignup, userQueryOptions } from "@/lib/api";

// 'zodValidator' is deprecated
// import { zodValidator } from "@tanstack/zod-form-adapter";

const signupSearchSchema = z.object({
  redirect: fallback(z.string(), "/").default("/"),
});

export const Route = createFileRoute("/signup")({
  component: () => <SignupComponent />,

  validateSearch: zodSearchValidator(signupSearchSchema),

  beforeLoad: async ({ context, search }) => {
    const user = await context.queryClient.ensureQueryData(userQueryOptions());

    if (user) {
      throw redirect({ to: search.redirect });
    }
  },
});

function SignupComponent() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    //validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const res = await postSignup(value.username, value.password);

      if (res.success) {
        await queryClient.invalidateQueries({ queryKey: ["user"] });

        router.invalidate();

        await navigate({ to: search.redirect });

        return null;
      } else {
        if (!res.isFormError) {
          toast.error("Signup failed", { description: res.error });
        }

        form.setErrorMap({
          onSubmit: res.isFormError ? res.error : "Unexpected error",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      }
    },
  });

  return (
    <div className="w-full">
      <Card className="border-border/25 mx-auto mt-12 max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Sign up
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create an account.
            </CardDescription>
            <CardContent>
              <div className="mt-4 grid gap-4">
                <form.Field
                  name="username"
                  children={(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor={field.name} className="font-semibold">
                        Username
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Field
                  name="password"
                  children={(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor={field.name} className="font-semibold">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Subscribe
                  selector={(state) => [state.errorMap]}
                  children={([errorMap]) =>
                    errorMap.onSubmit ? (
                      <p className="text-destructive text-[0.8rem] font-medium">
                        {String(errorMap.onSubmit)}
                      </p>
                    ) : null
                  }
                />
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={!canSubmit}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  )}
                />
              </div>
            </CardContent>
          </CardHeader>
        </form>
      </Card>
    </div>
  );
}
