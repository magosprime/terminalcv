# Terminal CV Deployment Log

**Timestamp:** 2025-07-03 00:57:11


## Overview

This log details the setup of an interactive terminal-style resume hosted via Docker on a ZimaBoard running Linux. The stack includes:
- Static HTML/JS/CSS terminal interface (with xterm.js)
- Nginx in Alpine container
- Cloudflare tunnel (cloudflared)
- Hugo static site
- WordPress blog
- Command-driven terminal interface

---

## GitHub Setup

- Repo: `magosprime/terminalcv`
- SSH config verified and pushed with custom index.html, styles.css, scripts.js

---

## Docker & Nginx

- Deployed via Docker Compose
- Nginx Alpine container (`terminalcv`)
- Mounted HTML/JS/CSS content to `/usr/share/nginx/html`
- Port 80 internal only (proxied via cloudflared)

---

## Cloudflare Tunnel Config

```
hostname: cv.neuralvoidblade.com
service: http://terminalcv:80
```

DNS CNAME created via:
```bash
cloudflared tunnel route dns blackwall-tunnel cv.neuralvoidblade.com
```

---

## `scripts.js` Feature Set

Banner: ANSI-style ASCII banner from Shadow font
Commands:
- `help`: shows command list
- `about`: bio
- `skills`: sysadmin & ops stack
- `contact`: email/github
- `resume`: links to `cv.pdf`
- `blog`: links to WP container hostname
- `projects`: future page (TBD)
- `clear`: clears terminal
- `default`: command not found handler

---

## Next Steps

- Auto-deploy updates to GitHub
- Embed uptime stack stats dynamically
- Make blog/projects open in new tabs or with iframe
- Tweak CSS for mobile rendering
- Integrate with BladeRunners repo log

