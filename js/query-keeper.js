document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const storedParams = new URLSearchParams(localStorage.getItem("queryParams") || "");

    const includeKeys = ['ttclid', 'ycid', 'fbclid', 'gclid', 'gbraid', 'wbraid', "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

    const filteredParams = new URLSearchParams();
    params.forEach((value, key) => {
        if (includeKeys.includes(key)) {
            filteredParams.set(key, value);
        }
    });

    filteredParams.forEach((value, key) => {
        storedParams.set(key, value);
    });

    console.log("Filtered Query Params:", filteredParams.toString());

    if (storedParams.toString()) {
        localStorage.setItem("queryParams", storedParams.toString());
    }

    applyParamsToLinks(storedParams);

    applyParamsToForms(storedParams);
});

function applyParamsToLinks(storedParams) {
    if (!storedParams.toString()) return;

    document.querySelectorAll("a").forEach((a) => {
        let href = a.getAttribute("href");
        if (!href) return;

        let url = new URL(href, window.location.href); // 相対パス対応

        storedParams.forEach((value, key) => {
            url.searchParams.set(key, value);
        });

        a.setAttribute("href", url.toString());
    });
}

function applyParamsToForms(storedParams) {
    if (!storedParams.toString()) return;

    document.querySelectorAll("form").forEach((form) => {
        storedParams.forEach((value, key) => {
            if (!form.querySelector(`input[name="${key}"]`)) {
                let hiddenInput = document.createElement("input");
                hiddenInput.type = "hidden";
                hiddenInput.name = key;
                hiddenInput.value = value;
                form.appendChild(hiddenInput);
            }
        });
    });
}
