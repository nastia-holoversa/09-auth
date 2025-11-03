export default function NotFound() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
        404 – Page Not Found
      </h1>
      <p style={{ fontSize: "1rem", opacity: 0.8 }}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}

