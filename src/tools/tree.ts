export default class Tree<T> {
  parent: Tree<T>
  data: T
  children: Tree<T>[] = []
  insert(child: Tree<T>) {
    this.children.push(child);
    child.parent = this;
  }
}