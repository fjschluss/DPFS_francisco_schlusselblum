(function () {
    'use strict';

    const form = document.getElementById('register-form');
    if (!form) return;

    const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp)$/i;

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

    // Validación en tiempo real (blur)
    document.getElementById('firstName').addEventListener('blur', function () {
        clearError('firstName');
        if (!this.value.trim()) return showError('firstName', 'El nombre es obligatorio.');
        if (this.value.trim().length < 2) showError('firstName', 'Mínimo 2 caracteres.');
    });

    document.getElementById('lastName').addEventListener('blur', function () {
        clearError('lastName');
        if (!this.value.trim()) return showError('lastName', 'El apellido es obligatorio.');
        if (this.value.trim().length < 2) showError('lastName', 'Mínimo 2 caracteres.');
    });

    document.getElementById('email').addEventListener('blur', function () {
        clearError('email');
        if (!this.value.trim()) return showError('email', 'El correo es obligatorio.');
        if (!isValidEmail(this.value)) showError('email', 'El formato del correo no es válido.');
    });

    document.getElementById('password').addEventListener('blur', function () {
        clearError('password');
        if (!this.value) return showError('password', 'La contraseña es obligatoria.');
        if (this.value.length < 8) showError('password', 'Mínimo 8 caracteres.');
    });

    document.getElementById('password2').addEventListener('blur', function () {
        clearError('password2');
        const pw = document.getElementById('password').value;
        if (!this.value) return showError('password2', 'Repetí la contraseña.');
        if (this.value !== pw) showError('password2', 'Las contraseñas no coinciden.');
    });

    document.getElementById('image').addEventListener('change', function () {
        clearError('image');
        if (this.files.length === 0) return;
        if (!ALLOWED_EXTENSIONS.test(this.files[0].name)) {
            showError('image', 'Solo se aceptan JPG, JPEG, PNG, GIF o WEBP.');
            this.value = '';
        }
    });

    // Validación al submit
    form.addEventListener('submit', function (e) {
        let valid = true;

        const firstName  = document.getElementById('firstName').value.trim();
        const lastName   = document.getElementById('lastName').value.trim();
        const email      = document.getElementById('email').value.trim();
        const password   = document.getElementById('password').value;
        const password2  = document.getElementById('password2').value;
        const imageInput = document.getElementById('image');

        ['firstName','lastName','email','password','password2','image'].forEach(clearError);

        if (!firstName)                  { showError('firstName', 'El nombre es obligatorio.');        valid = false; }
        else if (firstName.length < 2)   { showError('firstName', 'Mínimo 2 caracteres.');             valid = false; }

        if (!lastName)                   { showError('lastName', 'El apellido es obligatorio.');       valid = false; }
        else if (lastName.length < 2)    { showError('lastName', 'Mínimo 2 caracteres.');              valid = false; }

        if (!email)                      { showError('email', 'El correo es obligatorio.');            valid = false; }
        else if (!isValidEmail(email))   { showError('email', 'El formato del correo no es válido.'); valid = false; }

        if (!password)                   { showError('password', 'La contraseña es obligatoria.');     valid = false; }
        else if (password.length < 8)    { showError('password', 'Mínimo 8 caracteres.');              valid = false; }

        if (!password2)                  { showError('password2', 'Repetí la contraseña.');            valid = false; }
        else if (password !== password2) { showError('password2', 'Las contraseñas no coinciden.');    valid = false; }

        if (imageInput.files.length > 0 && !ALLOWED_EXTENSIONS.test(imageInput.files[0].name)) {
            showError('image', 'Solo se aceptan JPG, JPEG, PNG, GIF o WEBP.');
            valid = false;
        }

        if (!valid) e.preventDefault();
    });

}());