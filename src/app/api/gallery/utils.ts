import { get } from "ronin";

export type GetGalleryImagesQuery = Awaited<ReturnType<typeof getGalleryImagesServer>>;
export async function getGalleryImagesServer(after?: string | null) {
  const data = await get.galleryImages({
    limitedTo: 9,
    // eslint-disable-next-line eqeqeq
    after: after != null ? after : undefined,
    orderedBy: {
      descending: ["ronin.createdAt"],
    },
  });

  return { data, moreAfter: data.moreAfter };
}
