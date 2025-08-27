import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import Link from "next/link";

const md = new MarkdownIt();

function fetchPost(page) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === page);
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ page: post.slug }));
}

export default async function Post({ params }) {
  const { page } = await params;

  const posts = getAllPosts();
  const post = fetchPost(page);

  if (!post) notFound();

  const htmlConverter = md.render(post.content);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">My Blog</h2>
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/posts/${p.slug}`}
                className={`block transition-colors ${
                  page === p.slug ? "text-[#50ffff]" : "text-white"
                } hover:text-[#50ffff]`}
              >
                {p.title || p.slug}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <article
          className="
            max-w-3xl mx-auto
            space-y-6
            [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mb-4
            [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:mb-3
            [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-2
            [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-4
            [&_a]:text-[#50ffff] [&_a:hover]:underline
            [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2
            [&_blockquote]:bg-gray-900 [&_blockquote]:border-l-4 [&_blockquote]:border-[#50ffff] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-6
            [&_code]:bg-gray-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:font-mono [&_code]:text-[#50ffff]
            [&_pre]:bg-gray-900 [&_pre]:text-[#50ffff] [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
            [&_pre_code]:bg-transparent [&_pre_code]:text-inherit
          "
          dangerouslySetInnerHTML={{ __html: htmlConverter }}
        />
      </main>
    </div>
  );
}
