

const Home = () => {
  return (
    <div
      className="flex items-center justify-center min-h-[60vh]"
      style={{ color: "var(--text-primary)" }}
    >
      <main className="mt-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white/90 tracking-tight">
          Welcome to Command
        </h1>
        <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
          The background gradient shines through the blurred navigation bar above.
        </p>
      </main>
    </div>
  );
};

export default Home;