function AboutPage() {
  return (
    <div className="about-page">
      <h2 className="page-title">About This Character Generator</h2>
      
      <div className="about-section motivation-section">
        <h3 className="about-section-title">🎯 My Motivation</h3>
        <p className="about-text">
          I created this character generator as a fun way to explore full-stack web development
          while building something that could be useful for tabletop RPG players, game developers,
          or anyone who needs quick character inspiration.
        </p>
        <p className="about-text">
          The project combines modern web technologies like React, Express.js, and PostgreSQL
          to create a seamless experience for generating and storing unique characters. For full 
          disclosure: The majority of the code was generated with the help of ChatGPT and Claude.
        </p>
      </div>

      <div className="about-section github-section">
        <h3 className="about-section-title">🔗 Project Repository</h3>
        <a
          href="https://github.com/adrianogelato/digital-glassware-deposit"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          📂 View on GitHub
        </a>
      </div>

      <div className="about-section tech-stack-section">
        <h3 className="about-section-title">🛠️ Tech Stack</h3>
        <ul className="tech-list">
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