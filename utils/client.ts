import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "qror8nek", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const user = sanityClient({
  projectId: "qror8nek", // you can find this in sanity.json
  dataset: "production", // or the name you chose in step 1
  useCdn: false, // `false` if you want to ensure fresh data
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
