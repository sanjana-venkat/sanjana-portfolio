import { useState } from "react";
import {
  CONTENT,
  PILLS,
  PROJECT_FOR_PILL,
  PROJECTS,
} from "./data/portfolioData";

export default function App() {
  const [activePill, setActivePill] = useState(PILLS[0]);
  const [projectOpen, setProjectOpen] = useState(null);

  const handlePillClick = (pill) => {
    setActivePill(pill);

    const projectKey = PROJECT_FOR_PILL[pill];
    if (projectKey) {
      setProjectOpen(projectKey);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Sanjana Venkat</h1>

      {/* Pills */}
      <div style={styles.pillContainer}>
        {PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => handlePillClick(pill)}
            style={{
              ...styles.pill,
              background:
                activePill === pill ? "#000" : "transparent",
              color: activePill === pill ? "#fff" : "#000",
            }}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        <pre style={styles.text}>
          {CONTENT[activePill]}
        </pre>
      </div>

      {/* Modal */}
      {projectOpen && (
        <ProjectModal
          projectKey={projectOpen}
          onClose={() => setProjectOpen(null)}
        />
      )}
    </main>
  );
}

function ProjectModal({ projectKey, onClose }) {
  const project = PROJECTS[projectKey];

  if (!project) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{project.title}</h2>
        <p>{project.subtitle}</p>

        <ul>
          {project.metrics.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>

        <button onClick={onClose} style={styles.closeBtn}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: "40px",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  pillContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  pill: {
    padding: "10px 16px",
    borderRadius: "20px",
    border: "1px solid #000",
    cursor: "pointer",
  },
  content: {
    marginTop: "20px",
  },
  text: {
    whiteSpace: "pre-wrap",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "500px",
    width: "90%",
  },
  closeBtn: {
    marginTop: "20px",
    padding: "8px 12px",
  },
};
