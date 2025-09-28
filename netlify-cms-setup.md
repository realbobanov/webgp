# Setup Guide: Website Gerakan Pemuda GPIB Cahaya Anugerah

## File Structure yang Dibuat

Website ini sudah dilengkapi dengan struktur lengkap untuk deployment ke GitHub dan Netlify:

```
gpib-pemuda-web/
├── index.html                 # Halaman utama
├── style.css                  # Stylesheet utama
├── app.js                    # JavaScript utama
├── admin/
│   ├── index.html            # Entry point Netlify CMS
│   └── config.yml            # Konfigurasi Netlify CMS
├── _netlify.toml            # Konfigurasi deployment Netlify
├── README.md                # Dokumentasi project
└── images/                  # Folder untuk gambar (akan dibuat otomatis)
```

## File Netlify CMS yang Perlu Ditambahkan

### 1. admin/index.html
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager - GP Cahaya Anugerah</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

### 2. admin/config.yml
```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPOSITORY_NAME # Ganti dengan repository Anda
  branch: main # atau master

media_folder: "images/uploads" # Folder untuk menyimpan gambar
public_folder: "/images/uploads" # Path publik untuk gambar

collections:
  - name: "warta" # Used in routes, e.g., /admin/collections/warta
    label: "Warta Pelkat" # Used in the UI
    folder: "_posts/warta" # The path to the folder where files are stored
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}" # Filename template
    fields: # The fields for each document
      - {label: "Layout", name: "layout", widget: "hidden", default: "post"}
      - {label: "Judul", name: "title", widget: "string"}
      - {label: "Tanggal Publikasi", name: "date", widget: "datetime"}
      - {label: "Gambar Utama", name: "featured_image", widget: "image", required: false}
      - {label: "Ringkasan", name: "excerpt", widget: "text"}
      - {label: "Isi Artikel", name: "body", widget: "markdown"}
      - {label: "Kategori", name: "category", widget: "select", options: ["berita", "kegiatan", "pengumuman", "renungan"]}

  - name: "events" # Events collection
    label: "Kegiatan & Acara"
    folder: "_posts/events"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "event"}
      - {label: "Nama Acara", name: "title", widget: "string"}
      - {label: "Tanggal Acara", name: "event_date", widget: "datetime"}
      - {label: "Waktu", name: "time", widget: "string"}
      - {label: "Lokasi", name: "location", widget: "string"}
      - {label: "Poster/Gambar", name: "featured_image", widget: "image", required: false}
      - {label: "Deskripsi", name: "description", widget: "text"}
      - {label: "Detail Acara", name: "body", widget: "markdown"}
      - {label: "Status", name: "status", widget: "select", options: ["upcoming", "ongoing", "completed"]}

  - name: "dokumentasi"
    label: "Dokumentasi"
    folder: "_posts/dokumentasi"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "documentation"}
      - {label: "Judul", name: "title", widget: "string"}
      - {label: "Tanggal", name: "date", widget: "datetime"}
      - {label: "Galeri Foto", name: "gallery", widget: "list", field: {label: "Foto", name: "image", widget: "image"}}
      - {label: "Deskripsi", name: "description", widget: "text"}
      - {label: "Detail", name: "body", widget: "markdown"}
      - {label: "Kategori", name: "category", widget: "select", options: ["ibadah", "retret", "olahraga", "pelayanan", "lainnya"]}

  - name: "pages"
    label: "Halaman"
    files:
      - label: "Profil Gerakan Pemuda"
        name: "profil"
        file: "_data/profil.yml"
        fields:
          - {label: "Judul", name: "title", widget: "string", default: "Profil Gerakan Pemuda"}
          - {label: "Deskripsi Singkat", name: "description", widget: "text"}
          - {label: "Visi", name: "vision", widget: "text"}
          - {label: "Misi", name: "mission", widget: "list", field: {label: "Poin Misi", name: "point", widget: "string"}}
          - {label: "Sejarah", name: "history", widget: "markdown"}
          - label: "Kegiatan Rutin"
            name: "activities"
            widget: "list"
            fields:
              - {label: "Nama Kegiatan", name: "name", widget: "string"}
              - {label: "Jadwal", name: "schedule", widget: "string"}
              - {label: "Deskripsi", name: "description", widget: "text"}
          - label: "Struktur Organisasi"
            name: "structure"
            widget: "list"
            fields:
              - {label: "Jabatan", name: "position", widget: "string"}
              - {label: "Nama", name: "name", widget: "string"}
              - {label: "Foto", name: "photo", widget: "image", required: false}

      - label: "Informasi Kontak"
        name: "contact"
        file: "_data/contact.yml"
        fields:
          - {label: "Alamat Gereja", name: "address", widget: "text"}
          - {label: "Telepon", name: "phone", widget: "string"}
          - {label: "Email", name: "email", widget: "string"}
          - {label: "Jadwal Ibadah GP", name: "service_schedule", widget: "string"}
          - label: "Media Sosial"
            name: "social_media"
            widget: "list"
            fields:
              - {label: "Platform", name: "platform", widget: "string"}
              - {label: "URL", name: "url", widget: "string"}
```

