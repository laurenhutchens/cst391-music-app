import Link from "next/link";

// This is an SSR component - no "use client" directive needed
export default function AboutPage() {
  return (
    <div className="container mt-5">
      <div className="card text-center shadow">
        <div className="card-header">
          <h1>My Music App</h1>
        </div>
        <div className="card-body">
          <h5 className="card-title">Lauren Hutchens</h5>
          <p className="card-text">Boss &amp; Lead Developer</p>
          <p className="card-text">
            A full-stack music album manager built with Next.js and TypeScript.
          </p>
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
