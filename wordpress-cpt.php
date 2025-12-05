<?php
/**
 * Plugin Name: Intan Jaya Dokumen Publik CPT
 * Description: Custom Post Type and Taxonomy for Dokumen Publik
 * Version: 1.0
 * Author: Antigravity
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function intanjaya_register_dokumen_cpt() {
	$labels = array(
		'name'                  => _x( 'Dokumen Publik', 'Post Type General Name', 'intanjaya' ),
		'singular_name'         => _x( 'Dokumen Publik', 'Post Type Singular Name', 'intanjaya' ),
		'menu_name'             => __( 'Dokumen Publik', 'intanjaya' ),
		'name_admin_bar'        => __( 'Dokumen Publik', 'intanjaya' ),
		'archives'              => __( 'Arsip Dokumen', 'intanjaya' ),
		'attributes'            => __( 'Atribut Dokumen', 'intanjaya' ),
		'parent_item_colon'     => __( 'Induk Dokumen:', 'intanjaya' ),
		'all_items'             => __( 'Semua Dokumen', 'intanjaya' ),
		'add_new_item'          => __( 'Tambah Dokumen Baru', 'intanjaya' ),
		'add_new'               => __( 'Tambah Baru', 'intanjaya' ),
		'new_item'              => __( 'Dokumen Baru', 'intanjaya' ),
		'edit_item'             => __( 'Edit Dokumen', 'intanjaya' ),
		'update_item'           => __( 'Perbarui Dokumen', 'intanjaya' ),
		'view_item'             => __( 'Lihat Dokumen', 'intanjaya' ),
		'view_items'            => __( 'Lihat Dokumen', 'intanjaya' ),
		'search_items'          => __( 'Cari Dokumen', 'intanjaya' ),
		'not_found'             => __( 'Tidak ditemukan', 'intanjaya' ),
		'not_found_in_trash'    => __( 'Tidak ditemukan di Sampah', 'intanjaya' ),
		'featured_image'        => __( 'Gambar Unggulan', 'intanjaya' ),
		'set_featured_image'    => __( 'Atur gambar unggulan', 'intanjaya' ),
		'remove_featured_image' => __( 'Hapus gambar unggulan', 'intanjaya' ),
		'use_featured_image'    => __( 'Gunakan sebagai gambar unggulan', 'intanjaya' ),
		'insert_into_item'      => __( 'Sisipkan ke dokumen', 'intanjaya' ),
		'uploaded_to_this_item' => __( 'Diunggah ke dokumen ini', 'intanjaya' ),
		'items_list'            => __( 'Daftar dokumen', 'intanjaya' ),
		'items_list_navigation' => __( 'Navigasi daftar dokumen', 'intanjaya' ),
		'filter_items_list'     => __( 'Filter daftar dokumen', 'intanjaya' ),
	);
	$args = array(
		'label'                 => __( 'Dokumen Publik', 'intanjaya' ),
		'description'           => __( 'Dokumen Publik Pemerintah Kab. Intan Jaya', 'intanjaya' ),
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'excerpt' ),
		'taxonomies'            => array( 'kategori_dokumen' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-media-document',
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => true,
		'has_archive'           => true,
		'exclude_from_search'   => false,
		'publicly_queryable'    => true,
		'capability_type'       => 'post',
		'show_in_rest'          => true,
		'rest_base'             => 'dokumen',
	);
	register_post_type( 'dokumen_publik', $args );
}
add_action( 'init', 'intanjaya_register_dokumen_cpt', 0 );

function intanjaya_register_dokumen_taxonomy() {
	$labels = array(
		'name'                       => _x( 'Kategori Dokumen', 'Taxonomy General Name', 'intanjaya' ),
		'singular_name'              => _x( 'Kategori Dokumen', 'Taxonomy Singular Name', 'intanjaya' ),
		'menu_name'                  => __( 'Kategori', 'intanjaya' ),
		'all_items'                  => __( 'Semua Kategori', 'intanjaya' ),
		'parent_item'                => __( 'Induk Kategori', 'intanjaya' ),
		'parent_item_colon'          => __( 'Induk Kategori:', 'intanjaya' ),
		'new_item_name'              => __( 'Nama Kategori Baru', 'intanjaya' ),
		'add_new_item'               => __( 'Tambah Kategori Baru', 'intanjaya' ),
		'edit_item'                  => __( 'Edit Kategori', 'intanjaya' ),
		'update_item'                => __( 'Perbarui Kategori', 'intanjaya' ),
		'view_item'                  => __( 'Lihat Kategori', 'intanjaya' ),
		'separate_items_with_commas' => __( 'Pisahkan kategori dengan koma', 'intanjaya' ),
		'add_or_remove_items'        => __( 'Tambah atau hapus kategori', 'intanjaya' ),
		'choose_from_most_used'      => __( 'Pilih dari yang paling banyak digunakan', 'intanjaya' ),
		'popular_items'              => __( 'Kategori Populer', 'intanjaya' ),
		'search_items'               => __( 'Cari Kategori', 'intanjaya' ),
		'not_found'                  => __( 'Tidak ditemukan', 'intanjaya' ),
		'no_terms'                   => __( 'Tidak ada kategori', 'intanjaya' ),
		'items_list'                 => __( 'Daftar kategori', 'intanjaya' ),
		'items_list_navigation'      => __( 'Navigasi daftar kategori', 'intanjaya' ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
		'show_in_rest'               => true,
		'rest_base'                  => 'kategori_dokumen',
	);
	register_taxonomy( 'kategori_dokumen', array( 'dokumen_publik' ), $args );
}
add_action( 'init', 'intanjaya_register_dokumen_taxonomy', 0 );

// Add custom meta box for file URL if not using standard featured image or attachment
function intanjaya_add_meta_boxes() {
	add_meta_box(
		'dokumen_file_url',
		'File Dokumen',
		'intanjaya_render_file_url_meta_box',
		'dokumen_publik',
		'normal',
		'high'
	);
}
add_action( 'add_meta_boxes', 'intanjaya_add_meta_boxes' );

function intanjaya_render_file_url_meta_box( $post ) {
	$value = get_post_meta( $post->ID, '_dokumen_file_url', true );
	?>
	<label for="dokumen_file_url">URL File PDF/Doc:</label>
	<input type="text" name="dokumen_file_url" id="dokumen_file_url" value="<?php echo esc_attr( $value ); ?>" style="width:100%;" />
	<p class="description">Masukkan URL file dokumen di sini atau gunakan Media Library.</p>
	<?php
}

function intanjaya_save_meta_box_data( $post_id ) {
	if ( ! isset( $_POST['dokumen_file_url'] ) ) {
		return;
	}
	$my_data = sanitize_text_field( $_POST['dokumen_file_url'] );
	update_post_meta( $post_id, '_dokumen_file_url', $my_data );
}
add_action( 'save_post', 'intanjaya_save_meta_box_data' );

// Expose custom field to REST API
function intanjaya_register_rest_fields() {
	register_rest_field( 'dokumen_publik',
		'file_url',
		array(
			'get_callback'    => 'intanjaya_get_file_url',
			'update_callback' => null,
			'schema'          => null,
		)
	);
}
add_action( 'rest_api_init', 'intanjaya_register_rest_fields' );

function intanjaya_get_file_url( $object, $field_name, $request ) {
	return get_post_meta( $object['id'], '_dokumen_file_url', true );
}

// Pre-populate terms
function intanjaya_insert_terms() {
	$terms = array(
		'Perencanaan',
		'Keuangan',
		'Produk Hukum',
		'Kinerja Pemerintah',
		'Pengadaan Barang & Jasa',
		'Data & Statistik',
		'SOP & Standar Layanan',
		'Dokumen PPID'
	);
	foreach ( $terms as $term ) {
		if ( ! term_exists( $term, 'kategori_dokumen' ) ) {
			wp_insert_term( $term, 'kategori_dokumen' );
		}
	}
}
add_action( 'init', 'intanjaya_insert_terms' );
