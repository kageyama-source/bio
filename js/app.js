/* =====================================================
   app.js  —  DOM Render + Bootstrap
   ===================================================== */

/* ── SVG İKON KÜTÜPHANESİ ── */
const ICONS = {
  github: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
    0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
    -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
    .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
    -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004
    1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
    .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
    0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484
    17.522 2 12 2z"/>
  </svg>`,

  discord: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864
    -.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037
    A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082
    0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994
    .076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0
    00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01
    c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0
    00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0
    006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/>
  </svg>`,

  tebex: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>`,

  mail: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>`,

  twitter: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401
    6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.632 5.906-5.632zm-1.161
    17.52h1.833L7.084 4.126H5.117z"/>
  </svg>`,

  instagram: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>`,

  link: `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>`,
};

/* ── PROFILE ── */
function renderProfile() {
  const p = CONFIG.profile;
  document.getElementById("profile-name").textContent = p.name || "username";
  document.getElementById("profile-bio").textContent  = p.bio  || "";
  const avatar = document.getElementById("avatar-img");
  if (p.avatar) avatar.src = p.avatar;
}

/* ── PROJECTS ── */
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = CONFIG.projects.map(proj => `
    <a class="project-card" href="${proj.url || '#'}" target="_blank" rel="noopener noreferrer">
      <div class="project-icon">${proj.icon || "◇"}</div>
      <div class="project-name">${proj.name || "Proje"}</div>
      <div class="project-desc">${proj.desc || ""}</div>
      <div class="project-tag">
        ${ICONS.link}
        ${proj.tag || "Link"}
      </div>
    </a>
  `).join("");
}

/* ── SOCIALS ── */
function renderSocials() {
  const wrap = document.getElementById("socials");
  wrap.innerHTML = CONFIG.socials.map(s => `
    <a class="social-link" href="${s.url || '#'}" target="_blank" rel="noopener noreferrer">
      ${ICONS[s.icon] || ICONS.link}
      ${s.label || s.icon}
    </a>
  `).join("");
}

/* ── SPOTIFY ── */
function initSpotify() {
  const iframe = document.getElementById("spotify-iframe");
  const trackId = CONFIG.spotify?.trackId || CONFIG.music?.spotifyTrackId;
  const player = document.getElementById("music-player");
  if (!iframe || !trackId) {
    if (player) player.hidden = true;
    return;
  }
  iframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded", () => {
  renderProfile();
  renderProjects();
  renderSocials();
  initSpotify();
});
