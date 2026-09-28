# Lokální skrytí banneru limitu v ChatGPT

Local Manifest V3 Chrome extension that visually hides one specific Czech ChatGPT Business limit banner. It does not change usage limits, credits, billing, or server behavior.

Tato Manifest V3 extension skryje pouze český banner, který současně obsahuje:

- nadpis „Člen pracovního prostoru dosáhl limitu“;
- text „Zapni automatické dobíjení, aby se kredity automaticky doplňovaly a nedocházelo k dalším přerušením.“;
- tlačítko „Zapnout automatické dobíjení“.

Při přípravě byl banner v aktuálním rozhraní ChatGPT ověřen jako `<aside role="status">`. Extension vyžaduje právě tento prvek, přesné tři texty, jediné interaktivní tlačítko a kompaktní široký blok u horního okraje stránky. Skrývá celé `aside`, aby po něm nezůstalo prázdné místo. Nepoužívá CSS třídy ChatGPT. Když se text nebo struktura banneru změní, extension jej raději neskryje.

## Instalace v Chrome na macOS

1. Stáhněte repozitář a ponechte jeho složku na trvalém místě. Soubor `manifest.json` musí být přímo v této složce.
2. V Chrome otevřete `chrome://extensions`.
3. Zapněte **Developer mode / Režim pro vývojáře**.
4. Klikněte na **Load unpacked / Načíst rozbalené** a vyberte složku repozitáře obsahující `manifest.json`.
5. Znovu načtěte otevřenou kartu `chatgpt.com`. Extension je ve výchozím stavu zapnutá.
6. Volitelně připněte její ikonu přes nabídku rozšíření vpravo od adresního řádku.

## Zapnutí a vypnutí

Klikněte na ikonu extension a přepněte **Skrývat banner limitu**. Změna se projeví v již otevřených kartách bez reloadu. Vypnutí vrátí všechny prvky, které extension skryla. Nastavení zůstane uloženo po restartu Chrome.

Pro úplné odebrání otevřete `chrome://extensions` a u extension klikněte na **Remove / Odebrat**; případně ji tam jen vypněte.

## Soubory

- `manifest.json` – Manifest V3, oprávnění pouze pro lokální úložiště, content script jen na `https://chatgpt.com/*`.
- `content.js` – přesná detekce banneru, sledování dynamických změn DOM a reakce na přepínač.
- `content.css` – skrytí pouze prvků označených detekčním skriptem.
- `popup.html`, `popup.css`, `popup.js` – jednoduchý přepínač.

Extension nic neposílá po síti, nekliká na tlačítko, nezasahuje do limitů ani fakturace. Čte jen DOM dané stránky a své nastavení v `chrome.storage.local`.

## Když banner zůstane viditelný

Nejprve ověřte, že je zapnutý přepínač a že jste po instalaci znovu načetli kartu. Pokud ChatGPT změnil text, jazyk nebo strukturu banneru, je potřeba aktualizovat konstanty `TITLE`, `MESSAGE` a `ACTION` nebo podmínky v `isSafeBannerRoot` v souboru `content.js`. Po úpravě klikněte na **Reload / Znovu načíst** u extension na `chrome://extensions` a načtěte kartu ChatGPT znovu.
