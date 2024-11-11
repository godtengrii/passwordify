chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('masterPassword', (data) => {
      if (!data.masterPassword) {
        const password = prompt("Set a master password to protect your saved passwords:");
        if (password) {
          chrome.storage.local.set({ masterPassword: password });
        }
      }
    });
  });
  