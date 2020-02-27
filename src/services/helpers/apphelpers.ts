export const isAppInstalled = () => window.matchMedia("(display-mode: standalone)")
    .matches;