/* =====================================================
   lanyard.js  —  Discord Rich Presence via Lanyard
   ===================================================== */

const LANYARD = (() => {
  const STATUS_COLOR = { online: "#57f287", idle: "#fee75c", dnd: "#ed4245", offline: "#747f8d" };
  const STATUS_LABEL = { online: "çevrimiçi", idle: "boşta", dnd: "rahatsız etme", offline: "çevrimdışı" };

  let ws = null;
  let heartbeatTimer = null;

  /* DOM referansları */
  const $ = (id) => document.getElementById(id);

  function applyStatus(status, activity) {
    const color = STATUS_COLOR[status] || STATUS_COLOR.offline;
    const label = STATUS_LABEL[status] || status;

    $("status-dot").style.background = color;
    $("avatar-dot").style.background = color;
    $("status-text").textContent = label;

    const card = $("activity-card");

    if (activity) {
      card.classList.add("visible");

      if (activity.type === "spotify") {
        const sp = activity.data;
        $("activity-type").textContent  = "Spotify'da Dinliyor";
        $("activity-name").textContent  = sp.song   || "—";
        $("activity-detail").textContent = sp.artist || "—";
        const art = $("activity-art-wrap");
        art.innerHTML = sp.album_art_url
          ? `<img src="${sp.album_art_url}" alt="art">`
          : _musicIcon();
      } else {
        const g = activity.data;
        $("activity-type").textContent  = "Oynuyor";
        $("activity-name").textContent  = g.name    || "—";
        $("activity-detail").textContent = g.details || g.state || "—";

        const art = $("activity-art-wrap");
        if (g.assets?.large_image && g.application_id) {
          const key = g.assets.large_image;
          const src = key.startsWith("https")
            ? decodeURIComponent(key.split("https/")[1] || key)
            : `https://cdn.discordapp.com/app-assets/${g.application_id}/${key}.png`;
          art.innerHTML = `<img src="${src}" alt="art">`;
        } else {
          art.innerHTML = _gameIcon();
        }
      }
    } else {
      card.classList.remove("visible");
    }
  }

  function _parseData(d) {
    const status = d.discord_status || "offline";
    let activity = null;

    if (d.spotify) {
      activity = { type: "spotify", data: d.spotify };
    } else if (Array.isArray(d.activities) && d.activities.length) {
      const act = d.activities.find(a => a.type === 0 || a.type === 2);
      if (act) activity = { type: "game", data: act };
    }

    applyStatus(status, activity);
  }

  function _musicIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
    </svg>`;
  }

  function _gameIcon() {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/>
    </svg>`;
  }

  /* REST (ilk yükleme) */
  async function fetchRest(userId) {
    try {
      const res  = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
      const json = await res.json();
      if (json.success) _parseData(json.data);
    } catch (_) {
      applyStatus("offline", null);
    }
  }

  /* WebSocket (gerçek zamanlı) */
  function connectWS(userId) {
    ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen = () => {
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
    };

    ws.onmessage = (e) => {
      let msg;
      try { msg = JSON.parse(e.data); } catch (_) { return; }

      if (msg.op === 1) {                         // Hello → heartbeat
        heartbeatTimer = setInterval(
          () => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })),
          msg.d.heartbeat_interval
        );
      }

      if (msg.op === 0) _parseData(msg.d);        // Event (INIT_STATE veya PRESENCE_UPDATE)
    };

    ws.onerror  = () => {};
    ws.onclose  = () => {
      clearInterval(heartbeatTimer);
      setTimeout(() => connectWS(userId), 6000);  // Otomatik yeniden bağlan
    };
  }

  /* Public init */
  function init(userId) {
    if (!userId || userId === "DISCORD_ID_BURAYA") {
      applyStatus("offline", null);
      return;
    }
    fetchRest(userId);
    connectWS(userId);
  }

  return { init };
})();
