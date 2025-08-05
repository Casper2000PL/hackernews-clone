import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { ChevronUpIcon, UserIcon } from "lucide-react";

import { Post } from "@/shared/types";
import { userQueryOptions } from "@/lib/api";
import { cn, relativeTime } from "@/lib/utils";

import { Badge } from "./ui/badge";
import { Card, CardContent, CardTitle } from "./ui/card";

export const PostCard = ({
  post,
  onUpvote,
}: {
  post: Post;
  onUpvote?: (id: number) => void;
}) => {
  const { data: user } = useQuery(userQueryOptions());

  return (
    <Card className="flex items-start justify-start px-5 py-10">
      <div className="flex w-full items-center gap-5">
        <button
          className={cn(
            "text-muted-foreground hover:text-primary ml-3 flex cursor-pointer flex-col items-center justify-center",
            post.isUpvoted ? "text-primary" : "",
          )}
          onClick={() => onUpvote?.(post.id)}
          disabled={!user}
        >
          <ChevronUpIcon size={20} strokeWidth={2} />
          <span className="text-xs font-semibold">{post.points}</span>
        </button>
        <CardTitle className="font-xl text-2xl font-semibold">
          {post.url ? (
            <a
              href={post.url}
              className="text-foreground hover:text-primary hover:underline"
            >
              {post.title}
            </a>
          ) : (
            <Link
              to={"/"}
              className="text-foreground hover:text-primary hover:underline"
            >
              {post.title}
            </Link>
          )}
        </CardTitle>
        {post.url ? (
          <Link to="/" search={{ site: post.url }}>
            <Badge className="hover:bg-primary/90 bg-stone-200 text-black transition-all hover:text-white">
              {new URL(post.url).hostname}
            </Badge>
          </Link>
        ) : null}
      </div>
      <CardContent>
        {" "}
        <div className="text-muted-foreground flex min-h-20 w-full flex-col items-start justify-start gap-4 px-5">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>by</span>
            <Link
              to="/"
              search={{ author: post.author }}
              className="hover:text-primary flex"
            >
              <UserIcon className="mr-0.5 inline size-5" />
              {post.author.username}
            </Link>
            <div className="rounded-full bg-black/75 p-0.5" />
            <p>{relativeTime(post.createdAt)}</p>
            <div className="rounded-full bg-black/75 p-0.5" />
            <Link to={"/"} className="hover:underline">
              {post.commentCount} comments
            </Link>
          </div>
          <p className="text-base">{post.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};
