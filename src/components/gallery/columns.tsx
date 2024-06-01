"use client";

import * as React from "react";
import Image, { ImageProps } from "next/image";
import { GalleryImages } from "@ronin/casper";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { m, useInView } from "framer-motion";
import { GetGalleryImagesQuery } from "~/app/api/gallery/utils";

function makeColumns(images: GalleryImages) {
  const COLUMN_COUNT = 3;

  const columns: GalleryImages[] = [];

  for (let i = 0; i < images.length; i++) {
    const column = columns[i % COLUMN_COUNT] || [];
    const image = images[i]!;

    column.push(image);
    columns[i % COLUMN_COUNT] = column;
  }

  return columns;
}

export function Gallery({ initialData }: { initialData: GetGalleryImagesQuery }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    margin: "200px",
  });

  const { fetchNextPage, data, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    initialPageParam: null,
    refetchOnWindowFocus: false,
    initialData: { pages: [initialData], pageParams: [undefined, initialData.moreAfter] },
    queryKey: ["gallery"],
    queryFn: async ({ pageParam }) => {
      const tag = new URLSearchParams(window.location.search).get("tag");

      const searchParams = new URLSearchParams();
      if (pageParam) searchParams.set("after", pageParam);
      if (tag) searchParams.set("tag", tag);

      const res = await fetch(`/api/gallery?${searchParams.toString()}`);
      const data = (await res.json()) as GetGalleryImagesQuery;
      return data;
    },
    getNextPageParam: (lastPage) => lastPage.moreAfter,
  });

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = React.useMemo(() => {
    const pagesData = data.pages;
    const columns = makeColumns(pagesData.map((page) => page.data).flat());
    return columns;
  }, [data]);

  return (
    <>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        {columns.map((column, i) => (
          <Column key={`column-${i}`}>
            {column.map((image) => {
              const baseWidth = image.media.meta.width ?? 800;
              const baseHeight = image.media.meta.height ?? 1100;

              return (
                <ImageItem
                  key={image.media.key}
                  src={image.media.src}
                  width={baseWidth / 4}
                  height={baseHeight / 4}
                  alt={image.title}
                  blurDataURL={image.media.placeholder?.base64 || undefined}
                  id={image.id}
                />
              );
            })}
          </Column>
        ))}

        {hasNextPage ? <div ref={ref} /> : null}
      </div>

      {isFetchingNextPage ? (
        <div className="w-full flex items-center justify-center mt-5">
          <div className="relative h-2 w-full max-w-xs overflow-hidden rounded-md bg-accent/50">
            <m.div
              initial={{ left: "-100%" }}
              animate={{ left: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, repeatType: "mirror", duration: 1, type: "tween" }}
              className="absolute w-4/5 h-full rounded-md bg-accent"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

function Column(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{props.children}</div>;
}

function ImageItem(props: ImageProps) {
  return (
    <Link href={`/photo/${props.id}`}>
      <Image
        className="relative w-full h-fit overflow-hidden shadow-lg cursor-zoom-in object-cover"
        placeholder="blur"
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        quality={60}
        {...props}
      />
    </Link>
  );
}
