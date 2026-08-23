import { Link, useLocation } from "react-router-dom";


const Navbar = () => {

  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[78%] h-14 flex flex-row justify-between items-center px-6 rounded-full backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
      style={{
        backgroundColor: "var(--bg-surface)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--border-color)",
        padding: "2rem",
      }}
    >
      <ul
        className="flex flex-row items-center gap-8 font-medium"
        style={{ color: "var(--text-secondary)" }}
      >
        <li>
          <Link
            to="/"
            className="transition-all"
            style={{ "--hover-color": "var(--text-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
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
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-inter)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
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
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-inter)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
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

      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="px-5 py-2 font-medium transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-secondary)")
          }
        >
          Dashboard
        </Link>
        <Link
          to="/createregister"
          className="px-6 py-2 rounded-full font-medium transition-all uppercase"
          style={{
            backgroundColor: "var(--bg-surface)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
            height: "35px",
            width: "200px",
            textAlign: "center",
            paddingTop: "5px",
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
          Create Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;