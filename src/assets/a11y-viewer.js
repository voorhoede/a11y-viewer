(function() {
    var imparitySelector = document.getElementById('imparity-selector');
    var colorBlindnessSelector = document.getElementById('color-blindness-selector');
    var main = document.getElementById('main');
    var clickStealerToggler = document.getElementById('click-stealer-toggler');
    var form = document.querySelector('form');
    var iframe = document.querySelector('iframe');
    var collapsibleHandlers = document.querySelectorAll('[data-collapsible-handle]');
    var collapsibleTarget = document.querySelector('[data-collapsible-target]');

    imparitySelector.addEventListener('change', emulateVisualImparity, false);
    colorBlindnessSelector.addEventListener('change', emulateColorBlindness, false);
    clickStealerToggler.addEventListener('change', toggleClickStealer, false);
    form.addEventListener('submit', submitHandler, false);
    [].forEach.call(collapsibleHandlers, function(collapsible) {
        collapsible.addEventListener('click', toggleMenu, false);
    });

    function toggleClickStealer() {
        main.classList.toggle('is-disabled');
    }

    function emulateVisualImparity(event) {
        var imparityLevel = event.target.value;

        [].forEach.call(imparitySelector.options, function(option) {
            iframe.classList.remove(option.value);
        });

        iframe.classList.add(imparityLevel);
    }

    function emulateColorBlindness(event) {
        var colorBlindnessLevel = event.target.value;

        [].forEach.call(colorBlindnessSelector.options, function(option) {
            iframe.classList.remove(option.value);
        });

        iframe.classList.add(colorBlindnessLevel);
    }

    function submitHandler(e) {
        e.preventDefault();
        var url = form.url.value;

        if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
            url = "http://" + url;
        }

        iframe.src = url;
    }

    function toggleMenu() {
        collapsibleTarget.classList.toggle('is-open');
    }

}());