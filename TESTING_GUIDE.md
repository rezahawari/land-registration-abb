# Testing Guide - Pengajuan API

## Tools yang Bisa Digunakan
- Postman
- Insomnia
- Thunder Client (VS Code Extension)
- cURL
- Axios (JavaScript)

---

## Testing dengan cURL

### Minimal Test Case (Required Fields Only)
```bash
curl -X POST http://localhost:5000/api/pengajuan \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "role=pemilik" \
  -F "ownerName=Budi Santoso" \
  -F "provinsi=21" \
  -F "kota=3208" \
  -F "kecamatan=3212" \
  -F "desa=3212010" \
  -F "alamat=Jl. Merdeka 123" \
  -F "luas=1500" \
  -F "kondisi=baik" \
  -F "koordinat=-6.2088,106.8456" \
  -F "jenisDocHak=ajb" \
  -F "nomorDoc=1234/2020" \
  -F "tahunTerbit=2020" \
  -F "riwayatPenguasaan=jual-beli" \
  -F "ktp=@./test_files/ktp.pdf" \
  -F "kk=@./test_files/kk.pdf" \
  -F "landDocument=@./test_files/land.pdf" \
  -F "locationPhoto=@./test_files/photo.jpg" \
  -F "disclaimerAccepted=true" \
  -F "uploadedLegalFile=@./test_files/surat_kuasa.pdf"
```

### Complete Test Case (All Fields)
```bash
curl -X POST http://localhost:5000/api/pengajuan \
  -H "Accept: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "role=waris" \
  -F "ownerName=H. Ahmad Subagja" \
  -F "relationship=anak" \
  -F "provinsi=32" \
  -F "kota=3301" \
  -F "kecamatan=3307" \
  -F "desa=3307150" \
  -F "alamat=Jalan Pandanaran No. 999, RT 07/RW 02, Semarang" \
  -F "luas=2000" \
  -F "kondisi=baik" \
  -F "koordinat=-6.9664,110.4048" \
  -F "jenisDocHak=eigendom" \
  -F "nomorDoc=EIGENDOM/00456" \
  -F "tahunTerbit=1995" \
  -F "riwayatPenguasaan=warisan" \
  -F "ktp=@./test_files/ktp.pdf" \
  -F "kk=@./test_files/kk.pdf" \
  -F "landDocument=@./test_files/eigendom.pdf" \
  -F "locationPhoto=@./test_files/foto.jpg" \
  -F "notes=Lokasi strategis dekat jalan utama" \
  -F "disclaimerAccepted=true" \
  -F "uploadedLegalFile=@./test_files/kuasa.pdf"
```

---

## Testing dengan Postman

### Setup

1. **Create New Request**
   - Method: `POST`
   - URL: `http://localhost:5000/api/pengajuan`

2. **Headers Tab**
   ```
   Accept: application/json
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

3. **Body Tab**
   - Select: `form-data`
   - Add fields:

| Key | Type | Value |
|-----|------|-------|
| role | text | pemilik |
| ownerName | text | Budi Santoso |
| provinsi | text | 21 |
| kota | text | 3208 |
| kecamatan | text | 3212 |
| desa | text | 3212010 |
| alamat | text | Jalan Ahmad Yani 123 |
| luas | text | 1500 |
| kondisi | text | baik |
| koordinat | text | -6.2088,106.8456 |
| jenisDocHak | text | ajb |
| nomorDoc | text | 1234/2020 |
| tahunTerbit | text | 2020 |
| riwayatPenguasaan | text | jual-beli |
| ktp | file | [select file] |
| kk | file | [select file] |
| landDocument | file | [select file] |
| locationPhoto | file | [select file] |
| notes | text | Additional notes here |
| disclaimerAccepted | text | true |
| uploadedLegalFile | file | [select file] |

4. **Click Send**

---

## Testing dengan Insomnia

1. **New Request** → POST
2. **URL** → `http://localhost:5000/api/pengajuan`
3. **Auth** → Bearer Token → Paste JWT
4. **Body** → Multipart Form
5. Add all fields sama seperti Postman
6. **Send**

