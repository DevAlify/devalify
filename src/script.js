ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400
})

// Animate Section Home


ScrollReveal().reveal('#profile-text', {
    delay: 200, origin: 'right', reset: false
});

// Animate Section Skills
ScrollReveal().reveal('.skills', {
    origin: 'bottom', reset: true
});

ScrollReveal().reveal('#ip-linkedin', {
    origin: 'left', delay: 200, reset: false
});
ScrollReveal().reveal('#ip-github', {
    origin: 'right', delay: 200, reset: false
})