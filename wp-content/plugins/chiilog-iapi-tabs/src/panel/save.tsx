import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import type { BlockAttributes } from './type';

export default function Edit( {
	attributes: { panelId, ariaLabelledby, ariaExpanded, ariaHidden },
}: BlockEditProps< BlockAttributes > ) {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return (
		<div
			{ ...innerBlocksProps }
			id={ panelId }
			role="tabpanel"
			tabIndex={ 0 }
			aria-labelledby={ ariaLabelledby }
			aria-expanded={ ariaExpanded }
			aria-hidden={ ariaHidden }
		/>
	);
}