---

## Testing dengan JavaScript/Axios

```javascript
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function testPengajuan() {
  try {
    const form = new FormData();
    
    // Text fields
    form.append('role', 'pemilik');
    form.append('ownerName', 'Budi Santoso');
    form.append('relationship', '');
    form.append('provinsi', '21');
    form.append('kota', '3208');
    form.append('kecamatan', '3212');
    form.append('desa', '3212010');
    form.append('alamat', 'Jalan Ahmad Yani No. 123');
    form.append('luas', '1500');
    form.append('kondisi', 'baik');
    form.append('koordinat', '-6.2088,106.8456');
    form.append('jenisDocHak', 'ajb');
    form.append('nomorDoc', '1234/2020');
    form.append('tahunTerbit', '2020');
    form.append('riwayatPenguasaan', 'jual-beli');
    form.append('notes', 'Test from Axios');
    form.append('disclaimerAccepted', 'true');
    
    // File fields
    form.append('ktp', fs.createReadStream('./test_files/ktp.pdf'));
    form.append('kk', fs.createReadStream('./test_files/kk.pdf'));
    form.append('landDocument', fs.createReadStream('./test_files/land.pdf'));
    form.append('locationPhoto', fs.createReadStream('./test_files/photo.jpg'));
    form.append('uploadedLegalFile', fs.createReadStream('./test_files/kuasa.pdf'));
    
    const response = await axios.post(
      'http://localhost:5000/api/pengajuan',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': 'Bearer YOUR_JWT_TOKEN'
        }
      }
    );
    
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testPengajuan();
```

---

## Test Cases Checklist

### ✅ Valid Cases (Should Return 200/201)

- [ ] All required fields provided
- [ ] With valid JWT token
- [ ] With files all max 5MB
- [ ] With optional notes field
- [ ] With different role values (pemilik, waris, kuasa)

### ❌ Invalid Cases (Should Return 400/401)

- [ ] Missing required text fields
- [ ] Missing required files
- [ ] File size > 5MB
- [ ] Invalid file type (.exe, .txt)
- [ ] No Authorization header / Invalid token
- [ ] Malformed JSON/Form data
- [ ] Invalid role value
- [ ] Empty koordinat
- [ ] disclaimerAccepted not "true"

---

## Expected Response Samples

### Success (201 Created)
```json
{
  "success": true,
  "message": "Pengajuan berhasil dikirim. Kami akan segera mengurusnya untuk Anda.",
  "data": {
    "id": "PRJ_20240227_001",
    "status": "pending",
    "reference_number": "ABB-PRJ-20240227-001",
    "createdAt": "2024-02-27T10:35:22Z"
  }
}
```

### Missing Field (400 Bad Request)
```json
{
  "success": false,
  "message": "Data wajib tidak lengkap: ownerName harus diisi",
  "errors": [
    {
      "field": "ownerName",
      "message": "Field ini wajib diisi"
    }
  ]
}
```

### File Too Large (413 Payload Too Large)
```json
{
  "success": false,
  "message": "File terlalu besar. Maksimal 5MB per file",
  "errors": [
    {
      "field": "ktp",
      "message": "File KTP (6.2 MB) melebihi batas maksimal"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Token tidak valid atau sudah kadaluarsa"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Terjadi kesalahan saat memproses pengajuan. Silakan coba lagi nanti."
}
```

---

## Debug Tips

1. **Check Form Data Format**
   - Use Chrome DevTools → Network → Inspect request
   - Verify Content-Type is `multipart/form-data`
   - Verify boundary separator is present

2. **Check File Upload**
   - Verify file exists at path
   - Check file size < 5MB
   - Check file MIME type is allowed

3. **Check Authorization**
   - Verify token in localStorage
   - Verify token format: `Bearer {token}`
   - Check token expiration

4. **Server Logs**
   - Enable verbose logging
   - Save request headers/body to log
   - Save response status/data to log

5. **Database Check**
   - Verify record created
   - Verify file paths stored correctly
   - Check file permissions in storage folder

