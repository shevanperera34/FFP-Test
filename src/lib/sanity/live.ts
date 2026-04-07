import {defineLive} from "next-sanity/live";
import {previewClient} from "./previewClient";
import {getSanityReadToken} from "./readToken";

const readToken = getSanityReadToken();
const tokenOrFalse = readToken.length > 0 ? readToken : false;

/** Browser EventSource to /data/live requires the page origin in Sanity → API → CORS. */
const browserLive =
  process.env.SANITY_LIVE_BROWSER === "0" || process.env.SANITY_LIVE_BROWSER === "false"
    ? false
    : tokenOrFalse;

export const {sanityFetch, SanityLive} = defineLive({
  client: previewClient,
  serverToken: tokenOrFalse,
  browserToken: browserLive,
});
