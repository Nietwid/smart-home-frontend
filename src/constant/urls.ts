export const websocketUrl = import.meta.env.DEV
    ? "http://localhost:80"
    : "wss://sh.halpiszony.dpdns.org";
export const baseURL = import.meta.env.DEV
    ? "http://localhost:80"
    : "https://sh.halpiszony.dpdns.org";
