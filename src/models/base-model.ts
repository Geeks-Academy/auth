/** 
 * A base interface for all attached models.
 */
export interface IBaseModelAttached {
  /**
   * An immutable, unique Id of the object.
   * To prevent future compatibility issues, this ID is always of type String.
   */
  readonly id: string;
}