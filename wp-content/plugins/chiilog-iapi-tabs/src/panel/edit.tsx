import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';

type BlockAttributes = {
	panelId: string;
	ariaLabelledby: string;
	ariaExpanded: boolean;
	ariaHidden: boolean;
};

export default function Edit( {
	attributes: { panelId, ariaLabelledby, ariaExpanded, ariaHidden },
}: BlockEditProps< BlockAttributes > ) {
	return (
		<div
			{ ...useBlockProps() }
			id={ panelId }
			role="tabpanel"
			tabIndex={ 0 }
			aria-labelledby={ ariaLabelledby }
			aria-expanded={ ariaExpanded }
			aria-hidden={ ariaHidden }
		>
			<div { ...useInnerBlocksProps() } />
		</div>
	);
}
