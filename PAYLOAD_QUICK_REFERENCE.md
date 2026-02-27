# Quick Reference - Pengajuan Payload

## Summary
Frontend mengirim pengajuan tanah dengan payload `multipart/form-data` ke endpoint:
```
POST /api/pengajuan
```

## Fields yang Dikirim

### Group 1: Identitas Pemohon
- `role` (required): "pemilik" | "waris" | "kuasa"
- `ownerName` (required): string, nama pemilik tanah
- `relationship` (optional): "anak" | "pasangan" | "orangtua" | "lainnya" (jika role=waris)

### Group 2: Lokasi Tanah
- `provinsi` (required): string, ID provinsi
- `kota` (required): string, ID kota
- `kecamatan` (required): string, ID kecamatan
- `desa` (required): string, ID desa/kelurahan
- `alamat` (required): string, alamat lengkap
- `luas` (required): string, "1500" (dalam m²)
- `kondisi` (required): "baik" | "sedang" | "buruk"
- `koordinat` (required): string, "-6.2088,106.8456"

### Group 3: Dokumen Hak Tanah
- `jenisDocHak` (required): "eigendom" | "girik" | "ajb" | "hibah" | "waris"
- `nomorDoc` (required): string, nomor dokumen
- `tahunTerbit` (required): string, "2020"
- `riwayatPenguasaan` (required): "jual-beli" | "warisan" | "hibah" | "lainnya"

### Group 4: File Pendukung (Multipart)
- `ktp` (required): File, JPG/PNG/PDF max 5MB
- `kk` (required): File, JPG/PNG/PDF max 5MB
- `landDocument` (required): File, JPG/PNG/PDF max 5MB
- `locationPhoto` (required): File, JPG/PNG max 5MB
- `notes` (optional): string, catatan tambahan
- `disclaimerAccepted` (required): "true" | "false"

### Group 5: Legalitas
- `uploadedLegalFile` (required): File, JPG/PNG/PDF max 5MB (Surat kuasa signed & bermaterai)

---

## Complete Field List

| Nama Field | Tipe | Required | Group | Deskripsi |
|---|---|---|---|---|
| role | string | ✅ | Identitas | pemilik/waris/kuasa |
| ownerName | string | ✅ | Identitas | Nama pemilik tanah |
| relationship | string | ⚠️ | Identitas | Hanya jika role=waris |
| provinsi | string | ✅ | Lokasi | ID Provinsi |
| kota | string | ✅ | Lokasi | ID Kota |
| kecamatan | string | ✅ | Lokasi | ID Kecamatan |
| desa | string | ✅ | Lokasi | ID Desa |
| alamat | string | ✅ | Lokasi | Alamat lengkap |
| luas | string | ✅ | Lokasi | Dalam m2 |
| kondisi | string | ✅ | Lokasi | baik/sedang/buruk |
| koordinat | string | ✅ | Lokasi | lat,lng format |
| jenisDocHak | string | ✅ | Dokumen | eigendom/girik/ajb/hibah/waris |
| nomorDoc | string | ✅ | Dokumen | Nomor dokumen |
| tahunTerbit | string | ✅ | Dokumen | Tahun terbit |
| riwayatPenguasaan | string | ✅ | Dokumen | jual-beli/warisan/hibah/lainnya |
| ktp | file | ✅ | File | KTP pemilik |
| kk | file | ✅ | File | Kartu Keluarga |
| landDocument | file | ✅ | File | Dokumen hak tanah |
| locationPhoto | file | ✅ | File | Foto lingkungan |
| notes | string | ❌ | File | Notes opsional |
| disclaimerAccepted | string | ✅ | File | "true" |
| uploadedLegalFile | file | ✅ | Legalitas | Surat kuasa signed |

---

## Example Implementation (Express.js)

```javascript
// routes/pengajuan.js
const express = require('express');
const multer = require('multer');

const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }
});

const fields = [
  { name: 'ktp', maxCount: 1 },
  { name: 'kk', maxCount: 1 },
  { name: 'landDocument', maxCount: 1 },
  { name: 'locationPhoto', maxCount: 1 },
  { name: 'uploadedLegalFile', maxCount: 1 }
];

router.post('/pengajuan', upload.fields(fields), async (req, res) => {
  try {
    const { body, files } = req;
    
    // Validate required text fields
    if (!body.role || !body.ownerName) {
      return res.status(400).json({
        success: false,
        message: 'Data required tidak lengkap'
      });
    }
    
    // Validate files exist
    if (!files.ktp || !files.kk || !files.landDocument || 
        !files.locationPhoto || !files.uploadedLegalFile) {
      return res.status(400).json({
        success: false,
        message: 'Semua file harus diunggah'
      });
    }
    
    // Create record in database
    const pengajuan = await Pengajuan.create({
      user_id: req.user.id,
      role: body.role,
      owner_name: body.ownerName,
      relationship: body.relationship || null,
      provinsi_id: body.provinsi,
      kota_id: body.kota,
      kecamatan_id: body.kecamatan,
      desa_id: body.desa,
      alamat: body.alamat,
      luas: body.luas,
      kondisi: body.kondisi,
      koordinat: body.koordinat,
      jenis_doc_hak: body.jenisDocHak,
      nomor_doc: body.nomorDoc,
      tahun_terbit: body.tahunTerbit,
      riwayat_penguasaan: body.riwayatPenguasaan,
      ktp_file_path: files.ktp[0].path,
      kk_file_path: files.kk[0].path,
      land_document_file_path: files.landDocument[0].path,
      location_photo_file_path: files.locationPhoto[0].path,
      notes: body.notes,
      disclaimer_accepted: body.disclaimerAccepted === 'true',
      uploaded_legal_file_path: files.uploadedLegalFile[0].path,
      status: 'pending'
    });
    
    res.status(201).json({
      success: true,
      message: 'Pengajuan berhasil dikirim',
      data: {
        id: pengajuan.id,
        status: pengajuan.status,
        reference_number: `ABB-${pengajuan.id.toUpperCase()}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
```

---

## Expected Flow

1. ✅ Frontend collectssemua data dari 6 step form
2. ✅ Frontend create FormData dengan semua fields
3. ✅ Frontend append files ke FormData
4. ✅ Frontend POST ke `/api/pengajuan` dengan Bearer token
5. ✅ Backend menerima multipart/form-data
6. ✅ Backend validasi semua fields
7. ✅ Backend save files ke storage
8. ✅ Backend create pengajuan record di database
9. ✅ Backend return success dengan reference_number
10. ✅ Frontend redirect ke dashboard dengan success message

---

## Error Handling

| Status | Message | Action |
|---|---|---|
| 400 | Data required tidak lengkap | Validasi field wajib |
| 400 | File terlalu besar | Max 5MB per file |
| 400 | Invalid file type | Only JPG, PNG, PDF |
| 401 | Unauthorized | Token expired/invalid |
| 413 | Payload too large | Total request > limit |
| 500 | Server error | Log dan contact support |

