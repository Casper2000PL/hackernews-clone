import { PostCard } from "@/components/post-card";
import { SortBar } from "@/components/sort-bar";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/api";
import { useUpvotePost } from "@/lib/api-hooks";
import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import z from "zod";

const homeSearchSchema = z.object({
  sortBy: z.enum(["points", "recent"]).optional().default("recent"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  author: z.string().optional(),
  site: z.string().optional(),
});

const postsInfiniteQueryOptions = ({
  sortBy,
  order,
  author,
  site,
}: z.infer<typeof homeSearchSchema>) =>
  infiniteQueryOptions({
    queryKey: ["posts", { sortBy, order, author, site }],
    queryFn: ({ pageParam = 1 }) =>
      getPosts({
        pageParam,
        pagination: {
          sortBy,
          order,
          author,
          site,
        },
      }),
    initialPageParam: 1,
    staleTime: Infinity,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.pagination.totalPages <= lastPageParam) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });

export const Route = createFileRoute("/")({
  component: HomeComponent,
  validateSearch: zodSearchValidator(homeSearchSchema),
});

function HomeComponent() {
  const { sortBy, order, author, site } = Route.useSearch();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery(
      postsInfiniteQueryOptions({ sortBy, order, author, site }),
    );
  const upvoteMutation = useUpvotePost();

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-foreground mb-6 text-2xl font-bold">Submissions</h1>
      <SortBar sortBy={sortBy} order={order} />
      <div className="space-y-4">
        {data?.pages.map((page) =>
          page.data.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onUpvote={() => upvoteMutation.mutate(post.id.toString())}
            />
          )),
        )}
      </div>
      <div className="mt-6">
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more ..."
            : hasNextPage
              ? "Load More"
              : "No More Posts"}
        </Button>
      </div>
    </div>
  );
}
