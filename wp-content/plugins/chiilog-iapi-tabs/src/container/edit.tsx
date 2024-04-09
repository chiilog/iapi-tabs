import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
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

	// インナーブロックの設定まわり
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

	/**
	 * 2回目以降のblocks追加でうまくblocksが取得できないため、
	 * blocksが更新されたタイミングでパネルの表示を更新する
	 */
	useEffect( () => {
		if ( blocks.length > 0 ) {
			updatePanelsVisibility( currentTab );
		}
	}, [ blocks ] );

	/**
	 * タブのナビアイテムを追加する
	 */
	const addNavItem = () => {
		setAttributes( {
			contents: [ ...contents, defaultContents ],
		} );
	};

	/**
	 * タブのナビアイテムを削除する
	 */
	const removeNavItem = ( index: number ) => {
		const newContents = [ ...contents ];
		newContents.splice( index, 1 );
		setAttributes( {
			contents: newContents,
		} );
	};

	/**
	 * タブのパネルを追加する
	 */
	const addNavPanel = ( index: number ) => {
		const createPanel = createBlock(
			panelBlockName,
			{
				panelId: `panel-${ index + 1 }`,
				ariaLabelledby: `tab-${ index + 1 }`,
				ariaExpanded: index === currentTab,
				ariaHidden: index !== currentTab,
			},
			[
				createBlock( 'core/paragraph', {
					content: __(
						`Tab Content : ${ index }`,
						'chiilog-iapi-tabs'
					),
				} ),
			]
		);
		insertBlocks( createPanel, index, clientId );
	};

	/**
	 * タブのパネルのカレントを更新する
	 */
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
						addNavItem();
						setCurrentTab( contents.length );
						addNavPanel( contents.length );
						updatePanelsVisibility( contents.length );
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
											removeNavItem( index );
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
									updatePanelsVisibility( index );
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
