(function() {

    var VISION_SELECTOR = '[data-input-vision]';
    var COLOR_SELECTOR = '[data-input-color]';
    var KEYBOARD_ONLY_SELECTOR = '[data-input-keyboard-only]';
    var URL_SELECTOR = '[data-input-url]';
    var DISABLED_CLASS = 'is-disabled';

    var visionSelect = document.querySelector(VISION_SELECTOR);
    var visionSelectOptions = arrayFrom(visionSelect.options);
    var colorSelect = document.querySelector(COLOR_SELECTOR);
    var colorSelectOptions = arrayFrom(colorSelect.options);
    var keyboardOnlyInput = document.querySelector(KEYBOARD_ONLY_SELECTOR);
    var urlInput = document.querySelector(URL_SELECTOR);
    var formElements = [ visionSelect, colorSelect, keyboardOnlyInput, urlInput ];
    var supportsPushState = ('pushState' in window.history);

    var form = document.querySelector('form');
    var main = document.querySelector('main');
    var iframe = document.querySelector('iframe');
    var collapsibleHandlers = arrayFrom(document.querySelectorAll('[data-collapsible-handle]'));
    var collapsibleTarget = document.querySelector('[data-collapsible-target]');

    onPageLoad();

    form.addEventListener('change', function handleChange(event) {
        update(event.target, true);
    }, false);

    form.addEventListener('submit', function handleSubmit(event) {
        event.preventDefault();
        // the `change` event is fired as well when user submits form,
        // so we don't need to do anything else here
    }, false);

    window.onpopstate = function () {
        var state = queryStringToObject(window.location.search);
        restoreForm(state);
    };

    collapsibleHandlers.forEach(function (collapsible) {
        collapsible.addEventListener('click', toggleMenu, false);
    });

    function onPageLoad() {
        var queryString = window.location.search;

        if (queryString) {
            var state = queryStringToObject(window.location.search);
            restoreForm(state);
        } else {
            // store initial state in url
            window.history.replaceState('', '', formToQueryString());
        }
    }

    function toggleMenu() {
        collapsibleTarget.classList.toggle('is-open');
    }

    function restoreForm(state) {

        formElements.forEach(function (element) {
            var newValue = state[element.id];

            if (element.type == "checkbox" && element.checked.toString() != newValue) {
                element.checked = newValue == "true";
                update(element, false);
            } else if (element.value != newValue) {
                element.value = newValue;
                update(element, false);
            }
        });
    }

    function update(formElement, isTriggeredByUser) {
        var value;

        switch (formElement) {
            case visionSelect:
                value = formElement.value;
                simulateVisionLoss(value);
                break;
            case colorSelect:
                value = formElement.value;
                simulateColorBlindness(value);
                break;
            case keyboardOnlyInput:
                value = formElement.checked;
                toggleClickStealer(value);
                break;
            case urlInput:
                value = formElement.value;
                updateTestSite(value);
        }

        if (supportsPushState && isTriggeredByUser) {
            updateHistory(formElement.id, value);
        }
    }

    function simulateVisionLoss(value) {

        visionSelectOptions.forEach(function (option) {
            main.classList.remove(option.value);
        });

        main.classList.add(value);
    }

    function simulateColorBlindness(value) {

        colorSelectOptions.forEach(function (option) {
            main.classList.remove(option.value);
        });

        main.classList.add(value);
    }

    function toggleClickStealer(isActive) {
        main.classList.toggle(DISABLED_CLASS, isActive);
    }

    function updateTestSite(value) {
        var parsedUrl = parseTestSiteUrl(value);
        // replace the iframe element with a new one to prevent a new entry in browser history
        var parent = iframe.parentNode;
        var newIframe = document.createElement('iframe');

        newIframe.src = parsedUrl;
        parent.replaceChild(newIframe, iframe);
        iframe = newIframe;
    }

    function updateHistory(key, value) {
        var queryString = replaceQueryString(key, value);

        window.history.pushState('', '', queryString);
    }

    function replaceQueryString(key, value) {
        var queryString = window.location.search.split('?').pop();

        var pairs = queryString.split('&').map(function (pair) {
            var parts = pair.split('=');
            if (parts[0] === key) {
                return parts[0] + '=' + encodeURIComponent(value);
            } else {
                return pair;
            }
        });

        return '?' + pairs.join('&');
    }

    function formToQueryString() {
        return '?' +
            visionSelect.id + '=' + visionSelect.value + '&' +
            colorSelect.id + '=' + colorSelect.value + '&' +
            keyboardOnlyInput.id + '=' + keyboardOnlyInput.checked + '&' +
            urlInput.id + '=' + encodeURIComponent(urlInput.value);
    }

    /**
     * Returns query string parameters as key:value pairs.
     * Example: ?amount=1000&status=none -> { amount: "1000", status: "none" }
     * @param {string} query
     * @returns {object}
     */
    function queryStringToObject(query) {
        return query
            .split('?').pop()
            .split('&')
            .reduce(function (obj, token) {
                var parts = token.split('=');
                obj[parts[0]] = decodeURIComponent(parts[1]);
                return obj;
            }, {});
    }

    function parseTestSiteUrl(url) {

        if (!/^https?\:\/\//.test(url)) {
            url = "//" + url;
        }

        return url;
    }

    function arrayFrom(arrayLikeObject) {
        var array = [];

        for (var i = 0; i < arrayLikeObject.length; i++) {
            array.push(arrayLikeObject[i]);
        }
        return array;
    }

}());