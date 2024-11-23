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
        items: ['undo', 'redo'],
        shouldNotGroupWhenFull: false
    },
    plugins: [AccessibilityHelp, Autosave, BlockToolbar, Essentials, Paragraph, SelectAll, SpecialCharacters, Undo],
    blockToolbar: [],
    menuBar: {
        isVisible: true
    },
    placeholder: 'Type or paste your content here!',
    autosave: {
        save(editor) {
            // Save the content dynamically to the active tab's local storage
            const editorData = editor.getData();
            if (activeTab) {
                localStorage.setItem(`${localStoragePrefix}${activeTab}`, editorData);
                console.log(`Content saved for ${activeTab}`);
            }
            return Promise.resolve();
        }
    }
};

let activeTab = null;
let tabCounter = 0;
const localStoragePrefix = 'editorTab_';
const tabsStateKey = 'editorTabsState'; // Key to store tab metadata
const editorTabs = document.getElementById('editor-tabs');

// Function to save the tabs state
function saveTabsState() {
    const tabs = Array.from(document.querySelectorAll('.tab')).map(tab => ({
        id: tab.getAttribute('data-tab-id'),
        name: tab.querySelector('.tab-name').textContent
    }));
    const state = {
        tabs,
        activeTab
    };
    localStorage.setItem(tabsStateKey, JSON.stringify(state));
}

// Function to create a new tab
function createNewTab(editor, name = null, restore = false) {
    tabCounter++;
    const tabId = `tab_${tabCounter}`;
    const newTab = document.createElement('div');
    newTab.className = 'tab';
    newTab.setAttribute('data-tab-id', tabId);

    // Tab name and close button
    newTab.innerHTML = `
        <span class="tab-name">${name || `Tab ${tabCounter}`}</span>
        <button class="close-tab">x</button>
    `;

    // Insert before the "+" button
    editorTabs.insertBefore(newTab, document.getElementById('add-tab'));

    // Save empty initial data for new tab unless restoring
    if (!restore) {
        localStorage.setItem(`${localStoragePrefix}${tabId}`, "<p></p>");
    }

    switchToTab(tabId, editor);
    saveTabsState(); // Save the state after creating a tab
}

// Function to switch to a specific tab
function switchToTab(tabId, editor) {
    if (activeTab === tabId) return;

    // Save the current tab's content
    if (activeTab) {
        const currentContent = editor.getData();
        localStorage.setItem(`${localStoragePrefix}${activeTab}`, currentContent);
    }

    // Load the new tab's content
    const tabContent = localStorage.getItem(`${localStoragePrefix}${tabId}`);
    editor.setData(tabContent || "<p></p>");
    activeTab = tabId;

    // Update tab active state
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active-tab');
    });
    document.querySelector(`[data-tab-id="${tabId}"]`).classList.add('active-tab');

    saveTabsState(); // Save the state after switching tabs
}

// Function to close a tab
function closeTab(tabId, editor) {
    const tabElement = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (tabElement) {
        tabElement.remove();
        localStorage.removeItem(`${localStoragePrefix}${tabId}`);

        // If the closed tab is active, switch to the first available tab
        if (activeTab === tabId) {
            const remainingTabs = document.querySelectorAll('.tab');
            if (remainingTabs.length > 0) {
                const firstTabId = remainingTabs[0].getAttribute('data-tab-id');
                switchToTab(firstTabId, editor);
            } else {
                // No tabs left, clear editor
                activeTab = null;
                editor.setData("<p></p>");
            }
        }

        saveTabsState(); // Save the state after closing a tab
    }
}

// Restore tabs from saved state
function restoreTabs(editor) {
    const savedState = localStorage.getItem(tabsStateKey);
    if (savedState) {
        const { tabs, activeTab: savedActiveTab } = JSON.parse(savedState);
        tabs.forEach(tab => createNewTab(editor, tab.name, true));
        if (savedActiveTab) {
            switchToTab(savedActiveTab, editor);
        }
    } else {
        // If no state, initialize the first tab
        createNewTab(editor);
    }
}

// Initialize the editor
DecoupledEditor.create(document.querySelector('#editor'), editorConfig).then(editor => {
    document.querySelector('#editor-toolbar').appendChild(editor.ui.view.toolbar.element);
    document.querySelector('#editor-menu-bar').appendChild(editor.ui.view.menuBarView.element);

    // Handle Add Tab button click
    document.getElementById('add-tab').addEventListener('click', () => createNewTab(editor));

    // Handle tab clicks and close events
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

    // Restore tabs from saved state
    restoreTabs(editor);

    return editor;
});