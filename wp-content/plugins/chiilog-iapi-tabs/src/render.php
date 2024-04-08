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
	<ul class="tab-nav">
		<li class="tab-nav__item">
			<button class="tab-nav__button is-active">ナビ1</button>
		</li>
		<li class="tab-nav__item">
			<button class="tab-nav__button">ナビ2</button>
		</li>
		<li class="tab-nav__item">
			<button class="tab-nav__button">ナビ3</button>
		</li>
	</ul>
	<div class="tab-panels">
		<div class="tab-panel is-active">パネル1</div>
		<div class="tab-panel">パネル2</div>
		<div class="tab-panel">パネル3</div>
	</div>
</div>
