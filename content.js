(function() {
    'use strict';
    const rawFillText = CanvasRenderingContext2D.prototype.fillText;
    CanvasRenderingContext2D.prototype.fillText = function(text, x, y, maxWidth) {
        if (!isNaN(parseInt(text)) && text.toString().length >= 5) {
            window.morgen = text.toString();
        }
        return rawFillText.apply(this, arguments);
    };
    document.addEventListener('keydown', (event) => {
        const debil = document.getElementById('megasuperbebra');
        const capActive = window.captchaStatus === 1 || (debil && debil.offsetParent !== null);

        if (capActive) {
            const isNumber = /^\d$/.test(event.key);

            if (isNumber) {
                event.preventDefault();
                event.stopImmediatePropagation();

                const verniy = window.morgen ? window.morgen.toString() : "";

                if (debil && verniy) {
                    let pos = debil.value.length;
                    if (pos < verniy.length) {
                        debil.value += verniy[pos];
                        debil.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }
            } else if (event.key !== "Backspace" && event.key !== "Enter" && event.key !== "Escape") {
                event.preventDefault();
            }
        }
    }, true);
})();