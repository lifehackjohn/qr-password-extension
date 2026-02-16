# PRD — QR Password Extension

## Document Info
- **Version**: 1.0
- **Date**: 2026-02-09
- **Author**: Johannes Riedl
- **Status**: Draft

---

## 1. Overview

### 1.1 Problem Statement
Password managers that store credentials on network-connected devices or in the cloud are vulnerable to:
- Remote breaches and data leaks
- Malware and keyloggers
- Supply chain attacks on browser extensions
- Man-in-the-middle attacks

### 1.2 Solution
A Chrome extension that receives credentials via optical QR code scanning from an air-gapped device. The air gap provides physical isolation, making remote attacks impossible.

### 1.3 Target Users
- Security-conscious professionals
- Cryptocurrency users familiar with air-gapped wallets
- Enterprise users with high-security requirements
- Privacy advocates

---

## 2. User Stories

### 2.1 Primary Flow
```
AS A user with credentials stored on an air-gapped device
I WANT TO scan a QR code to fill login forms
SO THAT my passwords never touch a networked device
```

### 2.2 Detailed Stories

| ID | Story | Priority |
|----|-------|----------|
| US-01 | As a user, I can click the extension icon to start scanning | P0 |
| US-02 | As a user, I can see a camera preview while scanning | P0 |
| US-03 | As a user, credentials auto-fill after successful scan | P0 |
| US-04 | As a user, I can manually select which fields to fill | P1 |
| US-05 | As a user, I receive feedback when scan succeeds/fails | P0 |
| US-06 | As a user, I can cancel scanning mid-process | P1 |
| US-07 | As a user, I can copy credentials to clipboard instead of autofill | P2 |

---

## 3. Functional Requirements

### 3.1 QR Code Scanning

| ID | Requirement | Details |
|----|-------------|---------|
| FR-01 | Camera Access | Request webcam permission, show preview |
| FR-02 | QR Decoding | Decode QR codes in real-time (target: <500ms) |
| FR-03 | Format Support | Support standard QR codes up to Version 40 |
| FR-04 | Error Handling | Display clear error if QR unreadable |

### 3.2 Form Detection

| ID | Requirement | Details |
|----|-------------|---------|
| FR-05 | Auto-detect | Find username/email and password fields automatically |
| FR-06 | Heuristics | Use field names, types, labels, aria attributes |
| FR-07 | Fallback | Allow manual field selection if auto-detect fails |
| FR-08 | Multi-field | Support forms with multiple password fields (signup) |

### 3.3 Autofill

| ID | Requirement | Details |
|----|-------------|---------|
| FR-09 | Fill Fields | Insert credentials into detected form fields |
| FR-10 | Trigger Events | Dispatch input/change events for JS validation |
| FR-11 | No Submit | Never auto-submit forms (user must click) |
| FR-12 | Clear After | Option to clear filled data on tab close |

### 3.4 QR Code Data Format

```json
{
  "v": 1,
  "u": "username_or_email",
  "p": "password",
  "d": "example.com",
  "t": 1707500000
}
```

| Field | Type | Description |
|-------|------|-------------|
| `v` | int | Format version |
| `u` | string | Username or email |
| `p` | string | Password |
| `d` | string | Domain (optional, for verification) |
| `t` | int | Timestamp (optional, for expiry) |

### 3.5 Security Requirements

| ID | Requirement | Details |
|----|-------------|---------|
| SR-01 | No Storage | Never persist credentials to disk/storage |
| SR-02 | Memory Clear | Clear credentials from memory after fill |
| SR-03 | Domain Match | Warn if QR domain doesn't match current page |
| SR-04 | HTTPS Only | Only fill on HTTPS pages (warn on HTTP) |
| SR-05 | CSP Compliant | Work within Content Security Policy |

---

## 4. Non-Functional Requirements

### 4.1 Performance
- QR scan to fill: < 2 seconds
- Camera init: < 1 second
- Extension popup load: < 200ms

