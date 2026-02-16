# Chrome Web Store Submission Guide

## Step 1: Create Developer Account

1. Go to: https://chrome.google.com/webstore/devconsole/
2. Sign in with Google account
3. Pay one-time $5 registration fee
4. Accept developer agreement

## Step 2: Prepare Extension ZIP

Create a ZIP file containing only the `extension/` folder contents:
```
extension/
├── manifest.json
├── popup/
├── scanner/
├── lib/
└── icons/
```

**Do NOT include:**
- store-listing/ folder
- tools/ folder
- Any .md files outside extension/

## Step 3: Create Store Listing

### Basic Info
- **Name:** QR Password Fill
- **Summary (132 chars max):** Scan QR codes from your air-gapped device to securely copy passwords. No cloud, no sync, no tracking.
- **Category:** Productivity
- **Language:** English

### Description
Copy from: `description.txt`

### Graphic Assets Needed

| Asset | Size | Required |
|-------|------|----------|
| Icon | 128x128 | ✅ Already have |
| Screenshot 1 | 1280x800 or 640x400 | ✅ Required |
| Screenshot 2 | 1280x800 or 640x400 | Optional |
| Small promo tile | 440x280 | Optional |
| Marquee promo | 1400x560 | Optional |

**Screenshot suggestions:**
1. Scanner in action (camera view with QR frame)
2. Result view (masked password with copy button)

### Privacy
- **Single purpose:** Scan QR codes and copy decoded content to clipboard
- **Permission justification:** activeTab - to open scanner in new tab
- **Privacy policy URL:** Host `privacy-policy.md` somewhere (GitHub Pages, your website, or Notion)

## Step 4: Upload & Submit

1. Click "New Item" in developer console
2. Upload ZIP file
3. Fill in store listing details
4. Add screenshots
5. Set privacy practices
6. Submit for review

## Review Timeline

- Usually 1-3 business days
- May take longer for first submission
- Google may request changes

## Quick Checklist

- [ ] Developer account created ($5 paid)
- [ ] ZIP file created (extension folder only)
- [ ] Privacy policy hosted online
- [ ] At least 1 screenshot ready
- [ ] Description copied from description.txt

---

## After Approval

Once approved, you'll get a Chrome Web Store URL like:
`https://chrome.google.com/webstore/detail/qr-password-fill/[extension-id]`

Share this link anywhere!
