# Skrytí banneru limitu v ChatGPT Business

Malé rozšíření pro Chrome, které v prohlížeči skryje banner o dosažení limitu člena pracovního prostoru. Ten v současnosti nelze skrýt a ani v nastavení upravit, aby se nezobrazoval. 

## Jak funguje

Rozšíření hledá prvek `<aside role="status">`, který současně obsahuje:

- nadpis „Člen pracovního prostoru dosáhl limitu“;
- text „Zapni automatické dobíjení, aby se kredity automaticky doplňovaly a nedocházelo k dalším přerušením.“;
- tlačítko „Zapnout automatické dobíjení“.

Funguje na české texty, ale v případě potřeby si ho určitě zvládnete upravit pro jiné jazykové verze. Před skrytím ověřuje také velikost, umístění a strukturu prvku. Skrývá celé upozornění, aby po něm nezůstalo prázdné místo. Nepoužívá proměnlivé CSS třídy ChatGPT. Sleduje změny stránky, takže zachytí i banner vložený po načtení. Pokud ChatGPT změní text nebo strukturu upozornění, rozšíření jej raději ponechá viditelné.

## Instalace v Chrome

1. Stáhněte repozitář, rozbalte jej a ponechte složku na trvalém místě. Soubor `manifest.json` musí být přímo v této složce.
2. V Chrome otevřete `chrome://extensions`.
3. Zapněte **Režim pro vývojáře**.
4. Klikněte na **Načíst rozbalené** a vyberte složku obsahující `manifest.json`.
5. Znovu načtěte otevřenou kartu `chatgpt.com`. Skrývání je ve výchozím stavu zapnuté.
6. Pokud chcete mít přepínač po ruce, připněte ikonu rozšíření na panel Chrome.

## Zapnutí a vypnutí

Klikněte na ikonu rozšíření a přepněte **Skrývat banner limitu**. Změna se projeví v otevřených kartách bez opětovného načtení stránky. Vypnutí znovu zobrazí prvky, které rozšíření skrylo. Nastavení zůstane uloženo i po restartu Chrome.

Rozšíření odstraníte na `chrome://extensions` tlačítkem **Odebrat**. Na téže stránce jej můžete také pouze vypnout.

## Soukromí a rozsah

Rozšíření běží pouze na `https://chatgpt.com/*`. Neposílá data po síti, neshromažďuje analytiku a nekliká na tlačítko automatického dobíjení. Čte jen strukturu stránky a vlastní nastavení uložené v `chrome.storage.local`. Nejde o oficiální rozšíření společnosti OpenAI.

## Soubory

- `manifest.json` – nastavení rozšíření ve formátu Manifest V3.
- `content.js` – detekce banneru, sledování změn stránky a reakce na přepínač.
- `content.css` – skrytí pouze prvku označeného detekčním skriptem.
- `popup.html`, `popup.css`, `popup.js` – okno s přepínačem.

## Licence

Kód je dostupný pod licencí MIT. Můžete jej používat, upravovat a šířit, včetně komerčního použití. Při dalším šíření ponechte oznámení o autorství a licenční text. Úplné podmínky jsou v souboru `LICENSE`, jehož standardní znění je anglicky.

## Když banner zůstane viditelný

Ověřte, že je zapnutý přepínač a že jste po instalaci znovu načetli kartu ChatGPT. Rozšíření rozpoznává pouze výše uvedené české znění. Pokud ChatGPT změnil text nebo strukturu banneru, upravte hodnoty `TITLE`, `MESSAGE` a `ACTION` nebo podmínky v `isSafeBannerRoot` v souboru `content.js`. Potom rozšíření na `chrome://extensions` znovu načtěte a obnovte kartu ChatGPT.
