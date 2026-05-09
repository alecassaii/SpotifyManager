# Spotify Family Plan Tracker

Webapp in formato **PWA (Progressive Web App)** progettata per centralizzare la gestione finanziaria e le scadenze di un abbonamento Spotify Family condiviso.

## Funzionalità Principali

* **Gestione Finanziaria Bifronte:** Monitoraggio separato del saldo reale sulla carta prepagata e del "budget virtuale" raccolto dai partecipanti.
* **Tracciamento Scadenze Membri:** Calcolo automatico delle date di scadenza per ogni singolo profilo basato sui mesi pagati.
* **Logica dei Flussi di Cassa:**
    * Registrazione delle quote dei membri nel budget.
    * Trasferimento fondi dal budget alla carta per ricariche fisiche.
    * Registrazione del rinnovo automatico dell'abbonamento con detrazione dal saldo carta.
* **Storico Operazioni:** Registro cronologico di tutti i movimenti (entrate, ricariche, rinnovi).
* **Supporto Offline:** Grazie al Service Worker, l'app funziona anche senza connessione internet dopo la prima installazione.

## Gestione dei Dati

* **Privacy Locale:** Tutti i dati sono salvati esclusivamente nel `localStorage` del browser dell'utente. Nessuna informazione viene inviata a server esterni.
* **Portabilità:** Sistema integrato di backup tramite esportazione e importazione di file JSON per trasferire i dati tra diversi dispositivi o browser.

## Componenti del Progetto

* **Interfaccia Utente:** Layout reattivo ottimizzato per l'uso mobile (Mobile-First), installabile come app nativa su iOS e Android.
* **PWA Core:** Configurazione tramite `manifest.json` e `sw.js` per garantire l'installazione sulla schermata Home e la gestione della cache.
* **Asset Visivi:** Icone dedicate per garantire una corretta visualizzazione su diverse densità di pixel e sistemi operativi.
