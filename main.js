import {
	DecoupledEditor,
	AccessibilityHelp,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Autosave,
	BlockQuote,
	BlockToolbar,
	Bold,
	Code,
	CodeBlock,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	HtmlComment,
	HtmlEmbed,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	Markdown,
	MediaEmbed,
	Mention,
	Minimap,
	PageBreak,
	Paragraph,
	PasteFromMarkdownExperimental,
	PasteFromOffice,
	RemoveFormat,
	SelectAll,
	ShowBlocks,
	SimpleUploadAdapter,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Style,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextPartLanguage,
	TextTransformation,
	Title,
	TodoList,
	Underline,
	Undo
} from 'ckeditor5';

const editorConfig = {
	toolbar: {
		items: [
			'undo',
			'redo',
			'|',
			'showBlocks',
			'|',
			// 'heading',
			'style',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'link',
			'insertImage',
			'insertTable',
			'highlight',
			'blockQuote',
			'codeBlock',
			'|',
			'alignment',
			'|',
			'bulletedList',
			'numberedList',
			'todoList',
			'outdent',
			'indent'
		],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		AccessibilityHelp,
		Alignment,
		Autoformat,
		AutoImage,
		AutoLink,
		Autosave,
		BlockQuote,
		BlockToolbar,
		Bold,
		Code,
		CodeBlock,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		// Heading,
		Highlight,
		HorizontalLine,
		HtmlComment,
		HtmlEmbed,
		ImageBlock,
		ImageCaption,
		ImageInline,
		ImageInsert,
		ImageInsertViaUrl,
		ImageResize,
		ImageStyle,
		ImageTextAlternative,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		Link,
		LinkImage,
		List,
		ListProperties,
		Markdown,
		MediaEmbed,
		Mention,
		Minimap,
		PageBreak,
		Paragraph,
		PasteFromMarkdownExperimental,
		PasteFromOffice,
		RemoveFormat,
		SelectAll,
		ShowBlocks,
		SimpleUploadAdapter,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersLatin,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		Strikethrough,
		Style,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextPartLanguage,
		TextTransformation,
		// Title,
		TodoList,
		Underline,
		Undo
	],
	blockToolbar: [
		'fontSize',
		'fontColor',
		'fontBackgroundColor',
		'|',
		'bold',
		'italic',
		'|',
		'link',
		'insertImage',
		'insertTable',
		'|',
		'bulletedList',
		'numberedList',
		'outdent',
		'indent'
	],
	fontFamily: {
		supportAllValues: true
	},
	fontSize: {
		options: [10, 12, 14, 'default', 18, 20, 22],
		supportAllValues: true
	},
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading1',
				view: 'h1',
				title: 'Heading 1',
				class: 'ck-heading_heading1'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			},
			{
				model: 'heading5',
				view: 'h5',
				title: 'Heading 5',
				class: 'ck-heading_heading5'
			},
			{
				model: 'heading6',
				view: 'h6',
				title: 'Heading 6',
				class: 'ck-heading_heading6'
			}
		]
	},
	htmlSupport: {
		allow: [
			{
				name: /^.*$/,
				styles: true,
				attributes: true,
				classes: true
			}
		]
	},
	image: {
		toolbar: [
			'toggleImageCaption',
			'imageTextAlternative',
			'|',
			'imageStyle:inline',
			'imageStyle:wrapText',
			'imageStyle:breakText',
			'|',
			'resizeImage'
		]
	},
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	list: {
		properties: {
			styles: true,
			startIndex: true,
			reversed: true
		}
	},
	mention: {
		feeds: [
			{
				marker: '@',
				feed: [
					/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
				]
			}
		]
	},
	menuBar: {
		isVisible: true
	},
	minimap: {
		container: document.querySelector('#editor-minimap'),
		extraClasses: 'editor-container_include-minimap ck-minimap__iframe-content'
	},
	// placeholder: 'Type or paste your content here!',
	style: {
		definitions: [
			{
				name: 'Article category',
				element: 'h3',
				classes: ['category']
			},
			{
				name: 'Title',
				element: 'h2',
				classes: ['document-title']
			},
			{
				name: 'Subtitle',
				element: 'h3',
				classes: ['document-subtitle']
			},
			{
				name: 'Info box',
				element: 'p',
				classes: ['info-box']
			},
			{
				name: 'Side quote',
				element: 'blockquote',
				classes: ['side-quote']
			},
			{
				name: 'Marker',
				element: 'span',
				classes: ['marker']
			},
			{
				name: 'Spoiler',
				element: 'span',
				classes: ['spoiler']
			},
			{
				name: 'Code (dark)',
				element: 'pre',
				classes: ['fancy-code', 'fancy-code-dark']
			},
			{
				name: 'Code (bright)',
				element: 'pre',
				classes: ['fancy-code', 'fancy-code-bright']
			}
		]
	},
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
	},
    autosave: {
        save(editor) {
            const editorData = document.getElementById('editor').innerHTML;
            if (activeTab) {
                localStorage.setItem(`${localStoragePrefix}${activeTab}`, editorData);
                console.log(`Content saved for ${activeTab}`);
            }
            return Promise.resolve();
        },
    }
};

