import {sanityFetch} from "./live";
import {homepageQuery, type SanityHomepageDoc} from "./homepageQuery";

export async function fetchHomepage(): Promise<SanityHomepageDoc> {
  try {
    const {data} = await sanityFetch({query: homepageQuery});
    return data;
  } catch {
    return null;
  }
}
