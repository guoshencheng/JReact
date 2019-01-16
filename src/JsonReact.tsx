import ReactElementBuilder from './ReactElementBuilder';
import { JRComponent } from './JsonReactTypes';
import Logger from './Logger';

export default class JsonReact {
  static Logger = Logger
  static RegisterComponent(jrComp: JRComponent, name?: string) {
    name = name || jrComp.name;
    if (!name) {
      this.Logger.warn(`register component should provide a name!`, jrComp);
      return;
    }
    ReactElementBuilder.RegisterComponent(name, jrComp);
  }
}