### 4.2 Compatibility
- Chrome 88+ (Manifest V3)
- Windows, macOS, Linux
- Works with standard webcams

### 4.3 Privacy
- No analytics or telemetry
- No network requests (except Chrome APIs)
- Open source for auditability

---

## 5. UI/UX Design

### 5.1 Extension Popup

```
┌────────────────────────────┐
│  🔐 QR Password Fill       │
├────────────────────────────┤
│                            │
│    ┌──────────────────┐    │
│    │                  │    │
│    │   Camera Feed    │    │
│    │                  │    │
│    │    [scanning]    │    │
│    └──────────────────┘    │
│                            │
│  Point camera at QR code   │
│                            │
│  [ Cancel ]                │
└────────────────────────────┘
```

### 5.2 States

1. **Idle**: "Click to scan QR code"
2. **Scanning**: Camera preview + scanning indicator
3. **Success**: Checkmark + "Credentials filled"
4. **Error**: Error message + retry button
5. **No Camera**: Instructions to enable camera

### 5.3 Notifications
- Success toast: "✓ Credentials filled"
- Domain mismatch warning
- HTTP warning (insecure page)

---

## 6. Technical Architecture

### 6.1 Components

```
extension/
├── manifest.json        # Manifest V3 config
├── popup/
│   ├── popup.html       # Extension popup UI
│   ├── popup.css        # Styles
│   └── popup.js         # Camera + QR scanning logic
├── content/
│   └── content.js       # Form detection + fill logic
├── background/
│   └── service-worker.js # Message passing
└── lib/
    └── jsQR.min.js      # QR decoding library
```

### 6.2 Libraries
- **jsQR**: Pure JavaScript QR code decoder
- No other external dependencies

### 6.3 Permissions Required
```json
{
  "permissions": ["activeTab"],
  "host_permissions": ["<all_urls>"]
}
```

---

## 7. Air-Gapped Device (Companion App)

### 7.1 Scope
The companion app for the air-gapped device is **out of scope** for this Chrome extension project. Users can use:
- A simple HTML page that generates QR codes
- A mobile app (future development)
- Any QR generator with the correct JSON format

### 7.2 Reference Implementation
A basic HTML-based QR generator will be provided for testing:
- Runs offline (no server needed)
- Generates QR from manual credential input
- Can be saved to air-gapped device

---

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Scan success rate | > 95% |
| Time to fill | < 3 seconds |
| Form detection accuracy | > 90% |
| User satisfaction | > 4.5/5 |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Camera permission denied | Blocks core feature | Clear instructions, fallback to clipboard |
| QR too small/blurry | Scan fails | Show quality guidance, zoom indicator |
| Form detection fails | Can't autofill | Manual field selection mode |
| Site blocks extension | Can't inject content | Fallback to clipboard copy |

---

## 10. Milestones

| Phase | Deliverable | Target |
|-------|-------------|--------|
| **v0.1** | Basic QR scan + manual fill | Week 1 |
| **v0.2** | Auto form detection | Week 2 |
| **v0.3** | Polish + error handling | Week 3 |
| **v1.0** | Public release | Week 4 |

---

## 11. Open Questions

1. Should we support encrypted QR codes (AES)? Would require shared key setup.
2. Support for TOTP/2FA codes in same QR?
3. Should extension work in incognito mode?
4. Support for multiple credentials per QR (for sites with extra fields)?

---

## 12. References

### Similar Projects (Conceptual)
- **KeePassXC-Browser**: Form detection patterns
- **Bitwarden**: Field matching heuristics  
- **Air-gapped crypto wallets**: QR-based signing flow
- **QR code login** (WeChat, WhatsApp Web): Optical credential transfer

### Libraries
- jsQR: https://github.com/cozmo/jsQR
- Chrome Extension Docs: https://developer.chrome.com/docs/extensions/mv3/

---

*Document End*
