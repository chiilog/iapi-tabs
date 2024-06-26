<?php
/**
 * Plugin Name:       Chiilog Iapi Tabs
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       chiilog-iapi-tabs
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_chiilog_iapi_tabs_block_init() {
	register_block_type( __DIR__ . '/build/container' );
	register_block_type( __DIR__ . '/build/panel' );
}
add_action( 'init', 'create_block_chiilog_iapi_tabs_block_init' );

/**
 * パネルの aria-expanded と aria-hidden を data-wp-bind--xxx に変換する
 *
 * @param $block_content
 * @param $block
 * @return string
 */
function add_directives_to_inner_blocks( $block_content, $block ) {
	$panels = new WP_HTML_Tag_Processor( $block_content );
	$panelCount = 0;

	while ( $panels->next_tag() ) {
		foreach ( $panels->class_list() as $class_name ) {
			if ( $class_name === 'wp-block-chiilog-blocks-iapi-tabs-panel' ) {
				$panels->set_attribute( 'data-wp-bind--aria-expanded', 'state.panelExpanded' );
				$panels->set_attribute( 'data-wp-bind--aria-hidden', 'state.panelHidden' );
				$panels->set_attribute( 'id', 'panel-' . $block['attrs']['tabClientId'] . '-' . $panelCount );
				$panels->set_attribute( 'data-wp-context', '{ "position": ' . $panelCount . ' }' );
				$panelCount++;
			}
		}
	}

	return $panels->get_updated_html();
}
add_filter( 'render_block_chiilog-blocks/iapi-tabs', 'add_directives_to_inner_blocks', 10, 2 );
