import React, { useEffect, useState } from "react";
import { TextField, Card, CardContent, Typography, CardActionArea, Box, Link, Grid } from "@mui/material";

const API_BASE_URL = "https://song-api-g1nk.onrender.com";

function getYoutubeId(title) {
  const knownSongs = {
    one: "ftjEcrrf7r0",
    sometimes: "t0bPrt69rag",
    ligaya: "XibB-5BPdrY",
  };
  const key = title.toLowerCase();
  return knownSongs[key] || null;
}

export default function SongApp() {
  const [allSongs, setAllSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredSongs(allSongs);
    } else {
      const term = search.toLowerCase();
      setFilteredSongs(
        allSongs.filter(
          (song) =>
            (song.title && song.title.toLowerCase().includes(term)) ||
            (song.artist && song.artist.toLowerCase().includes(term))
        )
      );
    }
  }, [search, allSongs]);

  const fetchSongs = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/songs`);
      let data = await res.json();
      // Fallback to mock data if API fails
      if (!Array.isArray(data) || !data.length) {
        data = [
          {
            id: 1,
            title: "One",
            artist: "U2",
            album: "Achtung Baby",
            genre: "Rock",
            youtubeId: "ftjEcrrf7r0",
          },
          {
            id: 2,
            title: "Sometimes",
            artist: "Britney Spears",
            album: "...Baby One More Time",
            genre: "Pop",
            youtubeId: "t0bPrt69rag",
          },
          {
            id: 3,
            title: "Ligaya",
            artist: "Eraserheads",
            album: "Ultraelectromagneticpop!",
            genre: "OPM",
            youtubeId: "XibB-5BPdrY",
          },
        ];
      }
      // Ensure youtubeId exists
      data = data.map((song) => ({
        ...song,
        youtubeId: song.youtubeId || getYoutubeId(song.title) || "ftjEcrrf7r0",
      }));
      setAllSongs(data);
      setFilteredSongs(data);
      setFeatured(data[0]);
    } catch (e) {
      // fallback to mock data
      const mockSongs = [
        {
          id: 1,
          title: "One",
          artist: "U2",
          album: "Achtung Baby",
          genre: "Rock",
          youtubeId: "ftjEcrrf7r0",
        },
        {
          id: 2,
          title: "Sometimes",
          artist: "Britney Spears",
          album: "...Baby One More Time",
          genre: "Pop",
          youtubeId: "t0bPrt69rag",
        },
        {
          id: 3,
          title: "Ligaya",
          artist: "Eraserheads",
          album: "Ultraelectromagneticpop!",
          genre: "OPM",
          youtubeId: "XibB-5BPdrY",
        },
      ];
      setAllSongs(mockSongs);
      setFilteredSongs(mockSongs);
      setFeatured(mockSongs[0]);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f0f0f", color: "#fff", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, bgcolor: "#0f0f0f", p: 2, display: { xs: "none", sm: "block" } }}>
        <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold", color: "#fff" }}>
          Song UI
        </Typography>
        <Box component="ul" sx={{ listStyle: "none", p: 0, color: "#aaa" }}>
          <li style={{ marginBottom: 16 }}><i className="fa-solid fa-home"></i> Home</li>
          <li style={{ marginBottom: 16 }}><i className="fa-solid fa-fire"></i> Trending</li>
          <li><i className="fa-solid fa-music"></i> Music</li>
        </Box>
      </Box>
      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header/Search */}
        <Box sx={{ p: 2, borderBottom: "1px solid #222", bgcolor: "#181818" }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <i className="fa-solid fa-search" style={{ marginRight: 8, color: "#aaa" }}></i>,
              style: { background: "#222", color: "#fff" },
            }}
            sx={{ width: 300 }}
          />
        </Box>
        {/* Content Grid */}
        <Grid container sx={{ flex: 1, overflow: "auto", p: 2 }} spacing={2}>
          {/* Featured Song */}
          <Grid item xs={12} md={7}>
            {featured && (
              <Card sx={{ bgcolor: "#181818", color: "#fff", mb: 2 }}>
                <CardContent>
                  <Typography variant="h4" id="feat-title" sx={{ fontWeight: "bold" }}>
                    {featured.title}
                  </Typography>
                  <Typography variant="subtitle1" id="feat-artist" sx={{ color: "#aaa", mb: 2 }}>
                    {featured.artist} • {featured.album} • {featured.genre}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Link
                      href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
                      target="_blank"
                      rel="noopener"
                      underline="none"
                      sx={{ color: "#ff0000", fontWeight: "bold" }}
                      id="feat-link"
                    >
                      OPEN <i className="fa-solid fa-external-link-alt"></i>
                    </Link>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <iframe
                      id="video-frame"
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${featured.youtubeId}?autoplay=0`}
                      title="YouTube video player"
                      frameBorder="0"
                      allowFullScreen
                      style={{ borderRadius: 8 }}
                    ></iframe>
                  </Box>
                  <Typography variant="h5" id="feat-bottom-title" sx={{ fontWeight: "bold" }}>
                    {featured.title}
                  </Typography>
                  <Typography variant="subtitle2" id="feat-bottom-artist" sx={{ color: "#aaa" }}>
                    {featured.artist} • {featured.album} • {featured.genre}
                  </Typography>
                  <Typography sx={{ mt: 2, color: "#aaa" }}>
                    Search like YouTube, then click a card in "Recommended" to play.
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
          {/* Recommended List */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
              Recommended
            </Typography>
            <Grid container spacing={2} id="recommended-list">
              {filteredSongs.map((song) => {
                const thumbnailUrl = `https://i.ytimg.com/vi/${song.youtubeId}/hqdefault.jpg`;
                return (
                  <Grid item xs={12} sm={6} md={12} key={song.id}>
                    <Card
                      className={featured && featured.id === song.id ? "active" : ""}
                      sx={{ display: "flex", alignItems: "center", bgcolor: "#181818", cursor: "pointer", border: featured && featured.id === song.id ? "2px solid #ff0000" : "2px solid transparent" }}
                      onClick={() => setFeatured(song)}
                    >
                      <CardActionArea sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ width: 80, height: 80, overflow: "hidden", borderRadius: 2, mr: 2 }}>
                          <img src={thumbnailUrl} alt={`${song.title} thumbnail`} width="80" height="80" style={{ objectFit: "cover" }} />
                        </Box>
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="subtitle1" className="card-title" sx={{ color: "#fff", fontWeight: "bold" }}>
                            {song.title}
                          </Typography>
                          <Typography variant="body2" className="card-desc" sx={{ color: "#aaa" }}>
                            {song.artist}
                            <br />
                            {song.album} • {song.genre}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
