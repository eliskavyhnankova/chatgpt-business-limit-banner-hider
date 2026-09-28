(() => {
  "use strict";

  const SETTING = "hideMemberLimitBanner";
  const MARKER = "data-local-credit-banner-hider";
  const CONTROL_SELECTOR = 'button, [role="button"], a[href]';
  const BANNER_SELECTOR = 'aside[role="status"]';

  // Match all three pieces of the specific Czech prompt. No generated classes.
  const TITLE = "Člen pracovního prostoru dosáhl limitu";
  const MESSAGE =
    "Zapni automatické dobíjení, aby se kredity automaticky doplňovaly a nedocházelo k dalším přerušením.";
  const ACTION = "Zapnout automatické dobíjení";

  const hidden = new Set();
  let enabled = false;
  let scanQueued = false;
  let settingChanged = false;

  const normalize = (value) => (value || "").replace(/\s+/gu, " ").trim();

  function hasAllText(root) {
    const text = normalize(root.textContent);
    const controls = [...root.querySelectorAll(CONTROL_SELECTOR)];
    return (
      text.includes(TITLE) &&
      text.includes(MESSAGE) &&
      controls.length === 1 &&
      normalize(controls[0].textContent) === ACTION
    );
  }

  function isSafeBannerRoot(root) {
    const text = normalize(root.textContent);
    if (text.length > 400 || root.querySelectorAll("*").length > 30) return false;

    // The current ChatGPT banner is an aside with status semantics.
    // Never hide a region that contains an editor or another page section.
    if (
      !root.matches(BANNER_SELECTOR) ||
      root.querySelector(
        'main, nav, aside, footer, dialog, form, input, textarea, select, [contenteditable], [role="main"], [role="navigation"], [role="dialog"]'
      )
    ) {
      return false;
    }

    // The observed banner is a compact, wide block at the top of ChatGPT.
    const box = root.getBoundingClientRect();
    return (
      box.width >= Math.min(320, window.innerWidth * 0.5) &&
      box.height >= 20 &&
      box.height <= 300 &&
      box.top >= -10 &&
      box.top <= Math.min(300, window.innerHeight * 0.5)
    );
  }

  function restoreAll() {
    for (const root of hidden) root.removeAttribute(MARKER);
    hidden.clear();
  }

  function scan() {
    scanQueued = false;
    if (!enabled) return;

    // If ChatGPT reuses a marked node for different content, reveal it again.
    for (const root of hidden) {
      if (!root.isConnected || !hasAllText(root)) {
        root.removeAttribute(MARKER);
        hidden.delete(root);
      }
    }

    for (const root of document.querySelectorAll(BANNER_SELECTOR)) {
      if (hidden.has(root) || !hasAllText(root) || !isSafeBannerRoot(root)) continue;
      root.setAttribute(MARKER, "1");
      hidden.add(root);
    }
  }

  function queueScan() {
    if (!enabled || scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(scan);
  }

  function applySetting(value) {
    enabled = value !== false;
    if (enabled) queueScan();
    else restoreAll();
  }

  const observer = new MutationObserver(queueScan);
  observer.observe(document, {
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class", "style", "hidden", "aria-hidden"],
    subtree: true
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes[SETTING]) return;
    settingChanged = true;
    applySetting(changes[SETTING].newValue);
  });

  chrome.storage.local.get({ [SETTING]: true }).then((settings) => {
    if (!settingChanged) applySetting(settings[SETTING]);
  });
})();
