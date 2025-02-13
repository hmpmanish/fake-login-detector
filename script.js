document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const warning = document.getElementById("warning");
    const securityInfo = document.getElementById("securityInfo");

    // Current website domain
    const currentDomain = window.location.hostname;

    // Form action domain
    const formAction = new URL(form.action);
    const actionDomain = formAction.hostname;

    // ⚠️ List of known phishing domains (can be fetched from an external file)
    const phishingDomains = [
        "malicious-site.com",
        "fakebank-login.com",
        "secure-update.net"
    ];

    // 1️⃣ Check if the form submits to a different domain
    if (currentDomain !== actionDomain) {
        warning.innerText = "⚠️ WARNING: This login form submits to a different website!";
        warning.style.color = "red";
    } else {
        warning.innerText = "✅ Safe: This form submits to the same site.";
        warning.style.color = "green";
    }

    // 2️⃣ Check for HTTPS security
    if (window.location.protocol !== "https:") {
        securityInfo.innerText += "⚠️ WARNING: This site is not using HTTPS. Your data may not be secure!\n";
        securityInfo.style.color = "orange";
    }

    // 3️⃣ Check if the domain is in the phishing list
    if (phishingDomains.includes(actionDomain)) {
        warning.innerText += "\n🚨 ALERT: This website is in the known phishing list!";
        warning.style.color = "red";
    }

    // 4️⃣ Detect suspicious words in the domain or title
    const suspiciousWords = ["secure", "verify", "update", "confirm"];
    let foundSuspiciousWord = suspiciousWords.some(word => 
        currentDomain.includes(word) || document.title.toLowerCase().includes(word)
    );

    if (foundSuspiciousWord) {
        warning.innerText += "\n⚠️ Suspicious keywords detected in the URL or page title!";
        warning.style.color = "red";
    }

    // 5️⃣ Detect encoded URLs
    if (decodeURIComponent(window.location.href) !== window.location.href) {
        warning.innerText += "\n⚠️ WARNING: URL contains encoded characters, possible phishing attempt!";
        warning.style.color = "red";
    }
});
