<?php
/**
 * @var array $attributes The block attributes.
 * @var string $content The block content.
 * @var WP_Block $block The block object.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$navItems    = $attributes['contents'];
$tabClientId = $attributes['tabClientId'];

wp_interactivity_state( 'iapiTabs', array (
	'currentTab' => 0
));

?>
<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="iapiTabs"
>
	<div class="wp-block-chiilog-blocks-iapi-tabs__nav" role="tablist">
		<?php
		if ( $navItems ) :
			foreach ( $navItems as $index => $navItem ) :
				$tabNumber = $index + 1;
				?>
				<button
					role="tab"
					class="wp-block-chiilog-blocks-iapi-tabs__button"
					data-wp-on--click="actions.changeCurrentTab"
					data-wp-bind--aria-selected="state.tabSelected"
					id="tab-<?php echo esc_attr( $tabClientId ) . '-' . esc_attr( $tabNumber ); ?>"
					aria-controls="panel-<?php echo esc_attr( $tabClientId ) . '-' . esc_attr( $tabNumber ); ?>"
					data-wp-bind--tabindex="state.tabIndex"
					data-wp-context='{ "position": <?php echo esc_attr( $index ); ?> }'
				>
					<?php echo esc_html( $navItem['tabNavText'] ); ?>
				</button>
				<?php
			endforeach;
		endif;
		?>
	</div>
	<div class="wp-block-chiilog-blocks-iapi-tabs__panels">
		<?php echo do_blocks( $content ); ?>
	</div>
</div>
