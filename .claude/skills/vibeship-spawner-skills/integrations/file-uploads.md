# File Uploads & Storage

> Expert at handling file uploads and cloud storage. Covers S3,
Cloudflare R2, presigned URLs, multipart uploads, and image
optimization. Knows how to handle large files without blocking.


**Category:** integrations | **Version:** 1.0.0

**Tags:** file-upload, s3, r2, storage, presigned, images

---

## Identity

[object Object]

## Patterns


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [CRITICAL] Trusting client-provided file type

**Situation:** User uploads malware.exe renamed to image.jpg. You check
extension, looks fine. Store it. Serve it. Another user
downloads and executes it.


**Why it happens:**
File extensions and Content-Type headers can be faked.
Attackers rename executables to bypass filters.


**Solution:**
```
# CHECK MAGIC BYTES

import { fileTypeFromBuffer } from "file-type";

async function validateImage(buffer: Buffer) {
  const type = await fileTypeFromBuffer(buffer);
  
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  
  if (!type || !allowedTypes.includes(type.mime)) {
    throw new Error("Invalid file type");
  }
  
  return type;
}

// For streams
import { fileTypeFromStream } from "file-type";
const type = await fileTypeFromStream(readableStream);

```

**Symptoms:**
- Malware uploaded as images
- Wrong content-type served

---

### [HIGH] No upload size restrictions

**Situation:** No file size limit. Attacker uploads 10GB file. Server runs
out of memory or disk. Denial of service. Or massive
storage bill.


**Why it happens:**
Without limits, attackers can exhaust resources. Even
legitimate users might accidentally upload huge files.


**Solution:**
```
# SET SIZE LIMITS

// Formidable
const form = formidable({
  maxFileSize: 10 * 1024 * 1024, // 10MB
});

// Multer
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 },
});

// Client-side early check
if (file.size > 10 * 1024 * 1024) {
  alert("File too large (max 10MB)");
  return;
}

// Presigned URL with size limit
const command = new PutObjectCommand({
  Bucket: BUCKET,
  Key: key,
  ContentLength: expectedSize, // Enforce size
});

```

**Symptoms:**
- Server crashes on large uploads
- Massive storage bills
- Memory exhaustion

---

### [CRITICAL] User-controlled filename allows path traversal

**Situation:** User uploads file named "../../../etc/passwd". You use
filename directly. File saved outside upload directory.
System files overwritten.


**Why it happens:**
User input should never be used directly in file paths.
Path traversal sequences can escape intended directories.


**Solution:**
```
# SANITIZE FILENAMES

import path from "path";
import crypto from "crypto";

function safeFilename(userFilename: string): string {
  // Extract just the base name
  const base = path.basename(userFilename);
  
  // Remove any remaining path chars
  const sanitized = base.replace(/[^a-zA-Z0-9.-]/g, "_");
  
  // Or better: generate new name entirely
  const ext = path.extname(userFilename).toLowerCase();
  const allowed = [".jpg", ".png", ".pdf"];
  
  if (!allowed.includes(ext)) {
    throw new Error("Invalid extension");
  }
  
  return crypto.randomUUID() + ext;
}

// Never do this
const path = "uploads/" + req.body.filename; // DANGER!

// Do this
const path = "uploads/" + safeFilename(req.body.filename);

```

**Symptoms:**
- Files outside upload directory
- System file access

---

### [MEDIUM] Presigned URL shared or cached incorrectly

**Situation:** Presigned URL for private file returned in API response.
Response cached by CDN. Anyone with cached URL can access
private file for hours.


**Why it happens:**
Presigned URLs grant temporary access. If cached or shared,
access extends beyond intended scope.


**Solution:**
```
# CONTROL PRESIGNED URL DISTRIBUTION

// Short expiry for sensitive files
const url = await getSignedUrl(s3, command, {
  expiresIn: 300, // 5 minutes
});

// No-cache headers for presigned URL responses
return Response.json({ url }, {
  headers: {
    "Cache-Control": "no-store, max-age=0",
  },
});

// Or use CloudFront signed URLs for more control

```

**Symptoms:**
- Private files accessible via cached URLs
- Access after expiry

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `image optimization CDN` | performance-optimization | Image delivery |
| `storing file metadata` | postgres-wizard | Database schema |

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/integrations/file-uploads/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
