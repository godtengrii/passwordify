document.addEventListener('DOMContentLoaded', () => {
    const lengthInput = document.getElementById('length');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSpecial = document.getElementById('include-special');
    const includeEmoji = document.getElementById('include-emoji');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const passwordOutput = document.getElementById('password-output');
    const saveButton = document.getElementById('save-password');
    const viewButton = document.getElementById('view-passwords');

    function generatePassword() {
        const length = parseInt(lengthInput.value, 10);
        const numbers = includeNumbers.checked;
        const special = includeSpecial.checked;
        const emojis = includeEmoji.checked;
        const uppercase = includeUppercase.checked;
        const lowercase = includeLowercase.checked;
        
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const num = '0123456789';
        const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
        const emojiChars = '😀😁😂🤣😃😄😅😆😉😊😎😍😘🥰😗😙😚';

        let characters = '';
        if (lowercase) characters += lower;
        if (uppercase) characters += upper;
        if (numbers) characters += num;
        if (special) characters += specialChars;
        if (emojis) characters += emojiChars;

        if (characters === '') {
            alert('Select at least one character type.');
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        passwordOutput.value = password;
    }

    function savePassword() {
        const password = passwordOutput.value;
        if (!password) {
            alert('Generate a password first.');
            return;
        }

        const name = prompt('Enter a name for this password (or leave empty for "Unnamed password"):') || 'Unnamed password';

        chrome.storage.local.get('savedPasswords', (data) => {
            const savedPasswords = data.savedPasswords || [];
            savedPasswords.push({ name, password });
            chrome.storage.local.set({ savedPasswords });
            alert('Password saved successfully!');
        });
    }

    function viewPasswords() {
        chrome.tabs.create({ url: 'passwords.html' });
    }

    document.getElementById('generate').addEventListener('click', generatePassword);
    saveButton.addEventListener('click', savePassword);
    viewButton.addEventListener('click', viewPasswords);
});
