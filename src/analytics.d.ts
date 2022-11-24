import { Analytics } from "analytics-node";

declare global {
  interface Window {
    analytics?: Analytics;
  }
}
