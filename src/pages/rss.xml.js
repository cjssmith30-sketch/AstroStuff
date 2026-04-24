import rss from "@astrojs/rss";

const posts = Object.entries(
  import.meta.glob("./posts/*.md", { eager: true })
).map(([path, post]) => {
  const slug = path.split("/").pop().replace(".md", "");

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    pubDate: post.frontmatter.pubDate,
    link: `/posts/${slug}`,
  };
});

export function GET(context) {
  return rss({
    title: "My Blog",
    description: "My Astro blog RSS feed",
    site: context.site,
    items: posts,
  });
}