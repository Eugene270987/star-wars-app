'use strict'
function createButtons () {
    const parentElement = document.getElementById('main');
    const mainSection = createElement('section', parentElement, '', {id: 'main-section', className: 'container-xxl'});
    const btnContainer = createElement('div', mainSection, '', {className: 'btn-group mb-4 d-flex justify-content-center', 'role': 'group'});

    createElement('button', btnContainer, 'HEROES', {type: 'button', className: 'btn btn-primary rounded-pill'},
        {click: () => toggleInfo('.heroes__block', 'people', 'name')});
    createElement('button', btnContainer, 'PLANETS', {type: 'button', className: 'btn btn-warning rounded-pill'},
        {click: () => toggleInfo('.planets__block', 'planets', 'name')});
    createElement('button', btnContainer, 'TRANSPORT', {type: 'button', className: 'btn btn-success rounded-pill'},
        {click: () => toggleInfo('.vehicles__block', 'vehicles', 'name')});
}
function createInfoColumns () {
    const parentElement = document.getElementById('main-section');

    const infoRow = createElement('div', parentElement, '', {className: 'row text-center fw-bold d-flex justify-content-center align-items-start'});
    createElement('div', infoRow, '', {className: 'heroes__block col rounded border border-primary'});
    createElement('div', infoRow, '', {className: 'planets__block col rounded border border-warning'});
    createElement('div', infoRow, '', {className: 'vehicles__block col rounded border border-success'});
}
function addShowClass(element, className) {
    element.classList.add(className);
}
function removeShowClass(element, className) {
    cleanElement(element);
    element.classList.remove(className);
}
function toggleInfo(blockSelector, infoType, objKey) {
    const blockElement = document.querySelector(blockSelector);
    const blockContent = blockElement.textContent;
    if (!blockContent) {
        currentPage[infoType] = 1;
        getData(infoType, objKey, blockElement, 'show', currentPage[infoType], dataTypes);
    } else {
        removeShowClass(blockElement, 'show');
    }
}

function getData(infoType, objKey, element, className, page, dataProp) {
    const API_BASE = 'https://swapi.dev/api/';

    if (isLoading[infoType] || page === null) {
        return;
    }

    isLoading[infoType] = true;

    axios.get(`${API_BASE}${infoType}/?page=${page}`)
        .then(result => {
            const res = result.data;
            const response = result.data.results;
            response.forEach(item => {
                createElement('p', element, item.name, {
                    className: 'object__item',
                    'data-bs-toggle': 'modal',
                    'data-bs-target': '#myModal',
                    'data-type': `${infoType}`,
                    'data-name': `${item.name}`
                });
            })

            element.addEventListener('click', event => {
                if (event.target.nodeName === 'P') {
                    const listItemText = event.target.textContent;
                    const item = response.find(item => item.name === listItemText);
                    if (item) {
                        document.querySelector(`#modal-info`).innerHTML = '';
                        document.querySelector(`#modalTitle`).textContent = item.name;
                        for (const key of dataProp[infoType]) {
                            createElement(`li`,`#modal-info`,`${key}: ${item[key]}`,{className: 'property__item'})
                        }
                    }
                }
            });
            const prevShowMoreButton = element.querySelector('.btn.btn-danger.my-4');
            if (prevShowMoreButton) {
                prevShowMoreButton.remove();
            }

            if (res.next) {
                createElement(
                    'button',
                    element,
                    'SHOW MORE',
                    {className: 'btn btn-danger my-4'},
                    {click: () => getData(infoType, objKey, element, className, currentPage[infoType], dataTypes)});
            } else {
                  createElement('p', element, 'No more data available.', {className: 'no-data-text'});
            }

            addShowClass(element, className);
            isLoading[infoType] = false;
            currentPage[infoType]++;
        })
}
function createModal () {
    const modal = createElement('div', '#main-section', '', {id: 'myModal', className: 'modal','aria-hidden':"true"});
    const modalDialog = createElement('div', modal, '', {className: 'modal-dialog'});
    const modalContent = createElement('div', modalDialog, '', {className: 'modal-content'});

    const modalHeader = createElement('div', modalContent, '', {className: 'modal-header d-flex justify-content-center', id: 'modalTitle'});
    createElement('h5', modalHeader, '', {className: 'modal-title'});
    createElement('button', modalHeader, '', {type: 'button', className: 'btn-close', 'data-bs-dismiss': 'modal', 'aria-label': 'close'});

    const modalBody = createElement('div', modalContent, '', {id: 'modal-desc', className: 'modal-body'});
    createElement('ol', modalBody, '', {id: 'modal-info', className: 'd-flex flex-column'});

    const modalFooter = createElement('div', modalContent, '', {className: 'modal-footer'});
    createElement('button', modalFooter, 'OK', {type: 'button', className: 'btn btn-success', 'data-bs-dismiss': 'modal'});
}




