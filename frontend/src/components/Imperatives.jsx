const imperativeCards = [
    {
        id: "IMP-01",
        stat: "75%",
        label: "INDIGENOUS CONTENT",
        desc: "Domestic sourcing target across combat platform programmes.",
    },
    {
        id: "IMP-02",
        stat: "8%",
        label: "R&D REINVESTMENT",
        desc: "Revenue committed to design bureaus and next-gen propulsion.",
    },
    {
        id: "IMP-03",
        stat: "1,000+",
        label: "MSME PARTNERS",
        desc: "Tier-2 and Tier-3 vendors integrated into the supply chain.",
    },
];

const Imperatives = () => {
    return (
        <section
            id="imperatives"
            className="relative overflow-hidden py-24 px-6 md:px-16 lg:px-24"
            style={{
                marginTop: "50px",
                width: "100%",
                overflow: "hidden",

            }}
        >
            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div className="max-w-xl">
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                            style={{ fontFamily: "var(--font-inter)" }}
                        >
                            Atmanirbhar Bharat —<br />Indigenization at Scale
                        </h2>
                    </div>

                    <p
                        className="md:max-w-xs text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)", marginBottom: "20px" }}
                    >
                        Self-reliance measured in hardware: airframes, avionics stacks, propulsion and MRO
                        capability developed and sustained on Indian soil.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginBottom: "20px" }}>
                    {imperativeCards.map((c) => (
                        <div
                            key={c.id}
                            className="relative flex flex-col p-6 rounded-xl overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                                padding: "15px",

                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.5), 0 0 30px rgba(0,212,255,0.08)";
                                e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                            }}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <span
                                    className="text-[10px] font-bold tracking-[0.2em] uppercase"
                                    style={{ color: "#00D4FF", fontFamily: "var(--font-inter)" }}
                                >
                                    {c.id}
                                </span>
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ background: "#00D4FF", boxShadow: "0 0 6px #00D4FF" }}
                                />
                            </div>
                            <span
                                className="text-5xl font-bold text-white mb-2 leading-none"
                                style={{ fontFamily: "var(--font-manufacturing)" }}
                            >
                                {c.stat}
                            </span>
                            <span
                                className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                                style={{ color: "#00D4FF", fontFamily: "var(--font-inter)" }}
                            >
                                {c.label}
                            </span>
                            <p
                                className="text-sm leading-relaxed flex-1"
                                style={{ color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}
                            >
                                {c.desc}
                            </p>

                            <div
                                className="absolute bottom-0 left-0 right-0"
                                style={{
                                    height: "1px",
                                    background: "linear-gradient(90deg, transparent, #00D4FF 50%, transparent)",
                                    opacity: 0.5,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default Imperatives;
