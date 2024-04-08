<?php
/**
 * @param array    $attributes The block attributes.
 * @param string   $content    The block default content.
 * @param WP_Block $block      The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<ul class="flex">
		<li>ナビ1</li>
		<li>ナビ2</li>
		<li>ナビ3</li>
	</ul>
	<div class="panels">
		<div class="panel">パネル1</div>
		<div class="panel">パネル2</div>
		<div class="panel">パネル3</div>
	</div>
</div>
