// idioma.js
// Detecta el país del usuario y establece el idioma de la app.

const PAIS_A_IDIOMA = {
    // Español
    ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', CL: 'es',
    VE: 'es', EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es',
    HN: 'es', PY: 'es', SV: 'es', NI: 'es', CR: 'es', PA: 'es',
    UY: 'es', GQ: 'es',
    // Inglés
    GB: 'en', US: 'en', AU: 'en', CA: 'en', NZ: 'en', IE: 'en',
    ZA: 'en', SG: 'en', IN: 'en',
    // Francés
    FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr', SN: 'fr',
    CI: 'fr', CM: 'fr', MG: 'fr',
    // Alemán
    DE: 'de', AT: 'de',
    // Italiano
    IT: 'it', SM: 'it', VA: 'it',
    // Portugués
    PT: 'pt', BR: 'pt', AO: 'pt', MZ: 'pt',
    // Neerlandés
    NL: 'nl',
    // Japonés
    JP: 'ja',
    // Chino
    CN: 'zh', TW: 'zh', HK: 'zh',
};


// TABLA DE TRADUCCIONES


const TRADUCCIONES = {

    // index.html 
    bienvenido: {
        es: 'Bienvenido a la app de recetas ...',
        en: 'Welcome to the recipe app ...',
        fr: 'Bienvenue dans l\'application de recettes ...',
        de: 'Willkommen in der Rezept-App ...',
        it: 'Benvenuto nell\'app di ricette ...',
        pt: 'Bem-vindo ao aplicativo de receitas ...',
        nl: 'Welkom bij de recepten-app ...',
        ja: 'レシピアプリへようこそ ...',
        zh: '欢迎使用食谱应用 ...',
    },
    btn_empezar: {
        es: '✓ Empezar', en: '✓ Start', fr: '✓ Commencer',
        de: '✓ Starten', it: '✓ Inizia', pt: '✓ Começar',
        nl: '✓ Starten', ja: '✓ 開始', zh: '✓ 开始',
    },

    interaccion_1: {
        es: 'INTERACCIÓN 1', en: 'INTERACTION 1', fr: 'INTERACTION 1',
        de: 'INTERAKTION 1', it: 'INTERAZIONE 1', pt: 'INTERAÇÃO 1',
        nl: 'INTERACTIE 1', ja: 'インタラクション 1', zh: '交互 1',
    },
    interaccion_2: {
        es: 'INTERACCIÓN 2', en: 'INTERACTION 2', fr: 'INTERACTION 2',
        de: 'INTERAKTION 2', it: 'INTERAZIONE 2', pt: 'INTERAÇÃO 2',
        nl: 'INTERACTIE 2', ja: 'インタラクション 2', zh: '交互 2',
    },
    interaccion_3: {
        es: 'INTERACCIÓN 3', en: 'INTERACTION 3', fr: 'INTERACTION 3',
        de: 'INTERAKTION 3', it: 'INTERAZIONE 3', pt: 'INTERAÇÃO 3',
        nl: 'INTERACTIE 3', ja: 'インタラクション 3', zh: '交互 3',
    },
    interaccion_4: {
        es: 'INTERACCIÓN 4', en: 'INTERACTION 4', fr: 'INTERACTION 4',
        de: 'INTERAKTION 4', it: 'INTERAZIONE 4', pt: 'INTERAÇÃO 4',
        nl: 'INTERACTIE 4', ja: 'インタラクション 4', zh: '交互 4',
    },
    interaccion_5: {
        es: 'INTERACCIÓN 5', en: 'INTERACTION 5', fr: 'INTERACTION 5',
        de: 'INTERAKTION 5', it: 'INTERAZIONE 5', pt: 'INTERAÇÃO 5',
        nl: 'INTERACTIE 5', ja: 'インタラクション 5', zh: '交互 5',
    },
    interaccion_6: {
        es: 'INTERACCIÓN 6', en: 'INTERACTION 6', fr: 'INTERACTION 6',
        de: 'INTERAKTION 6', it: 'INTERAZIONE 6', pt: 'INTERAÇÃO 6',
        nl: 'INTERACTIE 6', ja: 'インタラクション 6', zh: '交互 6',
    },
    interaccion_7: {
        es: 'INTERACCIÓN 7', en: 'INTERACTION 7', fr: 'INTERACTION 7',
        de: 'INTERAKTION 7', it: 'INTERAZIONE 7', pt: 'INTERAÇÃO 7',
        nl: 'INTERACTIE 7', ja: 'インタラクション 7', zh: '交互 7',
    },
    interaccion_8: {
        es: 'INTERACCIÓN 8', en: 'INTERACTION 8', fr: 'INTERACTION 8',
        de: 'INTERAKTION 8', it: 'INTERAZIONE 8', pt: 'INTERAÇÃO 8',
        nl: 'INTERACTIE 8', ja: 'インタラクション 8', zh: '交互 8',
    },
    paso_explicado: {
        es: 'PASO EXPLICADO', en: 'EXPLAINED STEP', fr: 'ÉTAPE EXPLIQUÉE',
        de: 'ERKLÄRTER SCHRITT', it: 'PASSO SPIEGATO', pt: 'PASSO EXPLICADO',
        nl: 'UITGELEGD STAP', ja: 'ステップ説明', zh: '步骤说明',
    },
    
    // instrucciones.html 
    titulo_instrucciones: {
        es: 'INSTRUCCIONES DE INTERACCIÓN',
        en: 'INTERACTION INSTRUCTIONS',
        fr: 'INSTRUCTIONS D\'INTERACTION',
        de: 'INTERAKTIONSANWEISUNGEN',
        it: 'ISTRUZIONI DI INTERAZIONE',
        pt: 'INSTRUÇÕES DE INTERAÇÃO',
        nl: 'INTERACTIE-INSTRUCTIES',
        ja: '操作説明',
        zh: '交互说明',
    },
    instruc_gesto_t: {
        es: 'PARA VOLVER A ESTA PANTALLA, DI: AYUDA',
        en: 'TO RETURN TO THIS SCREEN, SAY: HELP',
        fr: 'POUR REVENIR À CET ÉCRAN, DITES: AIDE',
        de: 'UM ZU DIESEM BILDSCHIRM ZURÜCKZUKEHREN, SAGEN SIE: HILFE',
        it: 'PER TORNARE A QUESTA SCHERMATA, DI\': AIUTO',
        pt: 'PARA VOLTAR A ESTA TELA, DIGA: AJUDA',
        nl: 'OM NAAR DIT SCHERM TERUG TE KEREN, ZEG: HULP',
        ja: 'この画面に戻るには「ayuda」と言ってください',
        zh: '要返回此屏幕，请说：ayuda',
    },
    instruc_continuar: {
        es: 'PARA CONTINUAR, DI: EMPEZAR',
        en: 'TO CONTINUE, SAY: START',
        fr: 'POUR CONTINUER, DITES: COMMENCER',
        de: 'UM FORTZUFAHREN, SAGEN SIE: STARTEN',
        it: 'PER CONTINUARE, DI\': INIZIA',
        pt: 'PARA CONTINUAR, DIGA: COMEÇAR',
        nl: 'OM DOOR TE GAAN, ZEG: STARTEN',
        ja: '続けるには「開始」と言ってください',
        zh: '要继续，请说：开始',
    },

    voz_ayuda: {
        es: 'ayuda', en: 'help', fr: 'aide', de: 'hilfe',
        it: 'aiuto', pt: 'ajuda', nl: 'hulp', ja: 'ayuda', zh: 'ayuda',
    },

    voz_volver: {
        es: 'volver', en: 'back', fr: 'retour', de: 'zurück',
        it: 'torna', pt: 'voltar', nl: 'terug', ja: 'volver', zh: 'volver',
    },

    // seleccion.html ──
    titulo_seleccion: {
        es: 'SELECCIONAR LAS RECETAS',
        en: 'SELECT A RECIPE',
        fr: 'SÉLECTIONNER LES RECETTES',
        de: 'REZEPTE AUSWÄHLEN',
        it: 'SELEZIONARE LE RICETTE',
        pt: 'SELECIONAR AS RECEITAS',
        nl: 'RECEPTEN SELECTEREN',
        ja: 'レシピを選択',
        zh: '选择食谱',
    },
    seleccion_cmd_voz: {
        es: 'COMANDO POR VOZ: 1, 2, 3, 4 O EL NOMBRE DE LA RECETA',
        en: 'VOICE COMMAND: 1, 2, 3, 4 OR THE RECIPE NAME',
        fr: 'COMMANDE VOCALE: 1, 2, 3, 4 OU LE NOM DE LA RECETTE',
        de: 'SPRACHBEFEHL: 1, 2, 3, 4 ODER DER REZEPTNAME',
        it: 'COMANDO VOCALE: 1, 2, 3, 4 O IL NOME DELLA RICETTA',
        pt: 'COMANDO DE VOZ: 1, 2, 3, 4 OU O NOME DA RECEITA',
        nl: 'SPRAAKOPDRACHT: 1, 2, 3, 4 OF DE RECEPTNAAM',
        ja: '音声コマンド: 1, 2, 3, 4 またはレシピ名',
        zh: '语音命令: 1, 2, 3, 4 或食谱名称',
    },
    cargando_recetas: {
        es: 'Cargando recetas...',
        en: 'Loading recipes...',
        fr: 'Chargement des recettes...',
        de: 'Rezepte werden geladen...',
        it: 'Caricamento ricette...',
        pt: 'Carregando receitas...',
        nl: 'Recepten laden...',
        ja: 'レシピを読み込み中...',
        zh: '正在加载食谱...',
    },

    // iniciar_receta.html ──────────────────────
    titulo_iniciar: {
        es: 'INICIAR RECETA',
        en: 'START RECIPE',
        fr: 'DÉMARRER LA RECETTE',
        de: 'REZEPT STARTEN',
        it: 'INIZIA RICETTA',
        pt: 'INICIAR RECEITA',
        nl: 'RECEPT STARTEN',
        ja: 'レシピを開始',
        zh: '开始食谱',
    },
    iniciar_cmd_voz: {
        es: 'Para comenzar la receta, DI: comenzar',
        en: 'To start the recipe, SAY: start',
        fr: 'Pour commencer la recette, DITES: commencer',
        de: 'Um das Rezept zu starten, SAGEN SIE: starten',
        it: 'Per iniziare la ricetta, DI\': inizia',
        pt: 'Para começar a receita, DIGA: começar',
        nl: 'Om het recept te starten, ZEG: starten',
        ja: 'レシピを始めるには「開始」と言ってください',
        zh: '要开始食谱，请说：开始',
    },
    label_ingredientes: {
        es: 'Ingredientes:',
        en: 'Ingredients:',
        fr: 'Ingrédients:',
        de: 'Zutaten:',
        it: 'Ingredienti:',
        pt: 'Ingredientes:',
        nl: 'Ingrediënten:',
        ja: '材料：',
        zh: '食材：',
    },

    // paso_receta.html 
    paso_finalizar: {
        es: 'FINALIZAR LA RECETA',
        en: 'FINISH THE RECIPE',
        fr: 'TERMINER LA RECETTE',
        de: 'REZEPT BEENDEN',
        it: 'TERMINA LA RICETTA',
        pt: 'FINALIZAR A RECEITA',
        nl: 'RECEPT AFRONDEN',
        ja: 'レシピを終了',
        zh: '完成食谱',
    },
    paso_confirmar_pregunta: {
        es: '¿¿ DESEAS FINALIZAR LA RECETA ??',
        en: 'DO YOU WANT TO FINISH THE RECIPE?',
        fr: 'VOULEZ-VOUS TERMINER LA RECETTE?',
        de: 'MÖCHTEN SIE DAS REZEPT BEENDEN?',
        it: 'VUOI TERMINARE LA RICETTA?',
        pt: 'DESEJA FINALIZAR A RECEITA?',
        nl: 'WIL JE HET RECEPT BEËINDIGEN?',
        ja: 'レシピを終了しますか？',
        zh: '您想完成食谱吗？',
    },
    paso_confirmar: {
        es: 'CONFIRMAR', en: 'CONFIRM', fr: 'CONFIRMER',
        de: 'BESTÄTIGEN', it: 'CONFERMA', pt: 'CONFIRMAR',
        nl: 'BEVESTIGEN', ja: '確認', zh: '确认',
    },
    paso_rechazar: {
        es: 'RECHAZAR', en: 'REJECT', fr: 'REJETER',
        de: 'ABLEHNEN', it: 'RIFIUTA', pt: 'REJEITAR',
        nl: 'AFWIJZEN', ja: '拒否', zh: '拒绝',
    },
    video_instruccion: {
        es: 'PAUSAR VIDEO Y REANUDARLO: COMANDO DE\nPARAR CON LA PALMA ABIERTA FRENTE A LA CAMARA',
        en: 'PAUSE AND RESUME VIDEO: STOP COMMAND\nWITH OPEN PALM IN FRONT OF THE CAMERA',
        fr: 'METTRE EN PAUSE ET REPRENDRE: COMMANDE\nSTOP AVEC LA PAUME OUVERTE DEVANT LA CAMÉRA',
        de: 'VIDEO PAUSIEREN/FORTSETZEN: STOPP-BEFEHL\nMIT OFFENER HANDFLÄCHE VOR DER KAMERA',
        it: 'PAUSA E RIPRENDI VIDEO: COMANDO STOP\nCON PALMO APERTO DAVANTI ALLA FOTOCAMERA',
        pt: 'PAUSAR E RETOMAR VÍDEO: COMANDO PARAR\nCOM A PALMA ABERTA FRENTE À CÂMERA',
        nl: 'VIDEO PAUZEREN/HERVATTEN: STOP-COMMANDO\nMET OPEN HANDPALM VOOR DE CAMERA',
        ja: '動画の一時停止/再開: カメラの前で\n手のひらを開いて止めてください',
        zh: '暂停/恢复视频: 将张开的手掌\n放在摄像头前即可停止',
    },
    video_abriendo: {
        es: 'ABRIENDO VIDEO EXPLICATIVO',
        en: 'OPENING EXPLANATORY VIDEO',
        fr: 'OUVERTURE DE LA VIDÉO EXPLICATIVE',
        de: 'ERKLÄRVIDEO WIRD GEÖFFNET',
        it: 'APERTURA VIDEO ESPLICATIVO',
        pt: 'ABRINDO VÍDEO EXPLICATIVO',
        nl: 'UITLEGVIDEO OPENEN',
        ja: '解説動画を開いています',
        zh: '正在打开说明视频',
    },
    abrir_receta: {
        es: '+ Abrir receta',
        en: '+ Open recipe',
        fr: '+ Ouvrir recette',
        de: '+ Rezept öffnen',
        it: '+ Apri ricetta',
        pt: '+ Abrir receita',
        nl: '+ Recept openen',
        ja: '+ レシピを開く',
        zh: '+ 打开食谱',
    },

    // NFC.js 
    nfc_titulo_inicial: {
        es: '¿Terminar receta?', en: 'Finish recipe?', fr: 'Terminer la recette?',
        de: 'Rezept beenden?', it: 'Terminare la ricetta?', pt: 'Terminar receita?',
        nl: 'Recept beëindigen?', ja: 'レシピを終了しますか？', zh: '完成食谱？',
    },
    nfc_mensaje_inicial: {
        es: 'Acerca tu tarjeta de transporte al teléfono para confirmar que has terminado.',
        en: 'Tap your transport card to the phone to confirm you are done.',
        fr: 'Approchez votre carte de transport du téléphone pour confirmer.',
        de: 'Halten Sie Ihre Fahrkarte an das Telefon, um zu bestätigen.',
        it: 'Avvicina la tua carta di trasporto al telefono per confermare.',
        pt: 'Aproxime seu cartão de transporte do telefone para confirmar.',
        nl: 'Houd je reiskaart bij de telefoon om te bevestigen.',
        ja: '交通カードをスマホに近づけて確認してください。',
        zh: '将您的交通卡靠近手机以确认完成。',
    },
    nfc_esperando: {
        es: 'Esperando tarjeta…', en: 'Waiting for card…', fr: 'En attente de la carte…',
        de: 'Warte auf Karte…', it: 'In attesa della carta…', pt: 'Aguardando cartão…',
        nl: 'Wachten op kaart…', ja: 'カードを待っています…', zh: '等待卡片…',
    },
    nfc_esperando_msg: {
        es: 'Acerca tu tarjeta de transporte al lector NFC del teléfono.',
        en: 'Tap your transport card to the NFC reader of the phone.',
        fr: 'Approchez votre carte du lecteur NFC du téléphone.',
        de: 'Halten Sie Ihre Karte an den NFC-Leser des Telefons.',
        it: 'Avvicina la carta al lettore NFC del telefono.',
        pt: 'Aproxime seu cartão do leitor NFC do telefone.',
        nl: 'Houd je kaart bij de NFC-lezer van de telefoon.',
        ja: 'カードを電話のNFCリーダーに近づけてください。',
        zh: '将卡片靠近手机的NFC阅读器。',
    },
    nfc_exito_titulo: {
        es: '¡Receta terminada!', en: 'Recipe finished!', fr: 'Recette terminée!',
        de: 'Rezept abgeschlossen!', it: 'Ricetta completata!', pt: 'Receita concluída!',
        nl: 'Recept voltooid!', ja: 'レシピ完成！', zh: '食谱完成！',
    },
    nfc_exito_msg: {
        es: 'Tarjeta detectada. ¡Buen provecho!',
        en: 'Card detected. Enjoy your meal!',
        fr: 'Carte détectée. Bon appétit!',
        de: 'Karte erkannt. Guten Appetit!',
        it: 'Carta rilevata. Buon appetito!',
        pt: 'Cartão detectado. Bom apetite!',
        nl: 'Kaart gedetecteerd. Eet smakelijk!',
        ja: 'カードを検出しました。どうぞ召し上がれ！',
        zh: '检测到卡片。请享用！',
    },
    nfc_error_titulo: {
        es: 'Error de lectura', en: 'Read error', fr: 'Erreur de lecture',
        de: 'Lesefehler', it: 'Errore di lettura', pt: 'Erro de leitura',
        nl: 'Leesfout', ja: '読み取りエラー', zh: '读取错误',
    },
    nfc_error_msg: {
        es: 'No se pudo leer la tarjeta. Inténtalo de nuevo.',
        en: 'Could not read the card. Please try again.',
        fr: 'Impossible de lire la carte. Réessayez.',
        de: 'Karte konnte nicht gelesen werden. Bitte erneut versuchen.',
        it: 'Impossibile leggere la carta. Riprova.',
        pt: 'Não foi possível ler o cartão. Tente novamente.',
        nl: 'Kaart kon niet worden gelezen. Probeer opnieuw.',
        ja: 'カードを読み取れませんでした。もう一度お試しください。',
        zh: '无法读取卡片。请重试。',
    },
    nfc_timeout_titulo: {
        es: 'Tiempo agotado', en: 'Timed out', fr: 'Temps écoulé',
        de: 'Zeitüberschreitung', it: 'Tempo scaduto', pt: 'Tempo esgotado',
        nl: 'Time-out', ja: 'タイムアウト', zh: '超时',
    },
    nfc_timeout_msg: {
        es: 'No se detectó ninguna tarjeta. Puedes terminar o volver a intentarlo.',
        en: 'No card detected. You can finish or try again.',
        fr: 'Aucune carte détectée. Vous pouvez terminer ou réessayer.',
        de: 'Keine Karte erkannt. Sie können beenden oder erneut versuchen.',
        it: 'Nessuna carta rilevata. Puoi terminare o riprovare.',
        pt: 'Nenhum cartão detectado. Você pode terminar ou tentar novamente.',
        nl: 'Geen kaart gedetecteerd. U kunt afsluiten of opnieuw proberen.',
        ja: 'カードが検出されませんでした。終了するか再試行してください。',
        zh: '未检测到卡片。您可以结束或重试。',
    },
    nfc_cancelar: {
        es: 'Cancelar', en: 'Cancel', fr: 'Annuler',
        de: 'Abbrechen', it: 'Annulla', pt: 'Cancelar',
        nl: 'Annuleren', ja: 'キャンセル', zh: '取消',
    },
    nfc_saltar: {
        es: 'Terminar sin NFC', en: 'Finish without NFC', fr: 'Terminer sans NFC',
        de: 'Ohne NFC beenden', it: 'Termina senza NFC', pt: 'Terminar sem NFC',
        nl: 'Afronden zonder NFC', ja: 'NFCなしで終了', zh: '不使用NFC完成',
    },
    nfc_reintentar: {
        es: 'Reintentar', en: 'Retry', fr: 'Réessayer',
        de: 'Erneut versuchen', it: 'Riprova', pt: 'Tentar novamente',
        nl: 'Opnieuw proberen', ja: '再試行', zh: '重试',
    },
    nfc_no_disponible: {
        es: 'NFC no disponible', en: 'NFC not available', fr: 'NFC non disponible',
        de: 'NFC nicht verfügbar', it: 'NFC non disponibile', pt: 'NFC não disponível',
        nl: 'NFC niet beschikbaar', ja: 'NFCは利用できません', zh: 'NFC不可用',
    },
    nfc_solo_chrome: {
        es: 'La Web NFC API solo funciona en Chrome para Android',
        en: 'The Web NFC API only works in Chrome for Android',
        fr: 'L\'API Web NFC ne fonctionne que dans Chrome pour Android',
        de: 'Die Web NFC API funktioniert nur in Chrome für Android',
        it: 'La Web NFC API funziona solo in Chrome per Android',
        pt: 'A API Web NFC só funciona no Chrome para Android',
        nl: 'De Web NFC API werkt alleen in Chrome voor Android',
        ja: 'Web NFC APIはAndroidのChromeでのみ動作します',
        zh: 'Web NFC API仅在Android的Chrome中有效',
    },
    nfc_usar_chrome: {
        es: 'Necesitas usar Chrome para poder usar NFC.',
        en: 'You need to use Chrome to use NFC.',
        fr: 'Vous devez utiliser Chrome pour utiliser le NFC.',
        de: 'Sie müssen Chrome verwenden, um NFC zu nutzen.',
        it: 'Devi usare Chrome per usare NFC.',
        pt: 'Você precisa usar o Chrome para usar NFC.',
        nl: 'Je moet Chrome gebruiken om NFC te gebruiken.',
        ja: 'NFCを使用するにはChromeを使う必要があります。',
        zh: '您需要使用Chrome才能使用NFC。',
    },
    nfc_version_chrome: {
        es: 'Tu versión de Chrome no soporta Web NFC',
        en: 'Your Chrome version does not support Web NFC',
        fr: 'Votre version de Chrome ne prend pas en charge Web NFC',
        de: 'Ihre Chrome-Version unterstützt Web NFC nicht',
        it: 'La tua versione di Chrome non supporta Web NFC',
        pt: 'Sua versão do Chrome não suporta Web NFC',
        nl: 'Uw Chrome-versie ondersteunt Web NFC niet',
        ja: 'お使いのChromeバージョンはWeb NFCをサポートしていません',
        zh: '您的Chrome版本不支持Web NFC',
    },
    nfc_no_seguro_titulo: {
        es: 'Conexión no segura', en: 'Insecure connection', fr: 'Connexion non sécurisée',
        de: 'Unsichere Verbindung', it: 'Connessione non sicura', pt: 'Conexão insegura',
        nl: 'Onveilige verbinding', ja: '安全でない接続', zh: '不安全的连接',
    },
    nfc_no_seguro_msg: {
        es: 'La Web NFC API requiere HTTPS.',
        en: 'The Web NFC API requires HTTPS.',
        fr: 'L\'API Web NFC nécessite HTTPS.',
        de: 'Die Web NFC API erfordert HTTPS.',
        it: 'La Web NFC API richiede HTTPS.',
        pt: 'A API Web NFC requer HTTPS.',
        nl: 'De Web NFC API vereist HTTPS.',
        ja: 'Web NFC APIにはHTTPSが必要です。',
        zh: 'Web NFC API需要HTTPS。',
    },
    nfc_denegado_titulo: {
        es: 'Permiso denegado', en: 'Permission denied', fr: 'Permission refusée',
        de: 'Berechtigung verweigert', it: 'Autorizzazione negata', pt: 'Permissão negada',
        nl: 'Toestemming geweigerd', ja: '権限が拒否されました', zh: '权限被拒绝',
    },
    nfc_denegado_msg: {
        es: 'Has denegado el permiso NFC. Ve a los ajustes del sitio en Chrome y permite el acceso NFC.',
        en: 'You denied NFC permission. Go to site settings in Chrome and allow NFC access.',
        fr: 'Vous avez refusé l\'autorisation NFC. Allez dans les paramètres du site dans Chrome.',
        de: 'Sie haben die NFC-Berechtigung verweigert. Gehen Sie in Chrome zu den Website-Einstellungen.',
        it: 'Hai negato l\'autorizzazione NFC. Vai alle impostazioni del sito in Chrome.',
        pt: 'Você negou a permissão NFC. Vá para as configurações do site no Chrome.',
        nl: 'U heeft NFC-toestemming geweigerd. Ga naar site-instellingen in Chrome.',
        ja: 'NFC権限を拒否しました。ChromeのサイトのNFCアクセスを許可してください。',
        zh: '您拒绝了NFC权限。请在Chrome中转到网站设置并允许NFC访问。',
    },
    nfc_desactivado_titulo: {
        es: 'NFC desactivado', en: 'NFC disabled', fr: 'NFC désactivé',
        de: 'NFC deaktiviert', it: 'NFC disabilitato', pt: 'NFC desativado',
        nl: 'NFC uitgeschakeld', ja: 'NFCが無効です', zh: 'NFC已禁用',
    },
    nfc_desactivado_msg: {
        es: 'NFC está desactivado en tu teléfono. Actívalo en Ajustes y vuelve a intentar.',
        en: 'NFC is disabled on your phone. Enable it in Settings and try again.',
        fr: 'Le NFC est désactivé sur votre téléphone. Activez-le dans les Paramètres.',
        de: 'NFC ist auf Ihrem Telefon deaktiviert. Aktivieren Sie es in den Einstellungen.',
        it: 'NFC è disabilitato sul tuo telefono. Abilitalo nelle Impostazioni.',
        pt: 'NFC está desativado no seu telefone. Ative nas Configurações e tente novamente.',
        nl: 'NFC is uitgeschakeld op uw telefoon. Schakel het in via Instellingen.',
        ja: 'お使いの携帯でNFCが無効です。設定で有効にしてください。',
        zh: '您的手机NFC已关闭。请在设置中开启后重试。',
    },

    // logicaGeneral.js (temporizador) 
    timer_iniciado: {
        es: (d) => `⏱️ Temporizador de ${d} iniciado`,
        en: (d) => `⏱️ Timer of ${d} started`,
        fr: (d) => `⏱️ Minuterie de ${d} démarrée`,
        de: (d) => `⏱️ Timer von ${d} gestartet`,
        it: (d) => `⏱️ Timer di ${d} avviato`,
        pt: (d) => `⏱️ Temporizador de ${d} iniciado`,
        nl: (d) => `⏱️ Timer van ${d} gestart`,
        ja: (d) => `⏱️ ${d}のタイマーを開始しました`,
        zh: (d) => `⏱️ ${d}计时器已启动`,
    },
    timer_finalizado: {
        es: (d) => `✅ ¡Temporizador de ${d} finalizado!`,
        en: (d) => `✅ Timer of ${d} finished!`,
        fr: (d) => `✅ Minuterie de ${d} terminée!`,
        de: (d) => `✅ Timer von ${d} beendet!`,
        it: (d) => `✅ Timer di ${d} completato!`,
        pt: (d) => `✅ Temporizador de ${d} finalizado!`,
        nl: (d) => `✅ Timer van ${d} voltooid!`,
        ja: (d) => `✅ ${d}のタイマーが終了しました！`,
        zh: (d) => `✅ ${d}计时器已结束！`,
    },
    timer_segundo: {
        es: 'segundo(s)', en: 'second(s)', fr: 'seconde(s)',
        de: 'Sekunde(n)', it: 'secondo/i', pt: 'segundo(s)',
        nl: 'seconde(n)', ja: '秒', zh: '秒',
    },
    timer_minuto: {
        es: 'minuto(s)', en: 'minute(s)', fr: 'minute(s)',
        de: 'Minute(n)', it: 'minuto/i', pt: 'minuto(s)',
        nl: 'minuut/minuten', ja: '分', zh: '分钟',
    },

    // Comandos de voz (annyang) 
    // Nota: annyang solo funciona bien en español e inglés de forma fiable.
    // Para otros idiomas se mantiene español como fallback del reconocimiento,
    // pero los mensajes de UI sí se muestran en el idioma local.
    voz_empezar: {
        es: 'empezar', en: 'start', fr: 'empezar', de: 'empezar',
        it: 'empezar', pt: 'começar', nl: 'empezar', ja: 'empezar', zh: 'empezar',
    },
    voz_comenzar: {
        es: 'comenzar', en: 'begin', fr: 'comenzar', de: 'comenzar',
        it: 'comenzar', pt: 'começar', nl: 'comenzar', ja: 'comenzar', zh: 'comenzar',
    },
    voz_en_voz_alta: {
        es: 'en voz alta', en: 'read aloud', fr: 'en voz alta', de: 'en voz alta',
        it: 'en voz alta', pt: 'em voz alta', nl: 'en voz alta', ja: 'en voz alta', zh: 'en voz alta',
    },
    voz_silencio: {
        es: 'silencio', en: 'silence', fr: 'silencio', de: 'silencio',
        it: 'silenzio', pt: 'silêncio', nl: 'silencio', ja: 'silencio', zh: 'silencio',
    },
};


