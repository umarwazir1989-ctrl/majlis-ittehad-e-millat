import {siteDetails} from "../../data/site";

export const siteConfig={
  name:siteDetails.name,
  shortName:siteDetails.shortName,
  description:siteDetails.description,
  url:process.env.NEXT_PUBLIC_SITE_URL||"https://majlis-ittehad-e-millat.vercel.app",
  locale:"ur_PK"
};
