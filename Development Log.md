# Development Log

## 2026-02-09 — Project Kickoff

### Created
- Project Overview
- PRD (Product Requirements Document)
- Complete Chrome extension v0.1

### Tech Stack
- Chrome Extension Manifest V3
- Vanilla JavaScript (no framework)
- jsQR library for QR decoding
- QRCode.js for QR generation

---

## Extension Files Created

```
extension/
├── manifest.json           ✅
├── popup/
│   ├── popup.html          ✅
│   ├── popup.css           ✅
│   └── popup.js            ✅
├── content/
│   └── content.js          ✅
├── background/
│   └── service-worker.js   ✅
├── lib/
│   └── jsQR.min.js         ✅
└── icons/
    ├── icon16.png          ✅
    ├── icon32.png          ✅
    ├── icon48.png          ✅
    └── icon128.png         ✅
```

### QR Generator (Air-Gapped Device)
`qr-generator/index.html` — Standalone HTML page that generates QR codes offline.

---

## Testing Instructions

### Install Extension
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top right toggle)
3. Click "Load unpacked"
4. Select the `/extension/` folder
5. Pin the extension to toolbar

### Test Flow
1. Open any login page (e.g., github.com/login)
2. Open `qr-generator/index.html` on air-gapped device
3. Enter credentials and generate QR
4. Click extension icon in Chrome
5. Click "Start Scanning"
6. Point camera at QR code
7. Credentials should auto-fill

---

## QR Format
```json
{
  "v": 1,
  "u": "username",
  "p": "password",
  "d": "example.com"
}
```

| Field | Required | Description |
|-------|----------|-------------|
| v | Yes | Version (always 1) |
| u | Yes | Username or email |
| p | Yes | Password |
| d | No | Domain for verification |

---

## Known Limitations (v0.1)

1. No encryption — QR contains plaintext credentials
2. Simple form detection — may not work on complex sites
3. No credential storage — one QR per login

---

## Next Steps

- [ ] Test on various login pages
- [ ] Add AES encryption option
- [ ] Improve form detection heuristics
- [ ] Add clipboard fallback
- [ ] Package for Chrome Web Store
