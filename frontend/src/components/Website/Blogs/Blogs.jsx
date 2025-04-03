import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Use react-slick for carousel/slider

// Sample fetch function (replace with real data source)
const fetchBlogsData = async () => {
  // Replace with actual API call
  return [
    { id: 1, title: "The Future of Technology", type: "Technology", date: "2024-11-20", content: "Detailed blog content about the future of technology." },
    { id: 2, title: "Healthcare Innovations", type: "Healthcare", date: "2024-11-22", content: "Detailed blog content about healthcare innovations." },
    { id: 3, title: "AI in Education", type: "Technology", date: "2024-11-23", content: "Detailed blog content about AI in education." },
    { id: 4, title: "Agriculture Advancements", type: "Agriculture", date: "2024-11-24", content: "Detailed blog content about agriculture advancements." },
    { id: 5, title: "Green Energy Solutions", type: "Environment", date: "2024-11-25", content: "Detailed blog content about green energy." },
  ];
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [filter, setFilter] = useState("All");

  // Fetch the blog data
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogsData();
      setBlogs(data);
    };
    fetchData();
  }, []);

  // Filter blogs by type
  const filteredBlogs = filter === "All" ? blogs : blogs.filter(blog => blog.type === filter);

  return (
    <div style={containerStyle}>
      {/* Latest Blogs Slider */}
      <div style={sliderContainerStyle}>
        <h2 style={{ color: "#fff", textAlign: "center" }}>Latest Blogs</h2>
        <Slider {...sliderSettings}>
          {blogs.slice(0, 3).map(blog => (
            <div key={blog.id} style={sliderItemStyle}>
              <h3 style={{ color: "#fff" }}>{blog.title}</h3>
              <p style={{ color: "#fff" }}>{blog.date}</p>
            </div>
          ))}
        </Slider>
      </div>

      {/* Blog Filters */}
      <div style={filtersStyle}>
        <button onClick={() => setFilter("All")} style={filterButtonStyle}>All</button>
        <button onClick={() => setFilter("Technology")} style={filterButtonStyle}>Technology</button>
        <button onClick={() => setFilter("Healthcare")} style={filterButtonStyle}>Healthcare</button>
        <button onClick={() => setFilter("Agriculture")} style={filterButtonStyle}>Agriculture</button>
        <button onClick={() => setFilter("Environment")} style={filterButtonStyle}>Environment</button>
      </div>

      {/* Blog List */}
      <div style={blogListStyle}>
        {filteredBlogs.map(blog => (
          <div
            key={blog.id}
            style={blogCardStyle}
            onClick={() => setSelectedBlog(blog)} // Set selected blog to view details
          >
            <h3>{blog.title}</h3>
            <p>{blog.date}</p>
            <p>{blog.content.substring(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Blog Details View */}
      {selectedBlog && (
        <div style={blogDetailStyle}>
          <h2>{selectedBlog.title}</h2>
          <p>{selectedBlog.date}</p>
          <p>{selectedBlog.content}</p>
          <button
            onClick={() => setSelectedBlog(null)} // Close blog details
            style={backButtonStyle}
          >
            Back to Blogs
          </button>
        </div>
      )}
    </div>
  );
};

// Slider settings for react-slick
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

// Styles
const containerStyle = {
  backgroundColor: "#333",
  padding: "20px",
  color: "#fff",
  minHeight: "100vh",
};

const sliderContainerStyle = {
  marginBottom: "30px",
};

const sliderItemStyle = {
  padding: "20px",
  backgroundColor: "#615EFD", // Card color
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const filtersStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const filterButtonStyle = {
  backgroundColor: "#615EFD",
  border: "none",
  padding: "10px 20px",
  margin: "0 10px",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

const blogListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const blogCardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
};

const blogDetailStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  color: "#333",
};

const backButtonStyle = {
  backgroundColor: "#615EFD",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Blogs;
