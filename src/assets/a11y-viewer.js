(function() {
    var FORM = document.querySelector('form');
    var MAIN = document.querySelector('main');
    var IFRAME = document.querySelector('iframe');

    var DISABLED_CLASS = 'is-disabled';
    var OPEN_CLASS = 'is-open';

    function init() {
        populateForm();
        initCollapsible();
        bindEvents();
    }

    // Set the form values when the URL contains parameters
    function populateForm() {
        var queryString = window.location.search;
        if (queryString) {
            var state = queryStringToObject(queryString);
            for (var key in state) {
                var input = FORM[key];
                var value = state[key];

                if (input) {
                    if (input.type.toLowerCase() == 'checkbox') {
                        input.checked = value;
                    } else {
                        // If no value is set take the first option from a select
                        if (!value) {
                            value = input.options ? input.options[0].value : '';
                        }
                        input.value = value;
                    }

                    // Apply changes to the view
                    updateView(input);
                }
            }
        }
    }

    function initCollapsible() {
        var collapsibleHandlers = arrayFrom(document.querySelectorAll('[data-collapsible-handle]'));
        var collapsibleTarget = document.querySelector('[data-collapsible-target]');
        
        collapsibleHandlers.forEach(function (collapsible) {
            collapsible.addEventListener('click', function() {
                collapsibleTarget.classList.toggle(OPEN_CLASS);
            }, false);
        });
    }

    function bindEvents() {
        FORM.addEventListener('change', function(event) {
            updateView(event.target)
        }, false);

        // the `change` event is fired as well when user submits form,
        // so we don't need to do anything here
        FORM.addEventListener('submit', function(event) {
            event.preventDefault();
        }, false);

        // When the back/forward button is used update the form
        window.addEventListener('popstate', function() {
            populateForm();
        });
    }

    // Update the URL and the view
    function updateView(formElement) {
        var actions = {
            'vision': simulateOption,
            'color': simulateOption,
            'keyboard-only': toggleClickStealer,
            'url': updateTestSite
        };

        actions[formElement.name](formElement);
        updateUrl();
    }

    // Update the address bar with input/values excluding the submit button
    function updateUrl() {
        // Exclude the submit button
        var inputs = arrayFrom(FORM.elements).filter(function (element) {
            return (element.nodeName.toLowerCase() !== 'button');
        });

        // Update address bar
        window.history.pushState('', document.title, inputsToQueryString(inputs));
    }

    // Remove all simulation classes and add the selected option
    function simulateOption(formElement) {
        var optionClass = formElement.value;
        var options = formElement.options;
        for (var i = 0, len = options.length; i < len; i++) {
            MAIN.classList.remove(options[i].value);
        }
		// Falls back to the first option when no option class is set
        MAIN.classList.add(optionClass ? optionClass : formElement.options[0].value);
    }

    // Toggle the disabled class
    function toggleClickStealer(formElement) {
        MAIN.classList.toggle(DISABLED_CLASS, formElement.checked);
    }

    // Replace the iframe element with a new one to prevent a new entry in browser history
    function updateTestSite(formElement) {
        var parsedUrl = parseTestSiteUrl(formElement.value);
        var newIframe = document.createElement('iframe');

        newIframe.src = parsedUrl;
        IFRAME.parentNode.replaceChild(newIframe, IFRAME);
        IFRAME = newIframe;
    }

    // Return relative protocol when no protocol is specified
    function parseTestSiteUrl(url) {
        if (!/^https?\:\/\//i.test(url)) {
            url = '//' + url;
        }
        return url;
    }

    /**
     * Returns query string parameters as key / value pairs
     *
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

    /**
     * Create a query string from an array of inputs with their values
     * and check for input type checkbox elements and their checked state
     *
     * @param {Array} inputs array of input elements
     * @returns {string} query string
     */
    function inputsToQueryString(inputs) {
        var queryString = [];
        for (var i = 0, len = inputs.length; i < len; i++) {
            var input = inputs[i];
            var inputValue = input.value;
            if (input.type.toLowerCase() === 'checkbox' && !input.checked) {
                inputValue = '';
            }
            queryString.push(input.name + '=' + encodeURIComponent(inputValue));
        }

        return '?' + queryString.join('&');
    }

    /**
     * Create an iterable array from an array like object
     *
     * @param arrayLikeObject
     * @returns {Array} given array like object as array
     */
    function arrayFrom(arrayLikeObject) {
        var array = [];
        for (var i = 0; i < arrayLikeObject.length; i++) {
            array.push(arrayLikeObject[i]);
        }
        return array;
    }

    // Kick off application
    init();

}());