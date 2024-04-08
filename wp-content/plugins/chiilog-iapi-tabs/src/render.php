<?php
/**
 * @param array    $attributes The block attributes.
 * @param string   $content    The block default content.
 * @param WP_Block $block      The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	Block!
</div>
