import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Edit( {} ) {
	return (
		<div
			{ ...useBlockProps() }
			id="panel-1"
			role="tabpanel"
			tabIndex={ 0 }
			aria-labelledby="tab-1"
			aria-expanded="true"
			aria-hidden="false"
		>
			<div { ...useInnerBlocksProps() } />
		</div>
	);
}
