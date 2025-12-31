import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "./config/api.js";
import "./recommendation.css"; // Ensure your CSS file is imported

const RecommendationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const mood = params.get("mood");
    const aesthetic = params.get("aesthetic");

    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const TMDB_IMG = "https://image.tmdb.org/t/p/w500";
    const goHome = () => navigate("/home");

    useEffect(() => {
        if (!mood || !aesthetic) {
            setError("Mood or aesthetic missing.");
            setLoading(false);
            return;
        }

        const fetchRecommendations = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${API_BASE_URL}/api/recommend/mood-aesthetic?mood=${encodeURIComponent(mood)}&aesthetic=${encodeURIComponent(aesthetic)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch recommendations");
                }

                const data = await response.json();
                // We set the whole object (contains movies and books) to the state
                setRecommendations(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [mood, aesthetic]);

    // This is the UI you typed, integrated with the logic
    return (
        <div className="rec-container">
            <h1 className="rec-title"> ✨ Your Personalized Recommendations ✨ </h1>
            <button className="rec-back-btn" onClick={goHome}> Back to Home </button>

            {loading && <p className="loading"> Loading Recommendations...</p>}
            {error && <p className="error">{error}</p>}

            {recommendations && (
                <>
                    {/* Movies Section */}
                    <section className="rec-section">
                        <h2 className="section-title">Movies You'll Love</h2>
                        <div className="rec-grid">
                            {recommendations.movies?.map((movie, idx) => (
                                <div className="rec-card" key={idx}>
                                    <img
                                        className="rec-img"
                                        src={movie.poster_path ? TMDB_IMG + movie.poster_path : "/placeholder.png"}
                                        alt={movie.title}
                                    />
                                    <p className="rec-name">{movie.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Books Section */}
                    <section className="rec-section">
                        <h2 className="section-title">Books Just for You</h2>
                        <div className="rec-grid">
                            {recommendations.books?.map((book, idx) => {
                                const cover =
                                    book.volumeInfo?.imageLinks?.thumbnail ||
                                    "/placeholder-book.png";

                                return (
                                    <div className="rec-card" key={idx}>
                                        <img
                                            className="rec-img"
                                            src={cover}
                                            alt={book.volumeInfo?.title}
                                        />
                                        <p className="rec-name">
                                            {book.volumeInfo?.title}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default RecommendationPage;