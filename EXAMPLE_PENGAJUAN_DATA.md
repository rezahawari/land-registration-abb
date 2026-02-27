# Contoh Data Pengajuan - Real World Example

## File ini menunjukkan bagaimana frontend mengirim data ke backend

---

## Scenario 1: Pengajuan oleh Ahli Waris

### Step 1 - Data Dasar
```
role: "waris"
ownerName: "Budi Santoso"
relationship: "anak"
```

### Step 2 - Lokasi Tanah
```
provinsi: "21"  // ID Jawa Barat (dari API)
kota: "3208"    // ID Bekasi
kecamatan: "3212"
desa: "3212010" // ID Pondok Gede
alamat: "Jalan Ahmad Yani No. 456, RT 05/RW 08, Pondok Gede, Bekasi"
luas: "1500"    // 1500 m²
kondisi: "baik"
koordinat: "-6.2088,106.8456"
```

### Step 3 - Dokumen Hak
```
jenisDocHak: "ajb"
nomorDoc: "1234/2019/Pondok Gede"
tahunTerbit: "2019"
riwayatPenguasaan: "warisan"
```

### Step 4 - File dan Dokumen
```
ktp: [File Object - scan_ktp_budisantoso.pdf]        // Size: ~800KB
kk: [File Object - kk_keluarga_santoso.pdf]           // Size: ~600KB
landDocument: [File Object - serat_ukur_1500m2.pdf]   // Size: ~2MB
locationPhoto: [File Object - foto_lokasi_depan.jpg]  // Size: ~1.5MB
notes: "Lokasi dekat masjid Al-Hidayah, sebaiknya kunjungi pada siang hari. Pm boleh hubungi ibu Siti (08123456789)"
disclaimerAccepted: "true"
```

### Step 5 - Legalitas
```
uploadedLegalFile: [File Object - surat_kuasa_signed_materai.pdf]  // Size: ~1.2MB
```

### Complete Payload (Multipart Form Data)
```
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="role"

waris
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="ownerName"

Budi Santoso
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="relationship"

anak
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="provinsi"

21
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="kota"

3208
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="kecamatan"

3212
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="desa"

3212010
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="alamat"

Jalan Ahmad Yani No. 456, RT 05/RW 08, Pondok Gede, Bekasi
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="luas"

1500
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="kondisi"

baik
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="koordinat"

-6.2088,106.8456
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="jenisDocHak"

ajb
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="nomorDoc"

1234/2019/Pondok Gede
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="tahunTerbit"

2019
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="riwayatPenguasaan"

warisan
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="ktp"; filename="scan_ktp_budisantoso.pdf"
Content-Type: application/pdf

[Binary PDF data...]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="kk"; filename="kk_keluarga_santoso.pdf"
Content-Type: application/pdf

[Binary PDF data...]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="landDocument"; filename="serat_ukur_1500m2.pdf"
Content-Type: application/pdf

[Binary PDF data...]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="locationPhoto"; filename="foto_lokasi_depan.jpg"
Content-Type: image/jpeg

[Binary JPEG data...]
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="notes"

Lokasi dekat masjid Al-Hidayah, sebaiknya kunjungi pada siang hari. PM boleh hubungi ibu Siti (08123456789)
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="disclaimerAccepted"

true
------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="uploadedLegalFile"; filename="surat_kuasa_signed_materai.pdf"
Content-Type: application/pdf

[Binary PDF data...]
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```

---

## Scenario 2: Pengajuan oleh Pemilik Langsung (Pemilik)

### Data Lengkap
```javascript
{
  // Step 1
  role: "pemilik",
  ownerName: "Siti Nurhaliza",
  relationship: undefined,  // Tidak ada karena role = pemilik
  
  // Step 2
  provinsi: "11",          // DKI Jakarta
  kota: "1371",            // Jakarta Selatan
  kecamatan: "1372",       // Cilandak
  desa: "1372045",         // Pondok Labu
  alamat: "Jalan Cilandak Tengah No. 88, RT 12/RW 03",
  luas: "300",
  kondisi: "sedang",
  koordinat: "-6.2622,106.8006",
  
  // Step 3
  jenisDocHak: "eigendom",
  nomorDoc: "EIGENDOM/00456",
  tahunTerbit: "1995",
  riwayatPenguasaan: "jual-beli",
  
  // Step 4
  ktp: File,               // scan_ktp_siti.jpg
  kk: File,                // kk_keluarga.jpg
  landDocument: File,      // eigendom_surat_tanah.pdf
  locationPhoto: File,     // foto_tanah_siti.jpg
  notes: "Tanah pekarangan dengan rumah, silakan datang siang hari",
  disclaimerAccepted: "true",
  
  // Step 5
  uploadedLegalFile: File  // surat_kuasa_siti_signed.pdf
}
```

---

## Scenario 3: Pengajuan dengan Kuasa (Kuasa)

