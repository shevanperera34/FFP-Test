import {draftMode} from "next/headers";
import {NextResponse} from "next/server";
import {withBasePath} from "@/config/site";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();
  const url = new URL(request.url);
  const target = new URL(withBasePath("/"), `${url.protocol}//${url.host}`);
  return NextResponse.redirect(target);
}
