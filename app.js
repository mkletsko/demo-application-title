var App;

/* global variable App - window.App */
App = (function(){

    var objectInJson;

    /* XMLHttpRequest */
    (function () {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'http://cm.mmi.macc.com.ua/tests/sample.json', false);
        xhr.send();

        if (xhr.status != 200) {
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
        } else {
            return objectInJson = JSON.parse(xhr.responseText);
        }

    })();
    /* END XMLHttpRequest */

    /* insert data to table */
    (function(){

        /* extract objects from JSON */
        for(var objects in objectInJson){

            var objInObject = objectInJson[objects],
                tableElem = document.querySelector('.table-body'),
                trElem = document.createElement('tr'),
                tdElem = document.createElement('td'),
                windowPopupElem = document.querySelector('.popup-window');

            trElem.classList.add('t-row');
            tdElem.classList.add('d-row');

            /* property extract from objects */
            for (var property in objInObject) {
                var propertyInObj = objInObject[property],
                    textElem = document.createTextNode(propertyInObj),

                    /* function insert new TD in TABLE */
                    createTableElem = function (value) {
                        var cloneTd = tdElem.cloneNode(false);
                        cloneTd.classList.add(value);
                        cloneTd.appendChild(textElem);
                        trElem.appendChild(cloneTd);
                    }, /* END function insert new TD in TABLE */

                    /* function create window pop-up and paste elements */
                    createWindowPopup = function (value) {
                        var cloneWindowPopup = windowPopupElem.cloneNode(true),
                            cloneWindowElem = document.querySelector('.popup-window'),
                            descriptionElem = cloneWindowElem.querySelector('.description'),
                            captionElem = cloneWindowElem.querySelector('.popup-caption'),
                            imgElem = cloneWindowElem.querySelector('.popup-img'),
                            autorElem = cloneWindowElem.querySelector('.autor-info'),
                            dateElem = cloneWindowElem.querySelector('.date-info'),
                            numberElem = cloneWindowElem.querySelector('.number-info');

                        /* insert value in pop-up window */
                        switch (value) {
                            case 'name':
                                imgElem.setAttribute('alt', propertyInObj);
                                return captionElem.innerHTML = propertyInObj;
                                break;
                            case 'author':
                                return autorElem.innerHTML = 'Авторы: ' + propertyInObj + ' | ' + '   ';
                                break;
                            case 'date':
                                return dateElem.innerHTML = 'Год выпуска: ' + propertyInObj + ' |   ';
                                break;
                            case 'number':
                                return numberElem.innerHTML = propertyInObj;
                                cloneWindowElem.classList.add(propertyInObj);
                                break;
                            case 'description':
                                return descriptionElem.innerHTML = propertyInObj;
                                break;
                            case 'img':
                                return imgElem.setAttribute('src', propertyInObj);
                                break;
                        }
                        /* END insert value in pop-up window */

                        document.body.insertBefore(cloneWindowPopup,  document.body.lastElementChild.nextElementSibling);

                    }; /* END function create window pop-up and paste elements */

                /* insert new TD in TABLE */
                switch (property) {
                    case 'id':
                        createTableElem(property);
                        createWindowPopup(property);
                        break;
                    case 'name':
                        createTableElem(property);
                        createWindowPopup(property);
                        break;
                    case 'author':
                        createTableElem(property);
                        createWindowPopup(property);
                        break;
                    case 'date':
                        createTableElem(property);
                        createWindowPopup(property);
                        break;
                    case 'number':
                        createTableElem(property);
                        createWindowPopup(property);
                        break;
                    case 'description':
                        createWindowPopup(property);
                        break;
                    case 'img':
                        createWindowPopup(property);
                        break;
                }
                /* END insert new TD in TABLE */

                tableElem.appendChild(trElem);

            }/* END property extract from objects */

        }/* END extract objects from JSON */


        /* create window popup event click */
        (function () {

            /* function visible Window create*/
            var visibleWindow = function (event) {

                    var target = event.target;

                    var collectionWindow = document.body.querySelectorAll('.popup-window'),
                        collectionWindowLength = collectionWindow.length;
                        i = 0,
                        j = 0;

                    if (target.nodeName == 'TD' && target.classList.contains('number')){

                        /* hidden window has display block */
                        for(; i < collectionWindowLength; i++) {
                            if (collectionWindow[i].style.display = 'block'){
                                collectionWindow[i].style.display = 'none';
                            }
                        }/* END hidden window has display block */


                        /* visible window has display block (initial field serial) */
                        for(; j < collectionWindowLength; j++){
                            var textNodeTd = collectionWindow[j].querySelector('.number-info').textContent;

                            if (textNodeTd == target.textContent) {
                                collectionWindow[j].style.display = 'block';
                            }
                        }/* END visible window has display block (initial field serial) */

                        event.stopPropagation();
                        event.preventDefault();

                    }

                }, /* END function visible Window create*/

                /* function close Window create*/
                closeWindow = function (event) {

                    var target = event.target;

                    if (target.classList.contains('close')) {
                       var parent = target.parentNode;
                        parent.style.display = 'none';
                    }

                    event.stopPropagation();
                    event.preventDefault();

                }; /* END function close Window create*/


            if (document.addEventListener) {
                document.addEventListener('click', visibleWindow);
                document.addEventListener('click', closeWindow);
            } else if (document.attachEvent) {
                document.attachEvent('onclick', visibleWindow);
                document.attachEvent('onclick', closeWindow);
            } else {
                document.onclick = visibleWindow;
                document.onclick = closeWindow;
            };


        })();
        /* END create window popup event click */


    })();
    /* END insert data to table */


})();
/* END global variable App - window.App */


