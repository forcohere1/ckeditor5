import {
    DecoupledEditor,
    AccessibilityHelp,
    Autosave,
    BlockToolbar,
    Essentials,
    Paragraph,
    SelectAll,
    SpecialCharacters,
    Undo
} from 'ckeditor5';

const editorConfig = {
    toolbar: {
        // Expanded toolbar items to support more HTML elements
        items: [
            'undo', 
            'redo',
            '|',
        ],
        shouldNotGroupWhenFull: false
    },
    plugins: [
        AccessibilityHelp,
        Autosave,
        BlockToolbar,
        Essentials,
        Paragraph,
        SelectAll,
        SpecialCharacters,
        Undo
    ],
    blockToolbar: [],
    menuBar: {
        isVisible: true
    },
    placeholder: 'Type or paste your content here!',
    initialData: '<table style="font-size: 12px;" class="ck-table-resized"><colgroup><col style="width:5.69%;"><col style="width:5.69%;"><col style="width:23.53%;"><col style="width:53.71%;"><col style="width:5.69%;"><col style="width:5.69%;"></colgroup><thead><tr><th>Sr.</th><th>V.T</th><th>Granth</th><th>ShastraPath</th><th>Pub. Rem</th><th>In. Rem</th></tr></thead><tbody><tr><td>1</td><td>स्व.</td><td></td><td></td><td></td><td></td></tr></tbody></table>',
    autosave: {
        save(editor) {
            const editorData = editor.getData();
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
    const tabs = Array.from(document.querySelectorAll('.tab')).map(tab => ({
        id: tab.getAttribute('data-tab-id'),
        name: tab.querySelector('.tab-name').textContent,
        content: localStorage.getItem(`${localStoragePrefix}${tab.getAttribute('data-tab-id')}`) // Save content reference
    }));
    
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

    // Initialize content
    if (content !== null) {
        localStorage.setItem(`${localStoragePrefix}${tabId}`, content);
    } else if (!localStorage.getItem(`${localStoragePrefix}${tabId}`)) {
        localStorage.setItem(`${localStoragePrefix}${tabId}`, '');
    }

    switchToTab(tabId, editor);
    saveTabsState();
}

function switchToTab(tabId, editor) {
    if (activeTab === tabId) return;

    // Save current tab content before switching
    if (activeTab) {
        const currentContent = editor.getData();
        localStorage.setItem(`${localStoragePrefix}${activeTab}`, currentContent);
        saveTabsState(); // Save state after content update
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
    if (!tabElement) return;

    const tabNumber = parseInt(tabId.split('_')[1], 10);
    const remainingTabs = document.querySelectorAll('.tab');
    
    if (remainingTabs.length <= 1) {
        alert('At least one tab must remain.');
        return;
    }

    if (!confirm('Are you sure you want to close this tab?')) {
        return;
    }

    // Save current content before closing
    if (activeTab === tabId) {
        const currentContent = editor.getData();
        localStorage.setItem(`${localStoragePrefix}${tabId}`, currentContent);
    }

    tabElement.remove();
    usedTabNumbers.delete(tabNumber);
    localStorage.removeItem(`${localStoragePrefix}${tabId}`);

    if (activeTab === tabId) {
        const nextTab = document.querySelector('.tab');
        if (nextTab) {
            switchToTab(nextTab.getAttribute('data-tab-id'), editor);
        } else {
            activeTab = null;
            editor.setData('');
        }
    }

    saveTabsState();
}

function restoreTabs(editor) {
    // Clear existing tabs
    Array.from(document.querySelectorAll('.tab')).forEach(tab => tab.remove());
    usedTabNumbers.clear();

    const savedState = localStorage.getItem(tabsStateKey);
    if (savedState) {
        const { tabs, activeTab: savedActiveTab } = JSON.parse(savedState);
        
        // Restore all tabs with their content
        tabs.forEach(tab => {
            createNewTab(editor, tab.name, tab.id, tab.content);
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
            const currentContent = editor.getData();
            localStorage.setItem(`${localStoragePrefix}${activeTab}`, currentContent);
            saveTabsState();
        }
    });

    cleanupOrphanedTabs();
    restoreTabs(editor);

    return editor;
});