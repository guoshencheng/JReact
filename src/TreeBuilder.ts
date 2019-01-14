import { MaybeArray, ComponentJson } from './JsonReactTypes';
import Tree from './tools/tree';
import { JsonReactTreeNodeData, JsonReact } from './JsonReact';


class TreeBuilder {
  static build(json: undefined): undefined;
  static build(json: ComponentJson[]) : Tree<JsonReactTreeNodeData>[];
  static build(json: ComponentJson): Tree<JsonReactTreeNodeData>;
  static build(json: MaybeArray<ComponentJson> | undefined): MaybeArray<Tree<JsonReactTreeNodeData>> | undefined {
    
  }
}

export default TreeBuilder;