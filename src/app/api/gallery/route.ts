import { NextResponse } from "next/server";
import { GetGalleryImagesQuery, getGalleryImagesServer } from "./utils";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const tag = searchParams.get("tag");
  const after = searchParams.get("after");

  const data = await getGalleryImagesServer({ after, tag });
  return NextResponse.json<GetGalleryImagesQuery>(data);
}
