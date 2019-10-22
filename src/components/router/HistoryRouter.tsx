import { createBrowserHistory } from "history";
declare global {
  interface Window {
    dataLayer: any;
  }
}
const historyRouter = createBrowserHistory();
export default historyRouter;
