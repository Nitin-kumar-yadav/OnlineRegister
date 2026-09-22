import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useFontSize } from "../context/FontSizeContext";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { theme, toggleTheme } = useTheme();
  const { fontSize, increase, decrease, reset, MIN_SIZE, MAX_SIZE } = useFontSize();

  // ── Navbar always uses its own dark palette, independent of page theme ──
  const NAV = {
    bg:          "rgba(15, 15, 20, 0.75)",
    border:      "rgba(255, 255, 255, 0.12)",
    borderHover: "rgba(255, 255, 255, 0.28)",
    surface:     "rgba(255, 255, 255, 0.06)",
    surfaceHov:  "rgba(255, 255, 255, 0.13)",
    textPrimary: "#f0f0f5",
    textSec:     "rgba(255, 255, 255, 0.65)",
    textMuted:   "rgba(255, 255, 255, 0.38)",
    glow:        "0 0 18px rgba(124, 106, 239, 0.32)",
  };

  const btnBase = {
    border: `1px solid ${NAV.border}`,
    backgroundColor: NAV.surface,
    color: NAV.textPrimary,
    cursor: "pointer",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.15s ease",
    fontFamily: "var(--font-inter)",
  };

  const hoverOn = (e) => {
    e.currentTarget.style.backgroundColor = NAV.surfaceHov;
    e.currentTarget.style.borderColor = NAV.borderHover;
    e.currentTarget.style.transform = "scale(1.08)";
  };
  const hoverOff = (e) => {
    e.currentTarget.style.backgroundColor = NAV.surface;
    e.currentTarget.style.borderColor = NAV.border;
    e.currentTarget.style.transform = "scale(1)";
  };


  return (
    <nav
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[78%] h-14 flex flex-row justify-between items-center px-6 rounded-full backdrop-blur-lg"
      style={{
        backgroundColor: NAV.bg,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: NAV.border,
        padding: "2rem",
        boxShadow: "0 4px 30px rgba(0,0,0,0.45)",
      }}
    >
      <ul
        className="flex flex-row items-center gap-8 font-medium"
        style={{ color: NAV.textSec }}
      >
        <li>
          <Link
            to="/"
            className="transition-all"
            style={{ color: NAV.textSec }}
            onMouseEnter={(e) => (e.currentTarget.style.color = NAV.textPrimary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = NAV.textSec)}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Command Home
          </Link>
        </li>
        {isHome && (
          <>
            <li>
              <button
                className="transition-all font-medium cursor-pointer bg-transparent border-none"
                style={{ color: NAV.textSec, fontFamily: "var(--font-inter)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = NAV.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = NAV.textSec)}
                onClick={() =>
                  document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Fleet
              </button>
            </li>
            <li>
              <button
                className="transition-all font-medium cursor-pointer bg-transparent border-none"
                style={{ color: NAV.textSec, fontFamily: "var(--font-inter)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = NAV.textPrimary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = NAV.textSec)}
                onClick={() =>
                  document.getElementById("imperatives")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Imperatives
              </button>
            </li>
          </>
        )}
      </ul>

      <div className="flex items-center gap-3">
        {/* Font Size Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            border: `1px solid ${NAV.border}`,
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: NAV.surface,
          }}
        >
          {/* Decrease button */}
          <button
            id="font-size-decrease-btn"
            onClick={decrease}
            disabled={fontSize <= MIN_SIZE}
            title="Decrease font size"
            aria-label="Decrease font size"
            style={{
              ...btnBase,
              width: "30px",
              height: "30px",
              border: "none",
              borderRadius: "0",
              fontSize: "15px",
              fontWeight: "700",
              opacity: fontSize <= MIN_SIZE ? 0.35 : 1,
              cursor: fontSize <= MIN_SIZE ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => fontSize > MIN_SIZE && hoverOn(e)}
            onMouseLeave={(e) => hoverOff(e)}
          >
            A−
          </button>

          {/* Size display — click to reset */}
          <button
            id="font-size-reset-btn"
            onClick={reset}
            title="Reset to default (16px)"
            aria-label="Reset font size"
            style={{
              ...btnBase,
              height: "30px",
              padding: "0 8px",
              border: "none",
              borderLeft: `1px solid ${NAV.border}`,
              borderRight: `1px solid ${NAV.border}`,
              borderRadius: "0",
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.03em",
              color: NAV.textMuted,
              minWidth: "34px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = NAV.surfaceHov;
              e.currentTarget.style.color = NAV.textPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = NAV.surface;
              e.currentTarget.style.color = NAV.textMuted;
            }}
          >
            {fontSize}px
          </button>

          {/* Increase button */}
          <button
            id="font-size-increase-btn"
            onClick={increase}
            disabled={fontSize >= MAX_SIZE}
            title="Increase font size"
            aria-label="Increase font size"
            style={{
              ...btnBase,
              width: "30px",
              height: "30px",
              border: "none",
              borderRadius: "0",
              fontSize: "13px",
              fontWeight: "700",
              opacity: fontSize >= MAX_SIZE ? 0.35 : 1,
              cursor: fontSize >= MAX_SIZE ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => fontSize < MAX_SIZE && hoverOn(e)}
            onMouseLeave={(e) => hoverOff(e)}
          >
            A+
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            border: `1px solid ${NAV.border}`,
            backgroundColor: NAV.surface,
            color: NAV.textPrimary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = NAV.surfaceHov;
            e.currentTarget.style.borderColor = NAV.borderHover;
            e.currentTarget.style.boxShadow = NAV.glow;
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = NAV.surface;
            e.currentTarget.style.borderColor = NAV.border;
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {theme === "dark" ? (
            /* Sun icon for dark mode (click to go light) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "transform 0.4s ease", transform: "rotate(0deg)" }}
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          ) : (
            /* Moon icon for light mode (click to go dark) */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "transform 0.4s ease" }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <Link
          to="/dashboard"
          className="px-5 py-2 font-medium transition-colors"
          style={{ color: NAV.textSec }}
          onMouseEnter={(e) => (e.currentTarget.style.color = NAV.textPrimary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = NAV.textSec)}
        >
          Dashboard
        </Link>
        <Link
          to="/createregister"
          className="px-6 py-2 rounded-full font-medium transition-all uppercase"
          style={{
            backgroundColor: NAV.surface,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: NAV.border,
            color: NAV.textPrimary,
            height: "35px",
            width: "200px",
            textAlign: "center",
            paddingTop: "5px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = NAV.surfaceHov;
            e.currentTarget.style.boxShadow = NAV.glow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = NAV.surface;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Create Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;