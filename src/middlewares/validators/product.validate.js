// src/public/js/product.validate.js
(function () {
    'use strict';

    const form = document.getElementById('product-form');
    if (!form) return;

    const ALLOWED_EXTENSIONS = /\.(jpg|jpeg|png|gif)$/i;

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

    // Validación en tiempo real (blur)
    document.getElementById('name').addEventListener('blur', function () {
        clearError('name');
        if (!this.value.trim())           return showError('name', 'El nombre es obligatorio.');
        if (this.value.trim().length < 5) showError('name', 'Mínimo 5 caracteres.');
    });

    document.getElementById('description').addEventListener('blur', function () {
        clearError('description');
        if (!this.value.trim())            return showError('description', 'La descripción es obligatoria.');
        if (this.value.trim().length < 20) showError('description', 'Mínimo 20 caracteres.');
    });

    document.getElementById('price').addEventListener('blur', function () {
        clearError('price');
        if (!this.value)                                      return showError('price', 'El precio es obligatorio.');
        if (isNaN(this.value) || parseFloat(this.value) < 0) showError('price', 'Ingresá un precio válido.');
    });

    const imageEl = document.getElementById('image');
    if (imageEl) {
        imageEl.addEventListener('blur', function () {
            clearError('image');
            if (this.value && !ALLOWED_EXTENSIONS.test(this.value)) {
                showError('image', 'La imagen debe ser JPG, JPEG, PNG o GIF.');
            }
        });
    }

    // Validación al submit
    form.addEventListener('submit', function (e) {
        let valid = true;

        const name        = document.getElementById('name').value.trim();
        const description = document.getElementById('description').value.trim();
        const price       = document.getElementById('price').value;

        ['name', 'description', 'price', 'image'].forEach(clearError);

        if (!name)                 { showError('name', 'El nombre es obligatorio.');        valid = false; }
        else if (name.length < 5)  { showError('name', 'Mínimo 5 caracteres.');             valid = false; }

        if (!description)                 { showError('description', 'La descripción es obligatoria.'); valid = false; }
        else if (description.length < 20) { showError('description', 'Mínimo 20 caracteres.');          valid = false; }

        if (!price)                                       { showError('price', 'El precio es obligatorio.'); valid = false; }
        else if (isNaN(price) || parseFloat(price) < 0)  { showError('price', 'Ingresá un precio válido.'); valid = false; }

        if (imageEl && imageEl.value && !ALLOWED_EXTENSIONS.test(imageEl.value)) {
            showError('image', 'La imagen debe ser JPG, JPEG, PNG o GIF.');
            valid = false;
        }

        if (!valid) e.preventDefault();
    });

}());