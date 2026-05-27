# 🖤 Dark Noir Portfolio — GitHub Pages Rehberi

## 📁 Klasör Yapısı

```
portfolio/
├── index.html
├── css/style.css
├── js/
│   ├── config.js   ← ⭐ SADECE BURAYA DOKUN
│   ├── lanyard.js
│   └── app.js
└── assets/
    ├── img/
    │   ├── avatar.png   ← Profil fotoğrafın
    │   └── bg.jpg       ← Arka plan görseli
    └── audio/           ← (artık kullanılmıyor)
```

---

## 🚀 GitHub Pages Deploy

```bash
git init
git add .
git commit -m "portfolio"
git remote add origin https://github.com/KULLANICI/portfolio.git
git push -u origin main
```

Repo → **Settings → Pages → Branch: main → Save**
→ `https://KULLANICI.github.io/portfolio`

---

## ⚙️ Ayarlar (`js/config.js`)

### Profil
```js
profile: { name: "adin", bio: "developer", avatar: "assets/img/avatar.png" }
```

### Discord Lanyard
```js
discord: { userId: "123456789012345678" }
```
> Discord → Ayarlar → Gelişmiş → Geliştirici Modu → Profiline sağ tıkla → ID'yi Kopyala

### Spotify
```js
spotify: { trackId: "4PTG3Z6ehGkBFwjybzWkR8" }
```
> `open.spotify.com/track/` **BU_KISIM**

### Arka Plan
- **Fotoğraf:** `assets/img/bg.jpg` yerine istediğin görseli koy
- **Video:** `index.html` üstündeki VIDEO yorumunu aç, `<img>` satırını yorum yap

### Projeler
```js
{ icon: "◆", name: "Proje", desc: "Açıklama", tag: "GitHub", url: "https://..." }
```

### Sosyaller
```js
{ icon: "github", label: "GitHub", url: "https://github.com/..." }
```
İkon seçenekleri: `github` `discord` `tebex` `mail` `twitter` `instagram`

### Renk Teması (`css/style.css` üstü)
```css
--accent: #c8a96e;  /* altın ton */
--bg:     #080808;  /* arka plan */
```
