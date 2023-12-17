import config from "./config";

const LOAD_DATA = 'LOAD_DATA';
const SAVE_DATA = 'SAVE_DATA';

export function loadData(data) {
    const title = data.title || 'Daten werden geladen';
    const errorTitle = data.errorTitle || 'Daten konnten nicht geladen werden!';

    fetch(config.baseURL + 'backend/' + data.route,
        {
            method     : 'GET',
            credentials: 'same-origin',
        }
    ).then(res => res.json()
    ).then(res => {
        if (res !== '' && res !== {} && res.code !== 200) {
            data.callBack({
                ...res.data,
            });
            if (data.response) {
                data.response({
                    active: false,
                    hidden: false,
                })
            }
        } else {
            if (data.response && res.code === 200) {
                data.response({
                    active: true,
                    hidden: false,
                    type  : 'error',
                    title : errorTitle,
                    text  : 'Error-Code: ' + res.code + ' - ' + res.error_msg
                })
            }
        }
    }).catch(error => {
        if (data.response) {
            data.response({
                active: true,
                type  : 'error',
                title : errorTitle,
                text  : error + ''
            })
        }
    });
    let hidden = data.hidden ? data.hidden : false;
    return {type: LOAD_DATA, title, hidden}
}

export function saveData(data) {
    fetch(config.baseURL + 'backend/' + data.route,
        {
            method     : 'POST',
            credentials: 'same-origin',
            body       : data.formData,
        }
    ).then(res => res.json()
    ).then(res => {
        if (res !== '' && res !== {} && res.code !== 200) {
            data.callBack({
                ...res.data,
            });
            if (data.response) {
                data.response({
                    active: false
                })
            }
        } else {
            if (data.response && res.code === 200) {
                console.error(data.errorTitle);
                data.response({
                    active: true,
                    type  : 'error',
                    title : data.errorTitle,
                    text  : Translations[res.error_msg][data.language],
                })
            }
        }
    }).catch(error => {
        console.error(error);
        if (data.response) {
            data.response({
                active: true,
                type  : 'error',
                title : data.errorTitle,
                text  : error + ''
            })
        }
    });
    let title = data.title;
    let hidden = data.hidden ? data.hidden : false;
    return {type: SAVE_DATA, title, hidden}
}

export const formatDateTime = (datetime, fullMonths) => {
    let months = ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    let date = datetime.split(' ')[0].split('-').reverse().join('.');
    if(fullMonths) {
        let fullmonth = months[Number(date.split('.')[1])];
        date = date.split('.')[0] + '. ' + fullmonth + ' ' + date.split('.')[2];
    }
    let time = datetime.split(' ')[1].slice(0,5);
    return date + ', ' + time;
}

export const sortObjectToReverseArray = (obj) => {
    return Object.keys(obj).map((item) => (obj[item])).reverse();
}