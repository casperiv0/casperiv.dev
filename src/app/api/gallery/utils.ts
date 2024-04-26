import { get } from "ronin";

export type GetGalleryImagesQuery = Awaited<ReturnType<typeof getGalleryImagesServer>>;
export async function getGalleryImagesServer(after?: string | null) {
  const data = await get.galleryImages({
    // eslint-disable-next-line eqeqeq
    after: after != null ? after : undefined,
    orderedBy: {
      descending: ["ronin.createdAt"],
    },
    limitedTo: 9,
  });

  return { data, moreAfter: data.moreAfter };
}
