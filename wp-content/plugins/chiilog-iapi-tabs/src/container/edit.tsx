import { useState } from '@wordpress/element';
import type { BlockEditProps } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';

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
	// 選択中のタブが何番目かを保持するステート
	const [ currentTab, setCurrentTab ] = useState( 0 );

	return (
		<div { ...useBlockProps() }>
			<div className="mb-2">
				<Button
					variant="secondary"
					onClick={ () => {
						setAttributes( {
							contents: [ ...contents, defaultContents ],
						} );
						setCurrentTab( contents.length );
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

					return (
						<div className="flex flex-col gap-1 flex-auto">
							{ currentTab === index ? (
								<div>
									<Button
										size="small"
										icon={ close }
										label="削除"
										onClick={ () => {
											const newContents = [ ...contents ];
											newContents.splice( index, 1 );
											setAttributes( {
												contents: newContents,
											} );
										} }
									/>
								</div>
							) : null }

							<button
								role="tab"
								className="wp-block-chiilog-blocks-iapi-tabs__button mt-auto"
								aria-selected={
									currentTab === index ? 'true' : 'false'
								}
								id={ `tab-${ tabId }` }
								aria-controls={ `panel-${ tabId }` }
								tabIndex={ currentTab === index ? 0 : -1 }
								key={ index }
								onClick={ () => {
									setCurrentTab( index );
								} }
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
									placeholder={ __(
										'Tab',
										'chiilog-iapi-tabs'
									) }
								/>
							</button>
						</div>
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
