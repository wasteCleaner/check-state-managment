import { addAction } from "../../actions/state/actions";
import { ReduxAction } from "../../actions/types";

type UpdatedWindow = Window & {
  dispatch: (action: ReduxAction) => void;
}

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((message) => {
    if (message.type && message.type === "check-state-action" && (window as UpdatedWindow).dispatch && message.action) {
      (window as UpdatedWindow).dispatch(addAction(message.action));
    }
  });
});