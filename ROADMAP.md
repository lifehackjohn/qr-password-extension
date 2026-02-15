# QR Password Fill — Roadmap

## Track 1: Open Source (GitHub Public)

- [ ] Add MIT LICENSE
- [ ] Write proper README.md with badges, screenshots, install instructions
- [ ] Add CONTRIBUTING.md
- [ ] Add .github/ templates (issues, PRs)
- [ ] Clean up internal docs (remove Obsidian-specific files from public)
- [ ] Add SECURITY.md (responsible disclosure)
- [ ] Flip repo from private → public

## Track 2: Chrome Web Store

- [ ] **Blocker:** Chrome Developer account ($5 one-time fee)
- [ ] Finalize store listing (screenshots, description — already drafted)
- [ ] Submit for review
- [ ] Set up update pipeline

## Track 3: OpenClaw Skill — Air-Gapped Credential Bridge

### Concept
Bidirectional air-gapped credential transfer using QR codes as the optical channel. No secret ever touches a network.

### Mode A: Skill → QR → Air-Gapped Device (Outbound)
**Scenario:** You're on an air-gapped device and need a credential.
1. You ask Jarvis (via any channel) for a credential
2. Jarvis retrieves it from KeePassXC vault
3. Jarvis generates a QR code (using the standard QR format)
4. QR is displayed on canvas, screen, or sent as image
5. Air-gapped device scans QR with its camera
6. Credential is available on the air-gapped device — never touched the network

### Mode B: Air-Gapped Device → QR → Skill (Inbound)
**Scenario:** You have credentials on your air-gapped phone, need them on the outside.
1. Air-gapped phone displays QR code (via the QR Generator HTML page or any QR app)
2. You hold the phone up to a camera Jarvis can see (node camera, webcam)
3. Jarvis reads the QR via node `camera_snap`
4. Jarvis decodes the credential from the QR
5. Jarvis fills it in, copies it, or delivers it via secure channel
6. Secret existed only in optical form during transit

### QR Format (v1 — plaintext)
```json
{
  "v": 1,
  "u": "username",
  "p": "password",
  "d": "example.com"
}
```

### QR Format (v2 — encrypted, future)
```json
{
  "v": 2,
  "e": "<AES-256-GCM encrypted payload>",
  "n": "<nonce>",
  "h": "<HMAC>"
}
```
Shared key pre-exchanged during initial pairing. Prevents shoulder-surfing.

### Skill Components
```
qr-password-skill/
├── SKILL.md              # Skill instructions for the agent
├── scripts/
│   ├── generate-qr.py    # Generate QR from credential (Mode A)
│   ├── read-qr.py        # Decode QR from image (Mode B)
│   └── qr-format.py      # Shared QR encode/decode library
├── assets/
│   └── qr-generator.html # Standalone offline QR generator (for air-gapped device)
└── README.md
```

### Security Considerations
- QR content is ephemeral — displayed briefly, then gone
- No credential is stored in chat history or logs
- Agent should redact any decoded credentials from conversation
- v2 encryption prevents camera-based shoulder surfing
- Canvas display auto-clears after configurable timeout

## Priority
1. Open source prep (quick wins, visibility)
2. Chrome Web Store (waiting on $5 account)
3. OpenClaw skill (most impactful, build after 1 & 2)

---
*Last updated: 2026-02-15*
