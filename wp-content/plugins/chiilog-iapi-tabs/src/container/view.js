/**
 * WordPress dependencies
 */
import { getContext, store } from '@wordpress/interactivity';

const { state, actions } = store( 'iapiTabs', {
	state: {
		get panelExpanded() {
			const ctx = getContext();
			return ctx.position === state.currentTab;
		},
		get panelHidden() {
			const ctx = getContext();
			return ctx.position !== state.currentTab;
		},
		get tabSelected() {
			const ctx = getContext();
			return ctx.position === state.currentTab;
		},
		get tabIndex() {
			const ctx = getContext();
			return ctx.position === state.currentTab ? 0 : -1;
		},
	},
	actions: {
		changeCurrentTab: () => {
			const ctx = getContext();
			state.currentTab = ctx.position;
		},
	},
	callbacks: {},
} );
