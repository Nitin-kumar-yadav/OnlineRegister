import lcaTejas from "../assets/LCATejas.png";
import alhDhruv from "../assets/ALHDhruv.png";
import lchPrachand from "../assets/LCHPrachand.png";

const platforms = [
    {
        image: lcaTejas,
        name: "LCA Tejas",
        role: "Multirole Light Combat Aircraft",
        specs: [
            { label: "MAX SPEED", value: "Mach 1.8" },
            { label: "CEILING", value: "16,500 m" },
            { label: "COMBAT RADIUS", value: "500 km" },
        ],
    },
    {
        image: lchPrachand,
        name: "LCH Prachand",
        role: "High-Altitude Light Combat Helicopter",
        specs: [
            { label: "SERVICE ALT.", value: "5,000 m" },
            { label: "MAX SPEED", value: "268 km/h" },
            { label: "PAYLOAD", value: "700 kg" },
        ],
    },
    {
        image: alhDhruv,
        name: "ALH Dhruv",
        role: "Advanced Light Utility Helicopter",
        specs: [
            { label: "RANGE", value: "630 km" },
            { label: "MAX SPEED", value: "280 km/h" },
            { label: "CREW + TROOPS", value: "2 + 12" },
        ],
    },
];

const Fleet = () => {
    return (
        <section
            id="fleet"
            className="w-full py-20 px-6 md:px-16 lg:px-24"
            style={{ marginTop: "50px" }}
        >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-12">
                <h2
                    className="text-4xl md:text-5xl font-bold text-white leading-tight"
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    Operational Platforms
                </h2>
                <p
                    className="md:max-w-xs text-sm leading-relaxed text-left"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}
                >
                    Live capability profiles for indigenous combat and utility
                    platforms currently in series production.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: "10px" }}>
                {platforms.map((p) => (
                    <div
                        key={p.name}
                        className="flex flex-col rounded-xl overflow-hidden cursor-pointer"
                        style={{
                            background: "#161620",
                            border: "1px solid rgba(255,255,255,0.08)",
                            transition: "transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
                            position: "relative",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.borderColor = "#00D4FF";
                            e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,212,255,0.25), 0 0 40px rgba(0,212,255,0.12)";
                            const bar = e.currentTarget.querySelector(".accent-bar");
                            if (bar) bar.style.transform = "scaleX(1)";
                            const img = e.currentTarget.querySelector("img");
                            if (img) img.style.transform = "scale(1.07)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.boxShadow = "none";
                            const bar = e.currentTarget.querySelector(".accent-bar");
                            if (bar) bar.style.transform = "scaleX(0)";
                            const img = e.currentTarget.querySelector("img");
                            if (img) img.style.transform = "scale(1)";
                        }}
                    >
                        <div
                            className="accent-bar absolute top-0 left-0 right-0 z-20"
                            style={{
                                height: "2px",
                                background: "linear-gradient(90deg, transparent, #00D4FF, transparent)",
                                transform: "scaleX(0)",
                                transition: "transform 0.4s ease",
                                transformOrigin: "center",
                            }}
                        />
                        <div className="relative h-52 overflow-hidden">
                            <img
                                src={p.image}
                                alt={p.name}
                                className="w-full h-full object-cover"
                                style={{ transition: "transform 0.5s ease" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
                            <span
                                className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] uppercase w-30 h-7 text-center flex items-center justify-center"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.35)",
                                    color: "rgba(255,255,255,0.75)",
                                    fontFamily: "var(--font-inter)",
                                    background: "rgba(0,0,0,0.35)",
                                    backdropFilter: "blur(4px)",
                                    borderRadius: "3px",
                                }}
                            >
                                Indigenous
                            </span>
                        </div>

                        <div className="flex flex-col flex-1 p-5 justify-evenly gap-2 w-full">

                            <h3
                                className="text-xl font-bold text-white mb-1"
                                style={{ fontFamily: "var(--font-inter)" }}
                            >
                                {p.name}
                            </h3>
                            <p
                                className="text-sm mb-5 "
                                style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}
                            >
                                {p.role}
                            </p>
                            <div
                                className="w-full mb-5"
                                style={{ height: "1px", background: "rgba(255,255,255,0.07)" }}
                            />


                            <div className="flex flex-col gap-3 ">
                                {p.specs.map((s) => (
                                    <div
                                        key={s.label}
                                        className="flex items-center justify-between"
                                        style={{ paddingLeft: "10px" }}
                                    >
                                        <span
                                            className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                                            style={{
                                                color: "rgba(255,255,255,0.35)",
                                                fontFamily: "var(--font-inter)",
                                            }}
                                        >
                                            {s.label}
                                        </span>
                                        <span
                                            className="text-sm font-semibold tabular-nums"
                                            style={{
                                                color: "#00D4FF",
                                                fontFamily: "var(--font-inter)",
                                            }}
                                        >
                                            {s.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Fleet;


