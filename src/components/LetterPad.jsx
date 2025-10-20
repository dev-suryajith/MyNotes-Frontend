import React, { useState, useEffect, useRef } from "react";
import { addNoteApi, updateNoteApi } from "../services/allAPI";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrash, FaArrowLeft, FaStar, FaCalendarAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';


const LetterPad = ({ editData }) => {
  const navigate = useNavigate();
  const [notepadData, setNotepadData] = useState({
    id: "",
    title: "",
    data: "",
    importance: "Medium",
    createdAt: ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const titleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (editData) {
      setNotepadData(editData);
      setCharCount(editData.data.length);
      titleRef.current?.focus();
    } else {
      setNotepadData((oldData) => ({
        ...oldData,
        createdAt: new Date().toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }));
    }
  }, [editData]);

  useEffect(() => {
    setCharCount(notepadData.data.length);
  }, [notepadData.data]);

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

  const handleSave = async () => {
    if (!notepadData.title.trim() && !notepadData.data.trim()) {
      showToast("Please add a title or content before saving!", "warning");
      return;
    }

    setIsSaving(true);
    try {
      let res;
      if (editData && editData.id) {
        res = await updateNoteApi(editData.id, {
          ...notepadData,
          updatedAt: new Date().toLocaleString()
        });
        showToast("Note updated successfully! 🎉", "success");
      } else {
        res = await addNoteApi({
          ...notepadData,
          createdAt: new Date().toLocaleString()
        });
        showToast("Note created successfully! ✨", "success");
      }
      
      console.log("Saved Note:", res);
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate("/notes");
      }, 1500);
      
    } catch (error) {
      console.error("Error saving note:", error);
      showToast("Failed to save note. Please try again.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (notepadData.title.trim() || notepadData.data.trim()) {
      showToast(
        <div>
          <div className="fw-bold">Clear Note?</div>
          <div className="small">All unsaved changes will be lost</div>
        </div>,
        "warning"
      );
      
      // Use setTimeout to allow the toast to show first
      setTimeout(() => {
        if (window.confirm("Are you sure you want to clear this note? All unsaved changes will be lost.")) {
          setNotepadData({
            id: "",
            title: "",
            data: "",
            importance: "Medium",
            createdAt: new Date().toLocaleString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          });
          setCharCount(0);
          titleRef.current?.focus();
          showToast("Note cleared successfully", "info");
        }
      }, 100);
    } else {
      showToast("Nothing to clear!", "info");
    }
  };

  const handleBack = () => {
    if (notepadData.title.trim() || notepadData.data.trim()) {
      showToast(
        <div>
          <div className="fw-bold">Unsaved Changes</div>
          <div className="small">You have unsaved changes that will be lost</div>
        </div>,
        "warning"
      );
    }
    navigate("/notes");
  };

  const getImportanceColor = (importance) => {
    switch (importance) {
      case "High": return "#dc3545";
      case "Medium": return "#fd7e14";
      case "Low": return "#198754";
      default: return "#6c757d";
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
        style={{ marginTop: "60px" }} // Add some top margin to avoid header overlap
      />

      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex align-items-center gap-3 mb-3">
            <button 
              className="btn btn-outline-secondary btn-sm"
              onClick={handleBack}
              style={{ borderRadius: "8px" }}
            >
              <FaArrowLeft className="me-1" />
              Back to Notes
            </button>
            <h4 className="mb-0 fw-bold" style={{ 
              fontFamily: "Georgia, serif",
              color: "#2c3e50"
            }}>
              {editData?.id ? "Edit Note" : "Create New Note"}
            </h4>
          </div>
        </div>
      </div>

      {/* Note Editor */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div 
            className="card border-0 shadow-sm"
            style={{ 
              borderRadius: "12px",
              background: "linear-gradient(135deg, #fdfbfb 0%, #f5f5f5 100%)"
            }}
          >
            <div className="card-body p-4">
              {/* Title Input */}
              <div className="mb-4">
                <input
                  ref={titleRef}
                  type="text"
                  value={notepadData.title}
                  onChange={(e) =>
                    setNotepadData({ ...notepadData, title: e.target.value })
                  }
                  placeholder="Note Title..."
                  className="form-control border-0 fs-3 fw-bold"
                  style={{
                    background: "transparent",
                    fontFamily: "Georgia, serif",
                    color: "#2c3e50",
                    padding: "0.5rem 0",
                    borderBottom: "2px solid #e9ecef !important"
                  }}
                />
              </div>

              {/* Meta Information */}
              <div className="row align-items-center mb-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <FaStar className="text-warning" />
                      <label className="fw-semibold text-muted mb-0">Importance:</label>
                      <select
                        className="form-select form-select-sm border-0"
                        style={{ 
                          width: "120px",
                          background: "transparent",
                          fontWeight: "600",
                          color: getImportanceColor(notepadData.importance)
                        }}
                        value={notepadData.importance}
                        onChange={(e) =>
                          setNotepadData({ ...notepadData, importance: e.target.value })
                        }
                      >
                        <option value="Low" style={{ color: "#198754" }}>Low</option>
                        <option value="Medium" style={{ color: "#fd7e14" }}>Medium</option>
                        <option value="High" style={{ color: "#dc3545" }}>High</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-md-end">
                  {notepadData.createdAt && (
                    <div className="text-muted small d-flex align-items-center justify-content-md-end gap-2 mt-2 mt-md-0">
                      <FaCalendarAlt />
                      <span>Created: {notepadData.createdAt}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Textarea */}
              <div className="mb-4">
                <textarea
                  ref={contentRef}
                  value={notepadData.data}
                  onChange={(e) =>
                    setNotepadData({ ...notepadData, data: e.target.value })
                  }
                  placeholder="Start writing your thoughts here..."
                  className="form-control border-0"
                  style={{
                    minHeight: "400px",
                    backgroundImage: "repeating-linear-gradient(transparent, transparent 28px, #e9ecef 29px)",
                    lineHeight: "29px",
                    fontSize: "1.1rem",
                    fontFamily: "Georgia, serif",
                    resize: "vertical",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid #e9ecef !important"
                  }}
                />
              </div>

              {/* Footer Actions */}
              <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                <div className="text-muted small">
                  {charCount} characters • {notepadData.data.split(/\s+/).filter(word => word.length > 0).length} words
                </div>
                
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-danger d-flex align-items-center gap-2"
                    onClick={handleClear}
                    disabled={isSaving}
                    style={{ borderRadius: "8px" }}
                  >
                    <FaTrash />
                    Clear
                  </button>
                  <button 
                    className="btn btn-primary d-flex align-items-center gap-2 px-4"
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)",
                      border: "none",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (!isSaving) {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 6px 20px rgba(52, 152, 219, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSaving) {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  >
                    <FaSave />
                    {isSaving ? "Saving..." : (editData?.id ? "Update" : "Save")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterPad;