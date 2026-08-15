import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-center px-8 py-4 rounded-2xl backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Main Tabs */}
      <ul
        className="flex flex-col md:flex-row gap-8 mb-6 md:mb-0 font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        <li>
          <a
            href="#"
            className="transition-all"
            style={{ "--hover-color": "var(--text-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Command Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="transition-all"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Fleet
          </a>
        </li>
        <li>
          <a
            href="#"
            className="transition-all"
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Imperatives
          </a>
        </li>
      </ul>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative w-14 h-8 rounded-full cursor-pointer border-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: isDark
              ? "rgba(124, 106, 239, 0.3)"
              : "rgba(0, 0, 0, 0.12)",
            boxShadow: isDark ? "var(--shadow-glow)" : "var(--shadow-sm)",
            focusVisibleRingColor: "var(--accent)",
          }}
        >
          {/* Track icons */}
          <span
            className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs select-none pointer-events-none"
            style={{ opacity: isDark ? 0.4 : 0 }}
          >
            🌙
          </span>
          <span
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs select-none pointer-events-none"
            style={{ opacity: isDark ? 0 : 0.5 }}
          >
            ☀️
          </span>

          {/* Thumb */}
          <span
            className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center text-sm shadow-md"
            style={{
              left: isDark ? "calc(100% - 1.75rem)" : "0.25rem",
              backgroundColor: isDark ? "var(--accent)" : "#fff",
              transition: "left 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isDark
                ? "0 0 10px var(--accent-glow)"
                : "0 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            {isDark ? "🌙" : "☀️"}
          </span>
        </button>

        <a
          href="#"
          className="px-5 py-2 font-medium transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        >
          Login
        </a>
        <a
          href="#"
          className="px-6 py-2 rounded-full font-medium transition-all"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor =
              "var(--bg-surface-hover)";
            e.currentTarget.style.boxShadow = "var(--shadow-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-surface)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Signup
        </a>
      </div>
    </nav>
  );
};

export default Navbar;