/* Accessible tab widget — ARIA tabs pattern */
(function () {
  'use strict';

  function activateTab(tab, tabs) {
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = true;
    });
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    var activePanel = document.getElementById(tab.getAttribute('aria-controls'));
    if (activePanel) activePanel.hidden = false;
  }

  document.querySelectorAll('.code-example [role="tablist"]').forEach(function (tablist) {
    var tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activateTab(tab, tabs);
      });

      tab.addEventListener('keydown', function (e) {
        var index = tabs.indexOf(tab);
        var target = null;
        if (e.key === 'ArrowRight') {
          target = tabs[(index + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft') {
          target = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (e.key === 'Home') {
          target = tabs[0];
        } else if (e.key === 'End') {
          target = tabs[tabs.length - 1];
        }
        if (target) {
          e.preventDefault();
          activateTab(target, tabs);
          target.focus();
        }
      });
    });
  });
}());
