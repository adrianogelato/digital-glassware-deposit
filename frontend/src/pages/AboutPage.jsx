function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", lineHeight: "1.6" }}>
      <h2>About This Character Generator</h2>

      <div style={{ padding: "2rem", backgroundColor: "#f9f9f9", borderRadius: "8px", marginBottom: "2rem", border: "1px solid #ddd" }}>
        <h3>🎯 My Motivation</h3>
        <p>
          I created this character generator as a fun way to explore full-stack web development 
          while building something that could be useful for tabletop RPG players, game developers, 
          or anyone who needs quick character inspiration. 
        </p>
        <p>
          The project combines modern web technologies like React, Express.js, and PostgreSQL 
          to create a seamless experience for generating and storing unique characters. For full disclosure: The majority of the code was generated with the help of ChatGPT and Claude.
        </p>
      </div>

      <div style={{ padding: "1.5rem", backgroundColor: "#e8f5e8", borderRadius: "8px", border: "1px solid #4CAF50" }}>
        <h3>🔗 Project Repository</h3>
        <a
          href="https://github.com/adrianogelato/digital-glassware-deposit"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            backgroundColor: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          📂 View on GitHub
        </a>
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f8ff", borderRadius: "8px" }}>
        <h3>🛠️ Tech Stack</h3>
        <ul>
          <li><strong>Frontend:</strong> React + Vite, deployed on Vercel</li>
          <li><strong>Backend:</strong> Express.js + Node.js, deployed on Render</li>
          <li><strong>Database:</strong> PostgreSQL hosted on Supabase</li>
          <li><strong>Character Avatars:</strong> DiceBear API</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
