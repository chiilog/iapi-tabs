import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import type { BlockAttributes } from './type';

export default function Edit( {
	attributes: { panelId, ariaLabelledby, ariaExpanded, ariaHidden },
}: BlockEditProps< BlockAttributes > ) {
	return (
		<div
			{ ...useBlockProps.save( { anchor: panelId } ) }
			role="tabpanel"
			tabIndex={ 0 }
			aria-labelledby={ ariaLabelledby }
			aria-expanded={ ariaExpanded }
			aria-hidden={ ariaHidden }
		>
			<div { ...useInnerBlocksProps.save() } />
		</div>
	);
}
