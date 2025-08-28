import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">My Blog</h2>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block text-white hover:text-[#50ffff] transition-colors"
              >
                {post.title || post.slug}
              </Link>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Landing page */}
      <main className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-[#50ffff]">My Blog</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mb-8">
          Thoughts, tutorials, and stories about web development, Next.js, and
          everything in between.
        </p>
        {posts.length > 0 && (
          <Link
            href={`/posts/${posts[0].slug}`}
            className="px-6 py-3 rounded-lg bg-[#50ffff] text-black font-semibold hover:bg-[#3edcdc] transition"
          >
            🚀 Start Reading
          </Link>
        )}
      </main>
    </div>
  );
}
