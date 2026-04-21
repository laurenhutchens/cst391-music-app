                                                                                     
  "use client";   

  import { useEffect, useState } from "react";
  import { useParams } from "next/navigation";
  import { useSession } from "next-auth/react";                                        
  import NavBar from "@/app/components/NavBar";
                                                                                       
  interface Track {                                                                    
    id: number;
    album_id: number;                                                                  
    title: string;
    number: number;
    video_url: string | null;
    lyrics: string | null;
  }
                                                                                       
  interface Album {
    id: number;                                                                        
    title: string;
    artist: string;
    year: number;
    image?: string;
    description?: string;
  }                                                                                    
   
  interface Review {                                                                   
    id: number;   
    track_id: number;
    rating: number;
    comment: string | null;
    user_email: string | null;
    created_at: string;
  }                                                                                    
   
  export default function ShowPage() {                                                 
    const params = useParams();
    const id = params?.id as string;
    const { data: session } = useSession();

    const [album, setAlbum] = useState<Album | null>(null);                            
    const [tracks, setTracks] = useState<Track[]>([]);
    const [showForm, setShowForm] = useState(false);                                   
    const [editingTrack, setEditingTrack] = useState<Track | null>(null);              
    const [form, setForm] = useState({ title: "", number: "", video_url: "", lyrics: ""
   });                                                                                 
                  
    // reviews state keyed by trackId                                                  
    const [reviews, setReviews] = useState<Record<number, Review[]>>({});
    const [reviewForm, setReviewForm] = useState<Record<number, { rating: number;      
  comment: string }>>({});                                                             
    const [expandedTrack, setExpandedTrack] = useState<number | null>(null);           
                                                                                       
    useEffect(() => {
      fetch(`/api/albums?albumId=${id}`)
        .then(r => r.json())                                                           
        .then(data => setAlbum(Array.isArray(data) ? data[0] : data));
      fetchTracks();                                                                   
    }, [id]);     
                                                                                       
    function fetchTracks() {
      fetch(`/api/albums/${id}/tracks`)
        .then(r => r.json())
        .then(setTracks);                                                              
    }
                                                                                       
    function fetchReviews(trackId: number) {
      fetch(`/api/tracks/${trackId}/reviews`)
        .then(r => r.json())
        .then(data => setReviews(prev => ({ ...prev, [trackId]: data })));             
    }
                                                                                       
    function toggleReviews(trackId: number) {                                          
      if (expandedTrack === trackId) {
        setExpandedTrack(null);                                                        
      } else {    
        setExpandedTrack(trackId);
        fetchReviews(trackId);
      }                                                                                
    }
                                                                                       
    async function submitReview(trackId: number) {
      const { rating, comment } = reviewForm[trackId] ?? { rating: 0, comment: "" };
      if (!rating) return;                                                             
      await fetch(`/api/tracks/${trackId}/reviews`, {
        method: "POST",                                                                
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment: comment || null }),                    
      });         
      setReviewForm(prev => ({ ...prev, [trackId]: { rating: 0, comment: "" } }));
      fetchReviews(trackId);                                                           
    }
                                                                                       
    function openAdd() {                                                               
      setEditingTrack(null);
      setForm({ title: "", number: "", video_url: "", lyrics: "" });                   
      setShowForm(true);
    }

    function openEdit(track: Track) {
      setEditingTrack(track);
      setForm({                                                                        
        title: track.title,
        number: String(track.number),                                                  
        video_url: track.video_url ?? "",
        lyrics: track.lyrics ?? "",
      });
      setShowForm(true);
    }                                                                                  
   
    async function handleDelete(trackId: number) {                                     
      if (!window.confirm("Delete this track?")) return;
      await fetch(`/api/tracks/${trackId}`, { method: "DELETE" });
      fetchTracks();                                                                   
    }
                                                                                       
    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      const body = {
        title: form.title,
        number: parseInt(form.number),                                                 
        video_url: form.video_url || null,
        lyrics: form.lyrics || null,                                                   
      };          
      if (editingTrack) {
        await fetch(`/api/tracks/${editingTrack.id}`, {
          method: "PATCH",                                                             
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),                                                  
        });       
      } else {
        await fetch(`/api/albums/${id}/tracks`, {
          method: "POST",                                                              
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),                                                  
        });       
      }
      setShowForm(false);
      fetchTracks();
    }

    return (                                                                           
      <main>
        <NavBar />                                                                     
        <div className="container mt-4">
          {album && (
            <>                                                                         
              <h2>{album.title}</h2>
              <p className="text-muted">{album.artist} — {album.year}</p>              
            </>                                                                        
          )}
          <button className="btn btn-success mb-3" onClick={openAdd}>Add Track</button>
                                                                                       
          {showForm && (
            <form onSubmit={handleSubmit} className="card p-3 mb-4">                   
              <div className="mb-2">                                                   
                <label className="form-label">Title</label>
                <input className="form-control" value={form.title}                     
                  onChange={e => setForm({ ...form, title: e.target.value })} required 
  />
              </div>                                                                   
              <div className="mb-2">
                <label className="form-label">Track Number</label>                     
                <input type="number" className="form-control" value={form.number}
                  onChange={e => setForm({ ...form, number: e.target.value })} required
   />                                                                                  
              </div>
              <div className="mb-2">                                                   
                <label className="form-label">Video URL</label>
                <input className="form-control" value={form.video_url}
                  onChange={e => setForm({ ...form, video_url: e.target.value })} />
              </div>                                                                   
              <div className="mb-2">
                <label className="form-label">Lyrics</label>                           
                <textarea className="form-control" value={form.lyrics}
                  onChange={e => setForm({ ...form, lyrics: e.target.value })} rows={3}
   />
              </div>                                                                   
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingTrack ? "Update" : "Create"}                                 
                </button>
                <button type="button" className="btn btn-secondary"                    
                  onClick={() => setShowForm(false)}>Cancel</button>                   
              </div>
            </form>                                                                    
          )}      

          <ul className="list-group mb-4">
            {tracks.map(track => (
              <li key={track.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">    
                  <span>{track.number}. {track.title}</span>
                  <div className="d-flex gap-2">                                       
                    <button className="btn btn-sm btn-outline-secondary"
                      onClick={() => toggleReviews(track.id)}>                         
                      {expandedTrack === track.id ? "Hide Reviews" : "Reviews"}        
                    </button>
                    <button className="btn btn-sm btn-outline-primary" onClick={() =>  
  openEdit(track)}>Edit</button>                                                       
                    <button className="btn btn-sm btn-outline-danger" onClick={() =>
  handleDelete(track.id)}>Delete</button>                                              
                  </div>
                </div>

                {expandedTrack === track.id && (
                  <div className="mt-3">
                    {/* Review submission form */}                                     
                    <div className="card p-3 mb-3 bg-light">
                      <h6 className="mb-2">Leave a Review</h6>                         
                      {/* gold/grey based on selected rating, no icon library needed */}
                      <div className="d-flex gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            className="btn btn-sm p-0 border-0"
                            style={{ fontSize: "1.4rem", color: star <= (reviewForm[track.id]?.rating ?? 0) ? "#f5a623" : "#ccc" }}
                            onClick={() => setReviewForm(prev => ({
                              ...prev,
                              [track.id]: { ...prev[track.id] ?? { comment: "" }, rating: star }
                            }))}
                          >★</button>                                                  
                        ))}
                      </div>
                      <textarea
                        className="form-control mb-2"                                  
                        rows={2}
                        placeholder="Optional comment..."                              
                        value={reviewForm[track.id]?.comment ?? ""}
                        onChange={e => setReviewForm(prev => ({                        
                          ...prev,
                          [track.id]: { ...prev[track.id] ?? { rating: 0 }, comment:   
  e.target.value }                                                                     
                        }))}
                      />                                                               
                      <button
                        className="btn btn-primary btn-sm"
                        disabled={!reviewForm[track.id]?.rating}
                        onClick={() => submitReview(track.id)}
                      >                                                                
                        Submit Review
                      </button>                                                        
                    </div>

                    {/* Existing reviews */}
                    {(reviews[track.id] ?? []).length === 0 ? (
                      <p className="text-muted small">No reviews yet.</p>              
                    ) : (
                      (reviews[track.id] ?? []).map(r => (                             
                        <div key={r.id} className="border rounded p-2 mb-2">           
                          <div className="d-flex justify-content-between">
                            <span style={{ color: "#f5a623"                            
  }}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>                           
                            <small className="text-muted">{r.user_email ??             
  "Anonymous"}</small>                                                                 
                          </div>
                          {r.comment && <p className="mb-0 mt-1 small">{r.comment}</p>}
                        </div>                                                         
                      ))
                    )}                                                                 
                  </div>
                )}
              </li>
            ))}
          </ul>                                                                        
        </div>
      </main>                                                                          
    );            
  }