let activeTab = null;
const localStoragePrefix = 'editorTab_';
const tabsStateKey = 'editorTabsState';
const editorTabs = document.getElementById('editor-tabs');
let usedTabNumbers = new Set();

const autosave = {
    save(editor) {
        const editorData = document.getElementById('editor').innerHTML;
        if (activeTab) {
            localStorage.setItem(`${localStoragePrefix}${activeTab}`, editorData);
            console.log(`Content saved for ${activeTab}`);
        }
        return Promise.resolve();
    }
};

function cleanupOrphanedTabs() {
    const state = JSON.parse(localStorage.getItem(tabsStateKey) || '{"tabs":[]}');
    const validTabIds = new Set(state.tabs.map(tab => tab.id));

    // Get all localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(localStoragePrefix)) {
            const tabId = key.replace(localStoragePrefix, '');
            if (!validTabIds.has(tabId)) {
                localStorage.removeItem(key);
            }
        }
    }
}

function saveTabsState() {
    const tabs = Array.from(document.querySelectorAll('.tab')).map(tab => {
        const tabId = tab.getAttribute('data-tab-id');
        return {
            id: tabId,
            name: tab.querySelector('.tab-name').textContent
            // Removed content field to reduce redundancy
        };
    });
    
    const state = {
        tabs,
        activeTab
    };
    
    localStorage.setItem(tabsStateKey, JSON.stringify(state));
}

function createNewTab(editor, name = null, tabId = null, content = null) {
    if (!tabId) {
        let tabNumber = 1;
        while (usedTabNumbers.has(tabNumber)) {
            tabNumber++;
        }
        tabId = `tab_${tabNumber}`;
        usedTabNumbers.add(tabNumber);
    } else {
        const tabNumber = parseInt(tabId.split('_')[1], 10);
        usedTabNumbers.add(tabNumber);
    }

    if (document.querySelector(`[data-tab-id="${tabId}"]`)) {
        console.warn(`Tab ${tabId} already exists, skipping creation`);
        return;
    }

    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.setAttribute('data-tab-id', tabId);

    newTab.innerHTML = `
        <span class="tab-name">${name || `Tab ${tabId.split('_')[1]}`}</span>
        <button class="close-tab">x</button>
    `;

    editorTabs.insertBefore(newTab, document.getElementById('add-tab'));

    // Default table content
    const defaultContent = `<table style="font-size: 12px;" class="ck-table-resized"><colgroup><col style="width:5.69%;"><col style="width:5.69%;"><col style="width:23.53%;"><col style="width:53.71%;"><col style="width:5.69%;"><col style="width:5.69%;"></colgroup><thead><tr><th>Sr.</th><th>V.T</th><th>Granth</th><th>ShastraPath</th><th>Pub. Rem</th><th>In. Rem</th></tr></thead><tbody><tr><td>1</td><td>स्व.</td><td>&#8203;</td><td>&#8203;</td><td>&#8203;</td><td>&#8203;</td></tr></tbody></table>`;

    // Initialize content
    if (content !== null) {
        localStorage.setItem(`${localStoragePrefix}${tabId}`, content);
    } else if (!localStorage.getItem(`${localStoragePrefix}${tabId}`)) {
        localStorage.setItem(`${localStoragePrefix}${tabId}`, defaultContent);
    }

    switchToTab(tabId, editor);
    saveTabsState();
}

