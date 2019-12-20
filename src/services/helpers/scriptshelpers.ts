export const loadScript = (src: string) => {
    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    document.body.appendChild(script);
}
export const loadStyles = (src: string) => {
    const link = document.createElement("link");
    link.href = src;
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
}