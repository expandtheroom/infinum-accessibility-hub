(function () {
  'use strict';

  document.querySelectorAll('.sidebar section').forEach(function (section) {
    var heading = section.querySelector('.sidebar-heading');
    var list = section.querySelector('ul');
    if (!heading || !list) return;

    // Give the list a stable ID for aria-controls
    if (!list.id) {
      list.id = 'sidebar-' + heading.textContent.trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Replace heading text with a toggle button
    var text = heading.textContent.trim();
    heading.textContent = '';

    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', list.id);
    button.className = 'sidebar-toggle';
    button.textContent = text;

    // Transfer aria-current from heading to button (e.g. Way of Working, Tools pages)
    var headingCurrent = heading.getAttribute('aria-current');
    if (headingCurrent) {
      button.setAttribute('aria-current', headingCurrent);
    }

    heading.appendChild(button);

    // Start collapsed, unless this section contains the current page or its heading is active
    var isActive = !!headingCurrent || !!list.querySelector('[aria-current="page"]');
    list.hidden = !isActive;
    button.setAttribute('aria-expanded', String(isActive));

    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      list.hidden = expanded;
    });
  });
}());
