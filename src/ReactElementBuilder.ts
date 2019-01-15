import { MaybeArray, ComponentJson } from './JsonReactTypes';

class ReactElementBuilder {
  static build(json: undefined): undefined;
  static build(json: ComponentJson[]) : React.ReactElement<any>[];
  static build(json: ComponentJson): React.ReactElement<any>;
  static build(json: MaybeArray<ComponentJson> | undefined): MaybeArray<React.ReactElement<any>> | undefined {
       
  }
}

export default ReactElementBuilder;