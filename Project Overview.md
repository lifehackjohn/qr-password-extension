# QR Password Extension

## Project Summary

A Chrome browser extension that enables secure password autofill by scanning QR codes displayed on an air-gapped device. Credentials never touch the network — they're transmitted optically via camera.

## The Problem

Traditional password managers store credentials in the cloud or on the same device that accesses websites. This creates attack vectors:
- Cloud breaches (LastPass 2022, etc.)
- Malware on the device can intercept passwords
- Browser extensions can be compromised

## The Solution

**Air-gapped credential storage** — passwords live on a separate device (phone or computer) that is never connected to the internet. When you need to log in:

1. Click the extension icon on a login page
2. The air-gapped device displays a QR code containing encrypted credentials
3. Your computer's camera scans the QR code
4. Credentials are filled into the form

The air gap ensures that even if your main computer is compromised, your password vault remains secure.

## Key Features

- **QR Code Scanning**: Uses device webcam to read credentials
- **Auto-detect Login Forms**: Identifies username/password fields automatically
- **One-click Fill**: Scans and fills in one smooth action
- **Air-gap Security**: Credentials exist only on offline device
- **No Cloud**: Zero network transmission of passwords

## Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│   Air-Gapped Device │         │   Main Computer     │
│   (Phone/Laptop)    │         │   (Chrome Browser)  │
│                     │         │                     │
│  ┌───────────────┐  │  QR     │  ┌───────────────┐  │
│  │ Password Vault│  │ ─────►  │  │   Extension   │  │
│  │   (Encrypted) │  │ optical │  │   + Webcam    │  │
│  └───────────────┘  │         │  └───────────────┘  │
│         │           │         │         │           │
│         ▼           │         │         ▼           │
│  ┌───────────────┐  │         │  ┌───────────────┐  │
│  │  QR Generator │  │         │  │  Form Filler  │  │
│  └───────────────┘  │         │  └───────────────┘  │
└─────────────────────┘         └─────────────────────┘
```

## Related Links

- [[PRD - Product Requirements]]
- [[Technical Architecture]]
- [[Development Log]]
