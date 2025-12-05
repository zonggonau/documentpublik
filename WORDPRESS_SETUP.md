# WordPress Custom Post Type - Dokumen Publik

## Instalasi Plugin WordPress

### Langkah 1: Upload Plugin
1. Copy file `wordpress-cpt.php` ke direktori WordPress Anda
2. Letakkan di: `wp-content/plugins/intanjaya-dokumen-publik/intanjaya-dokumen-publik.php`
3. Atau buat folder baru di `wp-content/plugins/` dengan nama `intanjaya-dokumen-publik`

### Langkah 2: Aktivasi Plugin
1. Login ke WordPress Admin Dashboard
2. Buka menu **Plugins**
3. Cari "Intan Jaya Dokumen Publik CPT"
4. Klik **Activate**

### Langkah 3: Verifikasi Instalasi
Setelah aktivasi, Anda akan melihat:
- Menu baru **"Dokumen Publik"** di sidebar admin
- Sub-menu **"Kategori"** untuk mengelola kategori dokumen

## Struktur Custom Post Type

### Post Type: `dokumen_publik`
- **Slug**: `dokumen_publik`
- **REST API**: Tersedia di `/wp-json/wp/v2/dokumen`
- **Supports**: Title, Editor, Thumbnail, Custom Fields, Excerpt

### Taxonomy: `kategori_dokumen`
- **Slug**: `kategori_dokumen`
- **Hierarchical**: Ya (seperti Categories)
- **REST API**: Tersedia di `/wp-json/wp/v2/kategori_dokumen`

### Kategori Default
Plugin otomatis membuat 8 kategori:
1. Perencanaan
2. Keuangan
3. Produk Hukum
4. Kinerja Pemerintah
5. Pengadaan Barang & Jasa
6. Data & Statistik
7. SOP & Standar Layanan
8. Dokumen PPID

## Custom Fields

### File URL
- **Field Name**: `_dokumen_file_url`
- **Meta Box**: "File Dokumen"
- **Deskripsi**: URL file PDF/Doc yang akan diunduh
- **REST API**: Tersedia sebagai `file_url` di response

## REST API Endpoint

### Endpoint Utama
```
GET http://localhost/intanjayakab/index.php?rest_route=/wp/v2/dokumen
```

### Custom Endpoint (Jika menggunakan custom route)
```
GET http://localhost/intanjayakab/index.php?rest_route=/intanjaya/v1/dokumen
```

### Parameter Query
- `page`: Nomor halaman (default: 1)
- `per_page`: Jumlah item per halaman (default: 10)
- `category`: Filter berdasarkan kategori ID atau slug

### Contoh Response
```json
{
  "page": 1,
  "per_page": 10,
  "total": 1,
  "total_pages": 1,
  "items": [
    {
      "id": 35,
      "title": "Surat Pengusulan IT Support",
      "file_url": "http://localhost/intanjayakab/wp-content/uploads/2025/12/Surat-Pengusulan-IT-Suport.pdf",
      "permalink": "http://localhost/intanjayakab/?dokumen_publik=surat-pengusulan-it-suport",
      "categories": [
        {
          "id": 9,
          "slug": "data-statistik",
          "name": "Data & Statistik"
        }
      ]
    }
  ]
}
```

## Cara Menambah Dokumen

### Melalui WordPress Admin
1. Buka **Dokumen Publik** > **Tambah Baru**
2. Isi **Judul** dokumen
3. Isi **Konten** (deskripsi/ringkasan)
4. Pilih **Kategori Dokumen**
5. Di meta box **"File Dokumen"**, masukkan URL file
6. Klik **Publish**

### Upload File
1. Upload file PDF/Doc ke Media Library
2. Copy URL file dari Media Library
3. Paste URL ke field "File Dokumen"

## Konfigurasi Next.js

### Environment Variable
Buat file `.env.local` di root project Next.js:

```env
NEXT_PUBLIC_API_URL=http://localhost/intanjayakab/index.php?rest_route=/intanjaya/v1/dokumen
```

### Atau gunakan WordPress default REST API
```env
NEXT_PUBLIC_API_URL=http://localhost/intanjayakab/wp-json/wp/v2/dokumen
```

## Custom REST API Route (Opsional)

Jika Anda ingin membuat custom endpoint seperti `/intanjaya/v1/dokumen`, tambahkan kode berikut ke plugin:

```php
// Register custom REST API route
function intanjaya_register_rest_route() {
    register_rest_route('intanjaya/v1', '/dokumen', array(
        'methods' => 'GET',
        'callback' => 'intanjaya_get_dokumen',
        'permission_callback' => '__return_true'
    ));
}
add_action('rest_api_init', 'intanjaya_register_rest_route');

function intanjaya_get_dokumen($request) {
    $page = $request->get_param('page') ?: 1;
    $per_page = $request->get_param('per_page') ?: 10;
    $category = $request->get_param('category');
    
    $args = array(
        'post_type' => 'dokumen_publik',
        'posts_per_page' => $per_page,
        'paged' => $page,
        'post_status' => 'publish'
    );
    
    if ($category) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'kategori_dokumen',
                'field' => 'slug',
                'terms' => $category
            )
        );
    }
    
    $query = new WP_Query($args);
    $items = array();
    
    foreach ($query->posts as $post) {
        $categories = wp_get_post_terms($post->ID, 'kategori_dokumen');
        $cats = array();
        foreach ($categories as $cat) {
            $cats[] = array(
                'id' => $cat->term_id,
                'slug' => $cat->slug,
                'name' => $cat->name
            );
        }
        
        $items[] = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'file_url' => get_post_meta($post->ID, '_dokumen_file_url', true),
            'permalink' => get_permalink($post->ID),
            'categories' => $cats,
            'date' => $post->post_date,
            'excerpt' => $post->post_excerpt
        );
    }
    
    return array(
        'page' => (int)$page,
        'per_page' => (int)$per_page,
        'total' => $query->found_posts,
        'total_pages' => $query->max_num_pages,
        'items' => $items
    );
}
```

## Troubleshooting

### Permalink tidak bekerja
1. Buka **Settings** > **Permalinks**
2. Klik **Save Changes** untuk flush rewrite rules

### REST API tidak bisa diakses
1. Pastikan WordPress REST API aktif
2. Cek `.htaccess` untuk mod_rewrite
3. Test endpoint: `http://localhost/intanjayakab/wp-json/`

### Custom field tidak muncul di REST API
1. Pastikan plugin sudah diaktivasi
2. Cek fungsi `intanjaya_register_rest_fields()`
3. Clear cache jika menggunakan caching plugin

## Support

Untuk pertanyaan atau masalah, hubungi:
- Email: info@intanjayakab.go.id
- Website: https://intanjayakab.go.id
