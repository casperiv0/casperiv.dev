"use client";

import Image, { ImageProps } from "next/image";
import { ArrowLeft } from "@phosphor-icons/react";
import { Link } from "~/components/link";

interface ImageComponentProps {
  imageProps: ImageProps;
  title: string;
}

export function ImageComponent(props: ImageComponentProps) {
  return (
    <main className="mt-16 mx-auto max-w-6xl pb-6 px-5 md:px-0">
      <header className="flex flex-col gap-y-5 sm:flex-row sm:items-center justify-between">
        <h1 className="text-3xl font-bold capitalize md:text-4xl font-title">{props.title}</h1>

        <Link className="max-w-fit" intent="secondary" extras="icon" href="/gallery">
          Gallery
          <ArrowLeft className="ml-1.5" width={20} height={20} />
        </Link>
      </header>

      <Image
        className="shadow-sm mt-3"
        placeholder="blur"
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        {...props.imageProps}
        quality={100}
      />
    </main>
  );
}