// MOTOR DE IDIOMA


let _idioma = 'es'; // fallback por defecto

// Función principal de traducción
function t(clave, ...args) {
    const entrada = TRADUCCIONES[clave];
    if (!entrada) {
        console.warn(`[idioma.js] Clave no encontrada: "${clave}"`);
        return clave;
    }
    const valor = entrada[_idioma] ?? entrada['es']; // fallback a español
    return typeof valor === 'function' ? valor(...args) : valor;
}

// Devuelve el código de idioma activo
function getLang() {
    return _idioma;
}


// Detecta el país y establece el idioma
async function detectarIdiomaSegunUbicacion() {

    // Pedimos coordenadas GPS
    if (!navigator.geolocation) {
        console.warn('[idioma.js] Geolocalización no soportada. Usando español.');
        aplicarIdiomaAlDOM();
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (posicion) => {
            const { latitude, longitude } = posicion.coords;
            try {
                // API gratuita, sin key
                const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                const codigoPais = datos.countryCode; // "ES", "FR", etc.

                console.log(`[idioma.js] País detectado: ${codigoPais}`);

                _idioma = PAIS_A_IDIOMA[codigoPais] || 'en'; // fallback inglés si el país no está en la tabla
                sessionStorage.setItem('appIdioma', _idioma);
                console.log(`[idioma.js] Idioma establecido: ${_idioma}`);
            } catch (e) {
                console.warn('[idioma.js] Error al obtener el país. Usando español.', e);
            }
            aplicarIdiomaAlDOM();
        },
        (error) => {
            console.warn('[idioma.js] Permiso de ubicación denegado. Usando español.', error);
            aplicarIdiomaAlDOM();
        },
        { timeout: 5000 }
    );
}

// Actualiza los textos del DOM que tienen el atributo data-i18n
function aplicarIdiomaAlDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const clave = el.getAttribute('data-i18n');
        el.innerText = t(clave);
    });
    // Actualiza el lang del <html> para accesibilidad
    document.documentElement.lang = _idioma;
}

// Arranca automáticamente
detectarIdiomaSegunUbicacion();