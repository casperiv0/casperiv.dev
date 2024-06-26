import { get } from "ronin";
import { ImageModal } from "~/components/gallery/image-modal";

export const revalidate = 600; // 10 minutes

interface ImageModalPageProps {
  params: { id: `rec_${string}` };
}

export default async function ImageModalPage({ params }: ImageModalPageProps) {
  const image = await get.galleryImage.with.id(params.id);

  if (!image) {
    return null;
  }

  const baseWidth = image.media.meta.width ?? 800;
  const baseHeight = image.media.meta.height ?? 1100;

  return (
    <ImageModal
      key={image.media.key}
      src={image.media.src}
      width={baseWidth / 2}
      height={baseHeight / 2}
      alt={image.title}
      blurDataURL={image.media.placeholder?.base64 || undefined}
      id={image.id}
    />
  );
}

export async function generateStaticParams() {
  const data = await get.galleryImages.limitedTo(1000);

  return data.map((image) => ({
    id: image.id,
  }));
}