function switchToTab(tabId, editor) {
    if (activeTab && document.querySelector(`[data-tab-id="${activeTab}"]`)) {
        const currentContent = document.getElementById('editor').innerHTML;
        localStorage.setItem(`${localStoragePrefix}${activeTab}`, currentContent);
    }

    const tabContent = localStorage.getItem(`${localStoragePrefix}${tabId}`);
    editor.setData(tabContent || '');
    
    activeTab = tabId;

    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active-tab');
    });
    
    const activeTabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (activeTabElement) {
        activeTabElement.classList.add('active-tab');
    }

    saveTabsState();
}

function closeTab(tabId, editor) {
    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (!tabElement) {
        return;
    }

    const remainingTabs = document.querySelectorAll('.tab');
    
    if (remainingTabs.length <= 1) {
        alert('At least one tab must remain.');
        return;
    }

    if (!confirm('Are you sure you want to close this tab?')) {
        return;
    }

    // First, remove from localStorage before any other operations
    localStorage.removeItem(`${localStoragePrefix}${tabId}`);

    // Then update the tabs state
    const state = JSON.parse(localStorage.getItem(tabsStateKey) || '{"tabs":[]}');
    state.tabs = state.tabs.filter(tab => tab.id !== tabId);
    
    // If this was the active tab, clear it from the state
    if (state.activeTab === tabId) {
        state.activeTab = null;
    }
    
    localStorage.setItem(tabsStateKey, JSON.stringify(state));

    // Remove the tab number from used numbers set
    const tabNumber = parseInt(tabId.split('_')[1], 10);
    usedTabNumbers.delete(tabNumber);

    // Remove the DOM element
    tabElement.remove();

    // Handle active tab switching
    if (activeTab === tabId) {
        const nextTab = document.querySelector('.tab');
        if (nextTab) {
            const nextTabId = nextTab.getAttribute('data-tab-id');
            // Don't save the current tab's content since we're closing it
            activeTab = null; // Clear active tab before switching
            switchToTab(nextTabId, editor);
        } else {
            activeTab = null;
            editor.setData('');
        }
    }
}

function restoreTabs(editor) {
    // Clear existing tabs
    Array.from(document.querySelectorAll('.tab')).forEach(tab => tab.remove());
    usedTabNumbers.clear();

    const savedState = localStorage.getItem(tabsStateKey);
    if (savedState) {
        const { tabs, activeTab: savedActiveTab } = JSON.parse(savedState);
        
        // Restore all tabs
        tabs.forEach(tab => {
            // Only pass name and id, content will be retrieved from localStorage
            createNewTab(editor, tab.name, tab.id);
        });

        // Switch to the previously active tab
        if (savedActiveTab && document.querySelector(`[data-tab-id="${savedActiveTab}"]`)) {
            switchToTab(savedActiveTab, editor);
        } else if (tabs.length > 0) {
            switchToTab(tabs[0].id, editor);
        }
    } else {
        createNewTab(editor);
    }
}

// Initialize editor
DecoupledEditor.create(document.querySelector('#editor'), editorConfig).then(editor => {
    
    document.querySelector('#editor-toolbar').appendChild(editor.ui.view.toolbar.element);
    document.querySelector('#editor-menu-bar').appendChild(editor.ui.view.menuBarView.element);

    document.getElementById('add-tab').addEventListener('click', () => createNewTab(editor));

    editorTabs.addEventListener('click', event => {
        const tab = event.target.closest('.tab');
        if (tab) {
            const tabId = tab.getAttribute('data-tab-id');
            if (event.target.classList.contains('close-tab')) {
                closeTab(tabId, editor);
            } else {
                switchToTab(tabId, editor);
            }
        }
    });

    // Add window beforeunload handler to save content
    window.addEventListener('beforeunload', () => {
        if (activeTab) {
            const currentContent = document.getElementById('editor').innerHTML;
            localStorage.setItem(`${localStoragePrefix}${activeTab}`, currentContent);
            saveTabsState();
        }
    });

    cleanupOrphanedTabs();
    restoreTabs(editor);

    return editor;
});