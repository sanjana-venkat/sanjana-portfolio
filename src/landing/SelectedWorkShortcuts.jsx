import { useState } from "react";
import { SELECTED_WORK } from "./landingData";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Three project labels pinned top-right. Always reachable, so nobody has to
 * click through the sequence to get to a case study. Hovering or focusing one
 * expands a thumbnail and a single line of description toward the LEFT, so the
 * expansion can never leave the viewport. On mobile the same three links
 * collapse behind a single "Selected work" control.
 */
export default function SelectedWorkShortcuts({ visible, onOpen }) {
  const isCompact = useMediaQuery("(max-width: 900px)");
  const [open, setOpen] = useState(false);
  const listHidden = isCompact && !open;

  return (
    <nav
      className={`pc-shortcuts${visible ? " is-on" : ""}`}
      aria-label="Selected work"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="pc-shortcuts-label">Selected work</p>

      <div className="pc-shortcuts-list" hidden={listHidden}>
        {SELECTED_WORK.map((project) => (
          <span className="pc-shortcut-slot" key={project.slug}>
            <a
              className="pc-shortcut"
              href={`#work=${project.slug}`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onOpen(project.slug);
              }}
            >
              {project.name}
            </a>
            <span className="pc-shortcut-peek" aria-hidden="true">
              <img
                src={project.image}
                alt=""
                loading="lazy"
                decoding="async"
                width="96"
                height="62"
              />
              <span>{project.line}</span>
            </span>
          </span>
        ))}
      </div>

      <button
        type="button"
        className="pc-shortcuts-toggle"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        Selected work {open ? "−" : "+"}
      </button>
    </nav>
  );
}
