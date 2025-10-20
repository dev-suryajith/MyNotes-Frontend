import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaStickyNote, FaSearch, FaEdit } from "react-icons/fa";

const Home = ({ setEditData, setGoToNotePad }) => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaPlus className="text-primary" size={24} />,
      title: "Create Notes",
      description: "Quickly create new notes with rich text formatting"
    },
    {
      icon: <FaEdit className="text-success" size={24} />,
      title: "Edit Easily",
      description: "Update and modify your notes anytime"
    },
    {
      icon: <FaSearch className="text-info" size={24} />,
      title: "Search & Find",
      description: "Instantly find notes with powerful search"
    }
  ];

  const gotoNotepad = () => {
    // setEditData({
    //   title: "",
    //   data: ""
    // })
    setGoToNotePad(true)
    navigate("/notepad")
  }

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <div className="mb-4">
              <FaStickyNote
                size={64}
                className="text-primary mb-3"
                style={{ opacity: 0.9 }}
              />
            </div>
            <h1
              className="display-4 fw-bold mb-4"
              style={{
                fontFamily: "Georgia, serif",
                color: "#2c3e50",
                background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Welcome to MyNotes
            </h1>
            <p className="lead text-muted mb-4 fs-5">
              Capture your thoughts, organize your ideas, and boost your productivity with our intuitive note-taking platform.
            </p>

            {/* CTA Button */}
            <button
              className="btn btn-primary btn-lg px-4 py-2 fw-semibold"
              onClick={gotoNotepad}
              style={{
                background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
                border: "none",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.3)";
              }}
            >
              <FaPlus className="me-2" />
              Create New Note
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="row justify-content-center mt-5 pt-4">
          <div className="col-lg-10">
            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-4">
                  <div
                    className="card h-100 border-0 text-center p-4"
                    style={{
                      background: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="card-body">
                      <div className="mb-3">
                        {feature.icon}
                      </div>
                      <h5 className="card-title fw-semibold mb-3" style={{ color: "#2c3e50" }}>
                        {feature.title}
                      </h5>
                      <p className="card-text text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row justify-content-center mt-5 pt-5">
          <div className="col-lg-8">
            <div className="row text-center g-4">
              <div className="col-md-4">
                <div className="p-3">
                  <h3 className="fw-bold text-primary mb-2">1000+</h3>
                  <p className="text-muted mb-0">Active Users</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3">
                  <h3 className="fw-bold text-success mb-2">5000+</h3>
                  <p className="text-muted mb-0">Notes Created</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3">
                  <h3 className="fw-bold text-info mb-2">99%</h3>
                  <p className="text-muted mb-0">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;