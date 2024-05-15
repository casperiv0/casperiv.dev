import { get } from "ronin";

export type GetGalleryImagesQuery = Awaited<ReturnType<typeof getGalleryImagesServer>>;
interface GetGalleryImagesOptions {
  after?: string | null;
  tag?: string | null;
}

export async function getGalleryImagesServer(options: GetGalleryImagesOptions) {
  const data = await get.galleryImages({
    // eslint-disable-next-line eqeqeq
    after: options.after != null ? options.after : undefined,
    orderedBy: {
      descending: ["ronin.createdAt"],
    },
    limitedTo: 9,
    with: options.tag
      ? {
          tag: options.tag,
        }
      : undefined,
  });

  return { data, moreAfter: data.moreAfter };
}
