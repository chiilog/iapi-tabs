import { useDispatch, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import {
	type BlockEditProps,
	type BlockInstance,
	createBlock,
} from '@wordpress/blocks';
import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
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

const panelBlockName: string = 'chiilog-blocks/iapi-tabs-panel';

export default function Edit( {
	attributes: { contents },
	setAttributes,
	clientId,
}: BlockEditProps< BlockAttributes > ) {
	const { insertBlocks, updateBlockAttributes } =
		useDispatch( 'core/block-editor' );

	// 選択中のタブが何番目かを保持するステート
	const [ currentTab, setCurrentTab ] = useState( 0 );

	const ALLOWED_BLOCKS = [ panelBlockName ];
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			// @ts-ignore
			renderAppender: false,
		}
	);

	const blocks: BlockInstance[] = useSelect(
		// @ts-ignore
		( select ) => select( blockEditorStore ).getBlocks( clientId ),
		[ clientId ]
	);

	const updatePanelsVisibility = ( selectedIndex: number ) => {
		blocks.forEach( ( block: BlockInstance, index: number ) => {
			if ( block.name === panelBlockName ) {
				const isVisible = index === selectedIndex;
				updateBlockAttributes( block.clientId, {
					ariaExpanded: isVisible,
					ariaHidden: ! isVisible,
				} );
			}
			console.log( blocks );
			console.log( `selectedIndex: ${ selectedIndex }` );
			console.log( `index: ${ index }` );
		} );
	};

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
						const createPanel = createBlock(
							panelBlockName,
							{
								panelId: `panel-${ contents.length + 1 }`,
								ariaLabelledby: `tab-${ contents.length + 1 }`,
								ariaExpanded: contents.length === currentTab,
								ariaHidden: contents.length !== currentTab,
							},
							[
								createBlock( 'core/paragraph', {
									content: __(
										'Tab Content',
										'chiilog-iapi-tabs'
									),
								} ),
							]
						);
						insertBlocks( createPanel, contents.length, clientId );

						// デバッグ用
						setTimeout(
							() => updatePanelsVisibility( contents.length ),
							10000
						);
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
						<div
							key={ `nav-${ index }` }
							className="flex flex-col gap-1 flex-auto"
						>
							{ currentTab === index ? (
								<>
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
											setCurrentTab( 0 );
										} }
									/>
								</>
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
			<div { ...innerBlocksProps } />
		</div>
	);
}
