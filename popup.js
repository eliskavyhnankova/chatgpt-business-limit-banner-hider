"use strict";

const SETTING = "hideMemberLimitBanner";
const checkbox = document.getElementById("enabled");
const status = document.getElementById("status");

chrome.storage.local.get({ [SETTING]: true }).then(
  (settings) => {
    checkbox.checked = settings[SETTING] !== false;
    checkbox.disabled = false;
  },
  () => {
    status.textContent = "Nastavení se nepodařilo načíst.";
  }
);

checkbox.addEventListener("change", async () => {
  checkbox.disabled = true;
  status.textContent = "";
  try {
    await chrome.storage.local.set({ [SETTING]: checkbox.checked });
  } catch {
    checkbox.checked = !checkbox.checked;
    status.textContent = "Nastavení se nepodařilo uložit.";
  } finally {
    checkbox.disabled = false;
  }
});
