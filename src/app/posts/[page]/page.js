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
                {p.title || p.slug} {/* fallback to filename if no title */}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <article className="prose prose-invert max-w-3xl">
          <h1 className="text-3xl font-bold mb-4">{post.title || post.slug}</h1>
          <p className="text-gray-400 mb-8">{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: htmlConverter }} />
        </article>
      </main>
    </div>
  );
}
