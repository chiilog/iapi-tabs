import type { BlockEditProps } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

type BlockAttributes = {
	contents: TabItem[];
};

type TabItem = {
	tabNavText: string;
};

const defaultContents: TabItem = {
	tabNavText: '',
};

export default function Edit( {
	attributes: { contents },
	setAttributes,
}: BlockEditProps< BlockAttributes > ) {
	return (
		<div { ...useBlockProps() }>
			<div className="mb-2">
				<Button
					variant="secondary"
					onClick={ () => {
						setAttributes( {
							contents: [ ...contents, defaultContents ],
						} );
					} }
				>
					{ __( 'Add Tab', 'chiilog-iapi-tabs' ) }
				</Button>
			</div>
			<div
				className="wp-block-chiilog-blocks-iapi-tabs__nav"
				role="tablist"
			>
				{ contents.map( ( tabItem, index ) => {
					const tabId = index + 1;
					const isLastTab = index === contents.length - 1;

					return (
						<button
							role="tab"
							className="wp-block-chiilog-blocks-iapi-tabs__button"
							aria-selected={ isLastTab ? 'true' : 'false' }
							id={ `tab-${ tabId }` }
							aria-controls={ `panel-${ tabId }` }
							tabIndex={ isLastTab ? 0 : -1 }
							key={ index }
						>
							<RichText
								value={ tabItem.tabNavText }
								tagName="span"
								onChange={ ( value ) => {
									const newContents = [ ...contents ];
									newContents[ index ] = {
										...contents[ index ],
										tabNavText: value,
									};
									setAttributes( {
										contents: newContents,
									} );
								} }
								placeholder={ __( 'Tab', 'chiilog-iapi-tabs' ) }
							/>
						</button>
					);
				} ) }
			</div>
			<div
				id="panel-1"
				role="tabpanel"
				tabIndex={ 0 }
				aria-labelledby="tab-1"
				className="wp-block-chiilog-blocks-iapi-tabs__panel"
				aria-expanded="true"
				aria-hidden="false"
			>
				パネル1
			</div>
			<div
				id="panel-2"
				role="tabpanel"
				tabIndex={ 0 }
				aria-labelledby="tab-2"
				className="wp-block-chiilog-blocks-iapi-tabs__panel"
				aria-expanded="false"
				aria-hidden="true"
			>
				パネル2
			</div>
			<div
				id="panel-3"
				role="tabpanel"
				tabIndex={ 0 }
				aria-labelledby="tab-3"
				className="wp-block-chiilog-blocks-iapi-tabs__panel"
				aria-expanded="false"
				aria-hidden="true"
			>
				パネル3
			</div>
		</div>
	);
}
