# Dokumentasi Payload Pengajuan - Amanah Bangkit Bersama

## Overview
Dokumen ini menjelaskan struktur payload yang dikirim dari frontend ke backend ketika user menyelesaikan form pengajuan sertifikat tanah.

## Endpoint
- **Method:** `POST`
- **URL:** `{API_BASE_URL}/pengajuan`
- **Content-Type:** `multipart/form-data`
- **Header:** 
  - `Accept: application/json`
  - `Authorization: Bearer {token}` (optional, jika tersedia)

## Request Format

### Multipart Form Data

Payload dikirim sebagai `multipart/form-data` karena mengandung file. Berikut adalah field-field yang dikirim:

---

## Step 1: Data Dasar (DASAR)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `role` | string | ✅ | Status peran pemohon. Pilihan: `"pemilik"`, `"waris"`, `"kuasa"` |
| `ownerName` | string | ✅ | Nama pemilik sesuai surat tanah |
| `relationship` | string | ❌ | Hubungan dengan pemilik (jika role = "waris"). Pilihan: `"anak"`, `"pasangan"`, `"orangtua"`, `"lainnya"` |

**Contoh:**
```
role: "waris"
ownerName: "Budi Santoso"
relationship: "anak"
```

---

## Step 2: Data Lokasi Lahan (LAHAN)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `provinsi` | string | ✅ | ID Provinsi (dari API wilayah) |
| `kota` | string | ✅ | ID Kota/Kabupaten (dari API wilayah) |
| `kecamatan` | string | ✅ | ID Kecamatan (dari API wilayah) |
| `desa` | string | ✅ | ID Desa/Kelurahan (dari API wilayah) |
| `alamat` | string | ✅ | Alamat lengkap lahan |
| `luas` | string | ✅ | Luas lahan (format: "1500 m²" atau "1.5 ha") |
| `kondisi` | string | ✅ | Kondisi fisik lahan. Pilihan: `"baik"`, `"sedang"`, `"buruk"` |
| `koordinat` | string | ✅ | Koordinat lahan (format: "-6.2088,106.8456") |

**Contoh:**
```
provinsi: "21145"
kota: "3208"
kecamatan: "3212"
desa: "3212010"
alamat: "Jalan Merdeka No. 123, RT 05/RW 08"
luas: "1500"
kondisi: "baik"
koordinat: "-6.2088,106.8456"
```

---

## Step 3: Dokumen Alas Hak (DOKUMENHAK)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `jenisDocHak` | string | ✅ | Jenis dokumen dasar. Pilihan: `"eigendom"`, `"girik"`, `"ajb"`, `"hibah"`, `"waris"` |
| `nomorDoc` | string | ✅ | Nomor dokumen (format sesuai dokumen asli) |
| `tahunTerbit` | string | ✅ | Tahun terbit dokumen (format: "2015") |
| `riwayatPenguasaan` | string | ✅ | Asal-usul penguasaan tanah. Pilihan: `"jual-beli"`, `"warisan"`, `"hibah"`, `"lainnya"` |

**Contoh:**
```
jenisDocHak: "ajb"
nomorDoc: "1234/2020"
tahunTerbit: "2020"
riwayatPenguasaan: "warisan"
```

---

## Step 4: Dokumen Pendukung (DOKUMENPENDUKUNG)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ktp` | file | ✅ | Scan KTP pemilik atau pemohon. Format: JPG, PNG, PDF. Max: 5MB |
| `kk` | file | ✅ | Scan Kartu Keluarga. Format: JPG, PNG, PDF. Max: 5MB |
| `landDocument` | file | ✅ | Scan bukti kepemilikan/dokumen hak. Format: JPG, PNG, PDF. Max: 5MB |
| `locationPhoto` | file | ✅ | Foto lokasi tanah. Format: JPG, PNG. Max: 5MB |
| `notes` | string | ❌ | Catatan tambahan/informasi tambahan |
| `disclaimerAccepted` | string | ✅ | Persetujuan keaslian dokumen. Nilai: `"true"` jika disetujui |

**Note:** File dikirim sebagai `multipart/form-data` field.

**Contoh:**
```
ktp: [binary file data - "ktp_budi.pdf"]
kk: [binary file data - "kk_budi.pdf"]
landDocument: [binary file data - "surat_tanah.pdf"]
locationPhoto: [binary file data - "lokasi.jpg"]
notes: "Lokasi dekat dengan jalan raya, jam kunjungan pagi hari saja"
disclaimerAccepted: "true"
```

---

## Step 5: Dokumen Legalitas (LEGALITAS)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `uploadedLegalFile` | file | ✅ | Foto surat kuasa yang sudah ditandatangani dan bermaterai. Format: JPG, PNG, PDF. Max: 5MB |

**Contoh:**
```
uploadedLegalFile: [binary file data - "surat_kuasa_signed.pdf"]
```

---

## Contoh Request Lengkap (cURL)

