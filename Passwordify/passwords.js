document.addEventListener('DOMContentLoaded', () => {
    const passwordList = document.getElementById('password-list').querySelector('ul');

    chrome.storage.local.get('savedPasswords', (data) => {
        const savedPasswords = data.savedPasswords || [];

        savedPasswords.forEach(passwordEntry => {
            const li = document.createElement('li');
            li.textContent = `${passwordEntry.name}: ${passwordEntry.password}`;
            passwordList.appendChild(li);
        });
    });
});
