/**
 * WordPress dependencies
 */
import { getContext, store } from '@wordpress/interactivity';

const { state, actions } = store( `chiilog-iapi-tabs`, {
	state: {
		get panelExpanded() {
			const ctx = getContext();
			return ctx.position === ctx.currentTab;
		},
		get panelHidden() {
			const ctx = getContext();
			return ctx.position !== ctx.currentTab;
		},
		get tabSelected() {
			const ctx = getContext();
			return ctx.position === ctx.currentTab;
		},
		get tabIndex() {
			const ctx = getContext();
			return ctx.position === ctx.currentTab ? 0 : -1;
		},
	},
	actions: {
		changeCurrentTab: () => {
			const ctx = getContext();
			ctx.currentTab = ctx.position;
		},
	},
	callbacks: {},
} );
