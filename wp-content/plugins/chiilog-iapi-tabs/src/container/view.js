/**
 * WordPress dependencies
 */
import { store } from '@wordpress/interactivity';

store( 'iapiTabs', {
	state: {},
	actions: {
		selectTab: () => {
			console.log( 'click' );
		},
	},
	callbacks: {},
} );
