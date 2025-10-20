import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function About() {
  const teamMembers = [
    { name: "Jane Doe", role: "Frontend Developer", img: "https://img.freepik.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_662251-651.jpg" },
    { name: "John Smith", role: "Backend Developer", img: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740&q=80" },
    { name: "Emily Clark", role: "UI/UX Designer", img: "https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg?semt=ais_hybrid&w=740&q=80" },
  ];

  const features = [
    "Create new notes with titles and content",
    "Edit existing notes effortlessly",
    "Search and filter notes by title",
    "Delete notes you no longer need",
    "Responsive and clean UI for all devices"
  ];

  return (
    <div className="container mt-4" style={{ fontFamily: "Georgia, serif", maxWidth: "900px" }}>
      {/* Header Section */}
      <section className="text-center mb-5">
        <h1 className="mb-3" style={{ color: "#2c3e50", fontWeight: "600" }}>About MyNotes</h1>
        <p className="text-muted lead" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
          MyNotes is a simple and elegant note-taking application designed to help you capture your
          thoughts, ideas, and important information quickly and efficiently.
        </p>
      </section>

      {/* Content Sections */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Mission Section */}
          <section className="mb-4 p-4 rounded-3" style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}>
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <DotLottieReact
                  src="https://lottie.host/3dc4573e-33fe-4275-acb4-33a70a8db2b4/Nw7larcBZK.lottie"
                  loop
                  autoplay
                  style={{ width: 120, height: 120 }}
                />
              </div>
              <div className="col-md-9">
                <h4 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Our Mission</h4>
                <p className="mb-0" style={{ lineHeight: "1.6" }}>
                  We aim to provide a clean and distraction-free platform for users to organize their
                  thoughts, ideas, and daily notes in one place.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-4 p-4 rounded-3" style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef" }}>
            <h4 style={{ color: "#2c3e50", marginBottom: "1.5rem" }}>Features</h4>
            <div className="row">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6 mb-2">
                  <div className="d-flex align-items-center">
                    <span className="text-primary me-2">•</span>
                    <span style={{ lineHeight: "1.5" }}>{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Get Started Section */}
          <section className="mb-5 p-4 rounded-3 text-center" style={{ backgroundColor: "#e8f4fd", border: "1px solid #b6e0fe" }}>
            <h4 style={{ color: "#2c3e50", marginBottom: "1rem" }}>Ready to Get Started?</h4>
            <p className="mb-0" style={{ lineHeight: "1.6" }}>
              Click on the "Notes" tab or "Create New Note" button to start organizing your notes today!
            </p>
          </section>
        </div>
      </div>

      {/* Team Section */}
      <section className="text-center mt-5 pt-4" style={{ borderTop: "1px solid #e9ecef" }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "2rem" }}>Meet the Team</h3>
        <div className="row justify-content-center g-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div className="text-center p-3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mb-3"
                  style={{ 
                    width: "120px", 
                    height: "120px", 
                    objectFit: "cover",
                    border: "3px solid #f8f9fa",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                />
                <h6 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>{member.name}</h6>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;