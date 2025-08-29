import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 bg-black/50 backdrop-blur-sm">
        <h2 className="text-2xl font-extrabold mb-6 text-[#50ffff]">My Blog</h2>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="block text-lg font-medium text-gray-300 hover:text-[#50ffff] transition-colors"
              >
                {post.title || post.slug}
              </Link>
              <p className="text-gray-500 text-xs mt-1">{post.date}</p>
            </li>
          ))}
        </ul>
      </aside>

      {/* Landing page */}
      <main className="flex-1 flex flex-col items-center justify-center p-10 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(80,255,255,0.1),transparent_70%)]"></div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-[#50ffff] via-cyan-400 to-[#50ffff] bg-clip-text text-transparent animate-pulse">
            My Blog
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Thoughts, tutorials, and stories about{" "}
          <span className="text-[#50ffff] font-medium">web development</span>,{" "}
          <span className="text-[#50ffff] font-medium">Next.js</span>, and
          everything in between.
        </p>

        {/* Featured post */}
        {posts.length > 0 && (
          <div className="w-full max-w-lg p-6 rounded-2xl bg-gray-900/60 border border-gray-800 shadow-lg backdrop-blur text-left">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-[#50ffff]" />
              Featured Post
            </h3>
            <Link
              href={`/posts/${posts[0].slug}`}
              className="block text-2xl font-bold mb-2 hover:text-[#50ffff] transition"
            >
              {posts[0].title}
            </Link>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
              {posts[0].excerpt || "Click to explore this article"}
            </p>
            <Link
              href={`/posts/${posts[0].slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#50ffff] text-black font-semibold hover:bg-[#3edcdc] transition"
            >
              🚀 Start Reading <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