### 3. _netlify.toml
```toml
[build]
  publish = "."
  
[build.environment]
  NODE_VERSION = "16"

# Redirect for admin
[[redirects]]
  from = "/admin/*"
  to = "/admin/index.html"
  status = 200

# Form handling
[[redirects]]
  from = "/contact"
  to = "/contact-success.html"
  status = 200
  conditions = {Role = ["form-submission"]}

# 404 redirect
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

## Langkah-langkah Deployment

### 1. Setup Repository GitHub

1. Buat repository baru di GitHub dengan nama `gpib-cahaya-anugerah-website`
2. Upload semua file website ke repository
3. Pastikan struktur folder sesuai dengan yang diatas

### 2. Setup Netlify

1. Daftar/login ke [netlify.com](https://netlify.com)
2. Klik "New site from Git"
3. Pilih GitHub dan authorize Netlify
4. Pilih repository `gpib-cahaya-anugerah-website`
5. Build settings:
   - Build command: (kosongkan untuk static site)
   - Publish directory: (kosongkan atau isi dengan ".")
6. Deploy site

### 3. Setup Authentication untuk Netlify CMS

1. Di dashboard Netlify, pergi ke Settings > Identity
2. Enable Identity service
3. Pilih "Open" untuk registration (atau "Invite only" jika ingin kontrol akses)
4. Enable Git Gateway di Services > Git Gateway
5. Add OAuth provider (GitHub):
   - Pergi ke GitHub Settings > Developer settings > OAuth Apps
   - Create new OAuth App dengan:
     - Homepage URL: `https://your-site-name.netlify.app`
     - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Copy Client ID dan Client Secret
   - Paste di Netlify Settings > Access control > OAuth > GitHub

### 4. Mengakses CMS

1. Buka `https://your-site-name.netlify.app/admin/`
2. Login dengan akun GitHub
3. Mulai mengedit konten melalui interface CMS

## Fitur Website

### Frontend (User)
- **Beranda**: Informasi umum tentang Gerakan Pemuda
- **Profil GP**: Visi, misi, sejarah, struktur organisasi
- **Warta Pelkat**: Berita dan artikel terbaru
- **Dokumentasi**: Galeri foto kegiatan
- **Kontak**: Informasi kontak dan form

### Backend (Admin)
- **Warta Management**: CRUD untuk artikel/berita
- **Event Management**: Kelola kegiatan dan acara
- **Documentation**: Upload dan kelola dokumentasi
- **Profile Management**: Edit profil organisasi
- **Media Management**: Upload dan kelola gambar

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript ES6
- **CMS**: Netlify CMS
- **Hosting**: Netlify
- **Version Control**: GitHub
- **Authentication**: Netlify Identity + GitHub OAuth

## Maintenance

1. **Update Konten**: Login ke `/admin/` untuk edit konten
2. **Update Code**: Push ke GitHub repository
3. **Backup**: GitHub repository adalah backup otomatis
4. **Analytics**: Bisa integrasikan Google Analytics di future update

Website ini siap untuk digunakan dan dapat dikelola oleh admin tanpa perlu knowledge coding!