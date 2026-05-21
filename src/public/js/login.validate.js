
(function () {
    'use strict';

    const form = document.getElementById('login-form');
    if (!form) return;

    function showError(fieldId, message) {
        const field   = document.getElementById(fieldId);
        const errorEl = document.getElementById('error-' + fieldId);
        if (field)   field.classList.add('has-error');
        if (errorEl) errorEl.textContent = message;
    }

    function clearError(fieldId) {
        const field   = document.getElementById(fieldId);
        const errorEl = document.getElementById('error-' + fieldId);
        if (field)   field.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    document.getElementById('email').addEventListener('blur', function () {
        clearError('email');
        if (!this.value.trim()) return showError('email', 'El correo es obligatorio.');
        if (!isValidEmail(this.value)) showError('email', 'El formato del correo no es válido.');
    });

    document.getElementById('password').addEventListener('blur', function () {
        clearError('password');
        if (!this.value) showError('password', 'La contraseña es obligatoria.');
    });

    form.addEventListener('submit', function (e) {
        let valid = true;

        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        ['email', 'password'].forEach(clearError);

        if (!email)                    { showError('email', 'El correo es obligatorio.');            valid = false; }
        else if (!isValidEmail(email)) { showError('email', 'El formato del correo no es válido.'); valid = false; }

        if (!password) { showError('password', 'La contraseña es obligatoria.'); valid = false; }

        if (!valid) e.preventDefault();
    });

}());