### Data Lengkap
```javascript
{
  // Step 1
  role: "kuasa",
  ownerName: "H. Ahmad Subagja",  // Nama pemilik sebenarnya (yang diberi kuasa)
  relationship: undefined,         // Tidak ada untuk role kuasa
  
  // Step 2
  provinsi: "32",                 // Jawa Tengah
  kota: "3301",                   // Semarang
  kecamatan: "3307",              // Candisari
  desa: "3307150",                // Tanjungsari
  alamat: "Jalan Pandanaran No. 999, RT 07/RW 02, Tanjungsari, Semarang",
  luas: "2000",
  kondisi: "baik",
  koordinat: "-6.9664,110.4048",
  
  // Step 3
  jenisDocHak: "girik",
  nomorDoc: "GIRIK/0123456789",
  tahunTerbit: "2005",
  riwayatPenguasaan: "hibah",
  
  // Step 4
  ktp: File,               // KTP pemohon (yang dikuasai)
  kk: File,                // KK pemilik
  landDocument: File,      // Girik asli
  locationPhoto: File,     // Foto lokasi
  notes: "Hubungi Bapak Didy (08812345678) untuk survey lokasi",
  disclaimerAccepted: "true",
  
  // Step 5
  uploadedLegalFile: File  // Surat kuasa dari pemilik (H. Ahmad)
}
```

---

## Database Record After Processing

```sql
INSERT INTO pengajuan (
  id, user_id, status, 
  role, owner_name, relationship,
  provinsi_id, kota_id, kecamatan_id, desa_id, alamat, luas, kondisi, koordinat,
  jenis_doc_hak, nomor_doc, tahun_terbit, riwayat_penguasaan,
  ktp_file_path, kk_file_path, land_document_file_path, location_photo_file_path,
  notes, disclaimer_accepted, uploaded_legal_file_path,
  created_at, updated_at
) VALUES (
  'PRJ_20240227_001', 
  'USER_12345', 
  'pending',
  'waris', 
  'Budi Santoso', 
  'anak',
  '21', 
  '3208', 
  '3212', 
  '3212010', 
  'Jalan Ahmad Yani No. 456, RT 05/RW 08, Pondok Gede, Bekasi',
  '1500',
  'baik',
  '-6.2088,106.8456',
  'ajb',
  '1234/2019/Pondok Gede',
  '2019',
  'warisan',
  '/storage/pengajuan/PRJ_20240227_001/ktp.pdf',
  '/storage/pengajuan/PRJ_20240227_001/kk.pdf',
  '/storage/pengajuan/PRJ_20240227_001/land_document.pdf',
  '/storage/pengajuan/PRJ_20240227_001/location_photo.jpg',
  'Lokasi dekat masjid Al-Hidayah, sebaiknya kunjungi pada siang hari. PM boleh hubungi ibu Siti (08123456789)',
  true,
  '/storage/pengajuan/PRJ_20240227_001/legal_file.pdf',
  '2024-02-27 10:35:22',
  '2024-02-27 10:35:22'
);
```

---

## Response Samples

### Success Response (201)
```json
{
  "success": true,
  "message": "Pengajuan berhasil dikirim. Kami akan segera mengurusnya untuk Anda.",
  "data": {
    "id": "PRJ_20240227_001",
    "status": "pending",
    "createdAt": "2024-02-27T10:35:22Z",
    "reference_number": "ABB-PRJ-20240227-001",
    "estimatedReviewTime": "3-5 hari kerja"
  }
}
```

### Validation Error (400)
```json
{
  "success": false,
  "message": "Data wajib tidak lengkap",
  "errors": [
    {
      "field": "role",
      "message": "role harus diisi"
    },
    {
      "field": "ownerName",
      "message": "Nama pemilik harus diisi"
    }
  ]
}
```

### File Size Error (413)
```json
{
  "success": false,
  "message": "File terlalu besar",
  "errors": [
    {
      "field": "ktp",
      "message": "File KTP (6.2 MB) melebihi batas maksimal 5 MB"
    }
  ]
}
```

---

## Testing Data for Backend

You can use these values to create test cases:

### Valid Cases
- role: `["pemilik", "waris", "kuasa"]`
- relationship (when role=waris): `["anak", "pasangan", "orangtua", "lainnya"]`
- kondisi: `["baik", "sedang", "buruk"]`
- jenisDocHak: `["eigendom", "girik", "ajb", "hibah", "waris"]`
- riwayatPenguasaan: `["jual-beli", "warisan", "hibah", "lainnya"]`

### Invalid Cases to Test
- Missing required fields: role, ownerName, etc.
- Invalid role value: "pelabur", "investor" (should fail)
- Empty koordinat or invalid format: "-6.2088" (missing longitude)
- File size > 5MB (should fail)
- Wrong file type: .txt, .exe (should fail)
- disclaimerAccepted not "true" (should fail)

