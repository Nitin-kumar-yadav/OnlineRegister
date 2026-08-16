import heroBg from "../assets/hero.png";

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden">

            <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    animation: "kenBurns 18s ease-in-out infinite alternate",
                    transformOrigin: "center center",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
                }}
            />

            <div className="absolute top-0 left-1/8 z-10 flex flex-col items-start justify-center min-h-screen px-8 ">

                <div
                    className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-lg w-[450px] h-[50px] justify-center"
                    style={{
                        background: "rgba(255,255,255,0.07)",
                        animation: "fadeInUp 0.6s ease both",
                    }}
                >
                    <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                    />
                    <span
                        className="text-md font-medium tracking-[0.25em] uppercase text-white/80"
                        style={{ fontFamily: "var(--font-inter)" }}
                    >
                        Hindustan Aeronautics Limited
                    </span>
                </div>
                <h1
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight max-w-3xl"
                    style={{
                        fontFamily: "var(--font-Inter)",
                        textShadow: "0 4px 32px rgba(0,0,0,0.6)",
                        animation: "fadeInUp 0.8s ease 0.15s both",
                    }}
                >
                    Leading the Skies
                    <br />
                    <span style={{ color: "var(--accent-hover)" }}>for 8 Decades</span>
                </h1>

                <p
                    className="mt-6 text-base md:text-lg text-white/65 max-w-xl leading-relaxed"
                    style={{
                        fontFamily: "var(--font-inter)",
                        animation: "fadeInUp 0.8s ease 0.3s both",
                    }}
                >
                    Design, manufacture and lifecycle support of combat aircraft, rotary platforms and aero-engines — engineered in India, deployed across every operational theatre.
                </p>
            </div>

            <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 0.5; }
          50%       { transform: translateX(-50%) translateY(8px); opacity: 0.8; }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1)    translateX(0%)   translateY(0%); }
          25%  { transform: scale(1.06) translateX(-1%)  translateY(-0.5%); }
          50%  { transform: scale(1.1)  translateX(1%)   translateY(-1%); }
          75%  { transform: scale(1.07) translateX(-0.5%) translateY(0.5%); }
          100% { transform: scale(1)    translateX(0%)   translateY(0%); }
        }
      `}</style>
        </section>
    );
};

export default Hero;
