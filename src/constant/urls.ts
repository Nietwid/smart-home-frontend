// export const websocketUrl = import.meta.env.DEV
//   ? "wss://test.halpiszony.dpdns.org"
//   : "wss://sh.halpiszony.dpdns.org";
// export const baseURL = import.meta.env.DEV
//   ? "https://test.halpiszony.dpdns.org"
//   : "https://sh.halpiszony.dpdns.org";
export const websocketUrl = import.meta.env.DEV
    ? "http://localhost:80"
    : "wss://sh.halpiszony.dpdns.org";
export const baseURL = import.meta.env.DEV
    ? "http://localhost:80"
    : "https://sh.halpiszony.dpdns.org";
