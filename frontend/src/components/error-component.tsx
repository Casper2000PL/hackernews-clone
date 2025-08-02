import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const ErrorComponent = ({ error }: { error: Error }) => {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  const queryClientErrorBoundary = useQueryErrorResetBoundary();

  useEffect(() => {
    queryClientErrorBoundary.reset();
  }, [queryClientErrorBoundary]);

  return (
    <div className="mt-8 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Alert
          variant="destructive"
          className="border-destructive flex flex-col items-center justify-center gap-4 border-1 p-4"
        >
          <AlertTriangleIcon className="size-6!" />
          <AlertTitle className="text-base font-semibold">
            Oops! Something went wrong.
          </AlertTitle>
          <AlertDescription className="text-sm">
            We&apos;re sorry, but something went wrong.
          </AlertDescription>
        </Alert>

        <div className="mt-4 space-y-4">
          <Button
            className="w-full"
            onClick={() => {
              router.invalidate();
            }}
          >
            Try Again
          </Button>
          <Button className="w-full" variant="outline" asChild>
            <Link to="/">Return to homepage</Link>
          </Button>
          {isDev ? (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="error-details">
                <AccordionTrigger className="font-semibold">
                  View error details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="bg-muted rounded-md p-4">
                    <h3 className="mb-2 font-semibold">Error Message:</h3>
                    <p className="mb-4 text-sm">{error.message}</p>
                    <h3 className="mb-2 font-semibold">Stack Trace:</h3>
                    <pre className="overflow-x-auto text-xs whitespace-pre-wrap">
                      {error.stack}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