```bash
curl -X POST https://api-abb.exium.my.id/api/pengajuan \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -F "role=waris" \
  -F "ownerName=Budi Santoso" \
  -F "relationship=anak" \
  -F "provinsi=21145" \
  -F "kota=3208" \
  -F "kecamatan=3212" \
  -F "desa=3212010" \
  -F "alamat=Jalan Merdeka No. 123, RT 05/RW 08" \
  -F "luas=1500" \
  -F "kondisi=baik" \
  -F "koordinat=-6.2088,106.8456" \
  -F "jenisDocHak=ajb" \
  -F "nomorDoc=1234/2020" \
  -F "tahunTerbit=2020" \
  -F "riwayatPenguasaan=warisan" \
  -F "ktp=@/path/to/ktp.pdf" \
  -F "kk=@/path/to/kk.pdf" \
  -F "landDocument=@/path/to/land_doc.pdf" \
  -F "locationPhoto=@/path/to/photo.jpg" \
  -F "notes=Tambahan informasi lokasi" \
  -F "disclaimerAccepted=true" \
  -F "uploadedLegalFile=@/path/to/surat_kuasa.pdf"
```

---

## Contoh Response

### Success (201 Created)
```json
{
  "success": true,
  "message": "Pengajuan berhasil dikirim",
  "data": {
    "id": "pengajuan_123456",
    "status": "pending",
    "createdAt": "2024-02-27T10:30:00Z",
    "reference_number": "ABB-2024-001234"
  }
}
```

### Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Data wajib tidak lengkap: role dan ownerName harus diisi"
}
```

### Error (401 Unauthorized)
```json
{
  "success": false,
  "message": "Unauthorized - Token tidak valid"
}
```

### Error (413 Payload Too Large)
```json
{
  "success": false,
  "message": "File terlalu besar. Maksimal 5MB per file"
}
```

---

## Backend Implementation Notes

### Validation Required
1. **Role validation**: Hanya terima `"pemilik"`, `"waris"`, `"kuasa"`
2. **Required fields validation**: Check semua field Step 1-4
3. **File validation**:
   - Maksimal size: 5MB per file
   - Allowed types: `image/jpeg`, `image/png`, `application/pdf`
   - Virus scan recommended
4. **Coordinate format**: Validasi format koordinat (latitude,longitude)
5. **Token verification**: Validasi JWT token dari header Authorization

### File Storage
- Simpan file dengan naming convention: `pengajuan_{id}_{field_name}_{timestamp}`
- Recommended: Gunakan cloud storage (S3, GCS, Azure Blob)
- Backup: Encrypt sensitive files

### Database Schema

```sql
CREATE TABLE pengajuan (
  id varchar(255) PRIMARY KEY,
  user_id varchar(255) NOT NULL,
  status enum('pending', 'in_review', 'approved', 'rejected') DEFAULT 'pending',
  
  -- Step 1
  role varchar(50) NOT NULL,
  owner_name varchar(255) NOT NULL,
  relationship varchar(50),
  
  -- Step 2
  provinsi_id varchar(50),
  kota_id varchar(50),
  kecamatan_id varchar(50),
  desa_id varchar(50),
  alamat text,
  luas varchar(50),
  kondisi varchar(50),
  koordinat varchar(100),
  
  -- Step 3
  jenis_doc_hak varchar(50),
  nomor_doc varchar(100),
  tahun_terbit int,
  riwayat_penguasaan varchar(50),
  
  -- Step 4
  ktp_file_path varchar(255),
  kk_file_path varchar(255),
  land_document_file_path varchar(255),
  location_photo_file_path varchar(255),
  notes text,
  disclaimer_accepted boolean DEFAULT false,
  
  -- Step 5
  uploaded_legal_file_path varchar(255),
  
  -- Metadata
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  reviewed_at timestamp,
  reviewed_by varchar(255),
  rejection_reason text,
  
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### API Endpoint Implementation (Node.js/Express Example)

```javascript
const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/pengajuan/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

router.post('/pengajuan', authenticateToken, upload.fields([
  { name: 'ktp', maxCount: 1 },
  { name: 'kk', maxCount: 1 },
  { name: 'landDocument', maxCount: 1 },
  { name: 'locationPhoto', maxCount: 1 },
  { name: 'uploadedLegalFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const { body, files, user } = req;
    
    // Validate required fields
    if (!body.role || !body.ownerName) {
      return res.status(400).json({
        success: false,
        message: 'Data wajib tidak lengkap'
      });
    }
    
    // Create pengajuan record
    const pengajuan = await Pengajuan.create({
      user_id: user.id,
      role: body.role,
      owner_name: body.ownerName,
      relationship: body.relationship,
      // ... other fields
      ktp_file_path: files.ktp?.[0]?.path,
      kk_file_path: files.kk?.[0]?.path,
      // ... other file paths
      status: 'pending'
    });
    
    res.status(201).json({
      success: true,
      message: 'Pengajuan berhasil dikirim',
      data: {
        id: pengajuan.id,
        status: pengajuan.status,
        reference_number: generateReferenceNumber(pengajuan.id)
      }
    });
  } catch (error) {
    console.error('Error submitting pengajuan:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses pengajuan'
    });
  }
});

module.exports = router;
```

---

## Notes untuk Development
- Semua field dalam bentuk text/string kecuali file
- File harus valid dan tidak dikosongkan
- Koordinat format: `"-6.2088,106.8456"` (latitude,longitude)
- Token diambil dari localStorage (key: `authToken`)
- API base URL dari env: `VITE_API_BASE_URL`

