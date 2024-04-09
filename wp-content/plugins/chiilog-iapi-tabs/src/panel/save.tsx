import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit( {} ) {
	return (
		<div { ...useBlockProps.save() }>
			<div { ...useInnerBlocksProps.save() } />
		</div>
	);
}
