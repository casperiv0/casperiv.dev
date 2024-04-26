import { get } from "ronin";
import { ImageComponent } from "./component";
import { Metadata } from "next";

export const revalidate = 600; // 10 minutes

interface ImageModalPageProps {
  params: { id: `rec_${string}` };
}

export async function generateMetadata(props: ImageModalPageProps): Promise<Metadata> {
  const image = await get.galleryImage.with.id(props.params.id);

  if (!image) {
    return {};
  }

  return {
    title: `${image.title} - Gallery`,
    openGraph: {
      title: `${image.title} - Gallery`,
      images: [
        {
          url: `${image.media.src}?q=75`,
          width: image.media.meta.width,
          height: image.media.meta.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${image.title} - Gallery`,
      images: [
        {
          url: `${image.media.src}?q=75`,
          width: image.media.meta.width,
          height: image.media.meta.height,
        },
      ],
    },
    alternates: {
      canonical: `https://casperiv.dev/gallery/${image.id}`,
    },
  };
}

export default async function ImageModalPage(props: ImageModalPageProps) {
  const image = await get.galleryImage.with.id(props.params.id);

  if (!image) {
    return null;
  }

  return (
    <ImageComponent
      title={image.title}
      imageProps={{
        src: image.media.src,
        width: image.media.meta.width / 2,
        height: image.media.meta.height / 2,
        alt: image.title,
        blurDataURL: image.media.placeholder.base64 || undefined,
        id: image.id,
      }}
    />
  );
}

export async function generateStaticParams() {
  const data = await get.galleryImages.limitedTo(1000);

  return data.map((image) => ({
    id: image.id,
  }));
}
