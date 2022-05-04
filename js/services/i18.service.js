var gTrans = {
    'prev-page': {
        en: 'Prev page',
        es: 'Prev pageo',
        he: 'עמוד קודם'
    },
    'next-page': {
        en: 'Next page',
        es: 'Next pageo',
        he: 'עמוד הבא',
    },
    'create-new': {
        en: 'Create New Book',
        es: 'Createo New Booko',
        he: 'יצירת ספר חדש',
    },
    'oter-lang': {
        en: 'we also support spanish and hebrew',
        es: 'we also supporto englisho and hebreto',
        he: 'אנחנו תומכים גם באנגלית ובספרדית'
    },
    'lang1': { //en
        en: 'English - default',
        es: 'Englisho',
        he: 'אנגלית'
    },
    'lang2': { //sp
        en: 'Spanish',
        es: 'Espanyol',
        he: 'ספרדית'
    },
    'lang3': { //he
        en: 'Hebrew',
        es: 'Hebreto',
        he: 'עברית'
    },
    'name-ph': {
        en: 'Enter new name',
        es: 'Enter new nameo',
        he: 'שם ספר חדש',
    },
    'price-ph': {
        en: 'Enter new price',
        es: 'Enter new prico',
        he: 'מחיר לספר החדש',
    },
    'add-btn': {
        en: 'ADD',
        es: 'ADDO',
        he: 'הוספה',
    },
    'id': {
        en: 'Id',
        es: 'Idoo',
        he: 'מספר ספר',
    },
    'title': {
        en: 'Title',
        es: 'Titlelo',
        he: 'שם הספר',
    },
    'price': {
        en: 'Price',
        es: 'Prico',
        he: 'מחיר',
    },
    'actions': {
        en: 'Actions',
        es: 'Actiono',
        he: 'פעולות',
    },
    'read': {
        en: 'Read',
        es: 'Reado',
        he: 'לקריאה',
    },
    'update': {
        en: 'Update',
        es: 'Updato',
        he: 'עדכון',
    },
    'delete': {
        en: 'Delete',
        es: 'Deleto',
        he: 'מחיקה',
    },
    'currency': {
        en: '$',
        es: '€',
        he: '₪',
    },
    'price-ph': {
        en: 'New Price',
        es: 'New Prico',
        he: 'מחיר חדש',
    },
    'change-btn': {
        en: 'Change',
        es: 'Chango',
        he: 'שינוי',
    },
    'rating': {
        en: 'Rating',
        es: 'Ratino',
        he: 'דירוג',
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'

    var txt = keyTrans[gCurrLang]
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach((el) => {
        // console.dir(el)
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        if (el.nodeName === 'INPUT') {
            // el.setAttribute('placeholder', txt)
            //THE SAME!
            el.placeholder = txt
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang;
}

//not in use
function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}