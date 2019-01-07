export default class Tree<T> {
  parent: Tree<T>
  data: T
  children: Tree<T>[]
}