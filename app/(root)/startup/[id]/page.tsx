import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  STARTUP_BY_ID_QUERY,
  PLAYLIST_BY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import React, { Suspense } from "react";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const markdown = markdownit();

export const experimental_ppr = true;

const Startup = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  const playlist = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
    slug: "editor-picks-december",
  });

  const editorPosts = playlist[0].select;

  if (!post) return notFound();

  const parsedContent = markdown.render(post?.pitch ?? "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rouded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg !h-16"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            ></article>
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id}></View>
        </Suspense>
      </section>
    </>
  );
};

export default Startup;
