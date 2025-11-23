import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSort, FaFilter } from "react-icons/fa";
import { LuNotebookTabs } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { getAllNotesApi, deleteNoteApi } from "../services/allAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NoteList({ setEditData }) {
  const [allNotes, setAllNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [importanceFilter, setImportanceFilter] = useState("All");
  const [sortByDate, setSortByDate] = useState("Newest");
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  // Toast configuration
  const showToast = (message, type = "info") => {
    const toastConfig = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    switch (type) {
      case "success":
        toast.success(message, toastConfig);
        break;
      case "error":
        toast.error(message, toastConfig);
        break;
      case "warning":
        toast.warning(message, toastConfig);
        break;
      case "info":
        toast.info(message, toastConfig);
        break;
      default:
        toast(message, toastConfig);
    }
  };
  const loggedUser = JSON.parse(localStorage.getItem('NoteUser'))
  const loggedUserID = (loggedUser?.id)
  // console.log(loggedUserID)
  // Fetch all notes
  const getNotes = async () => {
    try {
      const res = await getAllNotesApi();
      const userNotes = res.data.filter(
        (note) => note.userID === loggedUserID
      );

      setAllNotes(userNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      showToast("Failed to load notes. Please try again.", "error");
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleMenuToggle = (index, e) => {
    e.stopPropagation();
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleEdit = (note) => {
    setEditData(note);
    navigate("/notepad");
    setOpenMenuIndex(null);
    showToast(`Editing "${note.title || 'Untitled Note'}"`, "info");
  };

  const handleDelete = async (id) => {
    const noteToDelete = allNotes.find(note => note.id === id);
    const noteTitle = noteToDelete?.title || 'Untitled Note';

    showToast(
      <div>
        <div className="fw-bold">Delete Note?</div>
        <div className="small">"{noteTitle}" will be permanently deleted</div>
      </div>,
      "warning"
    );
    setTimeout(() => {
      const userConfirmed = window.confirm(`Are you sure you want to delete "${noteTitle}"?`);
      if (userConfirmed) {
        performDelete(id, noteTitle);
      }
    }, 100);
  };

  const performDelete = async (id, noteTitle) => {
    setIsDeleting(true);
    try {
      const res = await deleteNoteApi(id);
      showToast(`"${noteTitle}" has been deleted`, "success");
      getNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      showToast("Failed to delete note. Please try again.", "error");
    } finally {
      setIsDeleting(false);
      setOpenMenuIndex(null);
    }
  };
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuIndex(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredNotes = allNotes
    .filter((note) =>
      note.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((note) =>
      importanceFilter === "All" ? true : note.importance === importanceFilter
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortByDate === "Newest" ? dateB - dateA : dateA - dateB;
    });

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "High": return "#dc3545";
      case "Medium": return "#fd7e14";
      case "Low": return "#198754";
      default: return "#6c757d";
    }
  };

  const handleCreateNote = () => {
  if (loggedUserID) {
    navigate("/notepad");
    showToast("Creating new note...", "info");
  } else {
    showToast("Please Login!", "info");
  }
};


const handleSearchClear = () => {
  if (searchTerm) {
    setSearchTerm("");
    showToast("Search cleared", "info");
  }
};

return (
  <div className="container py-4">
    {/* Toast Container */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{ marginTop: "60px" }}
    />

    {/* Header Section */}
    <div className="row justify-content-between align-items-center mb-4">
      <div className="col-md-6">
        <h2 className="fw-bold mb-0" style={{
          fontFamily: "Georgia, serif",
          color: "#2c3e50"
        }}>
          My Notes
        </h2>
        <p className="text-muted mb-0">Manage and organize your thoughts</p>
      </div>

    </div>

    {/* Search & Filters Section */}
    <div className="row mb-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm p-4">
          <div className="row g-3 align-items-end">
            {/* Search */}
            <div className="col-md-4">
              <label className="form-label fw-semibold text-muted small mb-2">
                <FaSearch className="me-1" />
                Search Notes
              </label>
              <div className="input-group">
                <input
                  className="form-control border-end-0"
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ borderRadius: "8px 0 0 8px" }}
                />
                {searchTerm && (
                  <button
                    className="input-group-text bg-white border-start-0 border-end-0"
                    onClick={handleSearchClear}
                    style={{ borderRadius: "0" }}
                    title="Clear search"
                  >
                    ×
                  </button>
                )}
                <span className="input-group-text bg-white border-start-0" style={{ borderRadius: "0 8px 8px 0" }}>
                  <FaSearch className="text-muted" />
                </span>
              </div>
            </div>

            {/* Importance Filter */}
            <div className="col-md-3">
              <label className="form-label fw-semibold text-muted small mb-2">
                <FaFilter className="me-1" />
                Importance
              </label>
              <select
                className="form-select"
                value={importanceFilter}
                onChange={(e) => setImportanceFilter(e.target.value)}
                style={{ borderRadius: "8px" }}
              >
                <option value="All">All Importance</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Sort by Date */}
            <div className="col-md-3">
              <label className="form-label fw-semibold text-muted small mb-2">
                <FaSort className="me-1" />
                Sort By
              </label>
              <select
                className="form-select"
                value={sortByDate}
                onChange={(e) => setSortByDate(e.target.value)}
                style={{ borderRadius: "8px" }}
              >
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="col-md-2">
              <div className="text-center p-2 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="fw-bold text-primary">{filteredNotes.length}</div>
                <div className="text-muted small">Notes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Notes Grid */}
    <div className="row g-4">
      {/* Add New Note Card */}
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div
          className="card border-2 border-dashed h-100 text-center p-4"
          style={{
            borderColor: "#dee2e6",
            cursor: "pointer",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
          }}
          onClick={handleCreateNote}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.borderColor = "#3498db";
            e.currentTarget.style.background = "linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#dee2e6";
            e.currentTarget.style.background = "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)";
          }}
        >
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <div className="rounded-circle d-flex align-items-center justify-content-center mb-3"
              style={{
                width: "60px",
                height: "60px",
                background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)"
              }}
            >
              <FaPlus className="text-white" size={20} />
            </div>
            <h6 className="card-title fw-semibold mb-2" style={{ color: "#2c3e50" }}>
              Add New Note
            </h6>
            <p className="text-muted small mb-0">
              Start writing your thoughts
            </p>
          </div>
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        filteredNotes.map((item, index) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div
              className="card h-100 position-relative border-0 shadow-sm"
              style={{
                borderRadius: "12px",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
              }}
              onClick={() => handleEdit(item)}
            >
              <div className="card-body p-3">
                {/* Menu Button */}
                <button
                  className="btn btn-sm position-absolute top-0 end-0 m-2 text-muted"
                  onClick={(e) => handleMenuToggle(index, e)}
                  disabled={isDeleting}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.9)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <HiDotsVertical />
                </button>

                {/* Dropdown Menu */}
                {openMenuIndex === index && (
                  <div
                    className="position-absolute bg-white shadow-lg rounded p-2"
                    style={{
                      top: "40px",
                      right: "10px",
                      zIndex: 10,
                      width: "120px",
                      borderRadius: "8px",
                      border: "1px solid #e9ecef",
                      animation: "fadeIn 0.2s ease-in"
                    }}
                  >
                    <button
                      className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      disabled={isDeleting}
                    >
                      <FaEdit className="text-primary" />
                      Edit
                    </button>
                    <button
                      className="btn btn-sm w-100 text-start d-flex align-items-center gap-2 py-2 text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
                      disabled={isDeleting}
                    >
                      <FaTrash />
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                )}

                {/* Note Icon */}
                <div className="text-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{
                      width: "50px",
                      height: "50px",
                      background: "linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)"
                    }}
                  >
                    <LuNotebookTabs className="text-dark" size={20} />
                  </div>
                </div>

                {/* Note Title */}
                <h6 className="card-title text-center fw-semibold mb-2" style={{
                  fontFamily: "Georgia, serif",
                  color: "#2c3e50",
                  lineHeight: "1.3"
                }}>
                  {item.title || "Untitled Note"}
                </h6>

                {/* Note Metadata */}
                <div className="mt-3">
                  <div className="text-muted small text-center mb-2">
                    🕒 {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-center">
                    <span
                      className="badge rounded-pill px-3 py-2"
                      style={{
                        backgroundColor: `${getImportanceColor(item.importance)}20`,
                        color: getImportanceColor(item.importance),
                        fontWeight: "600",
                        fontSize: "0.75rem"
                      }}
                    >
                      {item.importance || "Medium"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <div className="text-muted">
            <LuNotebookTabs size={64} className="mb-3 opacity-25" />
            <h4 className="fw-semibold">No Notes Found</h4>
            <p className="mb-4">
              {searchTerm || importanceFilter !== "All"
                ? "Try adjusting your search or filters"
                : "Create your first note to get started"
              }
            </p>
            <button
              className="btn btn-primary"
              onClick={handleCreateNote}
            >
              <FaPlus className="me-2" />
              Create Note
            </button>
          </div>
        </div>
      )}
    </div>

    <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
  </div>
);
}

export default NoteList;