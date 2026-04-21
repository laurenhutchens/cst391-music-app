"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/components/NavBar";

interface Review {
  id: number;
  track_id: number;
  track_title: string;
  album_title: string;
  user_email: string | null;
  rating: number;
  comment: string | null;
  is_hidden: boolean;
  created_at: string;
}

export default function AdminReviewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (status === "loading") return;
    if (session?.user?.role !== "admin") {
      router.replace("/");
      return;
    }
    fetchReviews();
  }, [session, status]);

  function fetchReviews() {
    fetch("/api/admin/reviews")
      .then(r => r.json())
      .then(setReviews);
  }

  async function toggleHide(id: number, currentlyHidden: boolean) {
    await fetch(`/api/admin/reviews/${id}/hide`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_hidden: !currentlyHidden }),
    });
    fetchReviews();
  }

  async function deleteReview(id: number) {
    if (!window.confirm("Permanently delete this review?")) return;
    await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    fetchReviews();
  }

  if (status === "loading" || session?.user?.role !== "admin") return null;

  return (
    <main>
      <NavBar />
      <div className="container mt-4">
        <h2>Admin — All Reviews</h2>
        <p className="text-muted">{reviews.length} total reviews</p>
        <table className="table table-bordered table-sm">
          <thead className="table-dark">
            <tr>
              <th>Album</th>
              <th>Track</th>
              <th>User</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id} className={r.is_hidden ? "table-secondary text-muted" : ""}>
                <td>{r.album_title}</td>
                <td>{r.track_title}</td>
                <td>{r.user_email ?? "Anonymous"}</td>
                <td>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                <td>{r.comment ?? <em>—</em>}</td>
                <td>{r.is_hidden ? <span className="badge bg-secondary">Hidden</span> : <span className="badge bg-success">Visible</span>}</td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      className={`btn btn-sm ${r.is_hidden ? "btn-outline-success" : "btn-outline-warning"}`}
                      onClick={() => toggleHide(r.id, r.is_hidden)}
                    >
                      {r.is_hidden ? "Unhide" : "Hide"}
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteReview(r.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
