import { getAllPosts } from "@/lib/posts";
import Link from "next/link";
import { redirect } from "next/navigation";

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

      {/* Placeholder until a post is chosen */}
      <main className="flex-1 p-10 flex items-center justify-center">
        <h1 className="text-2xl text-gray-400">
          👈 Select a blog post from the sidebar
        </h1>
      </main>
    </div>
  );
}
