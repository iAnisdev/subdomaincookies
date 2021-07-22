var queryString = new URL(window.location).search;
document.querySelectorAll("[href]").forEach(link => {
    var current = link.href;
    link.href = current + queryString;
});
