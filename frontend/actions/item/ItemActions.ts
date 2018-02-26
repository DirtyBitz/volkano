import { Dispatch } from 'react-redux'
import { IStoreState } from '../../store/StoreState'
import { ItemApi, ICollectionData } from '../../api/ItemApi'
import ItemActionTypeKeys from './ItemActionTypeKeys'
import {
  IItemPendingAction,
  IItemFulfilledAction,
  IItemRejectedAction,
} from './ItemActionTypes'

export const allItems = (token: string) => {
  return async (dispatch: Dispatch<IStoreState>) => {
    dispatch(itemPending())
    try {
      const response = await ItemApi.getAllItems(token)
      dispatch(itemSuccess(response))
    } catch (error) {
      dispatch(itemError(error))
    }
  }
}
export const itemPending = (): IItemPendingAction => ({
  type: ItemActionTypeKeys.ITEM_PENDING,
})

export const itemSuccess = (data: ICollectionData): IItemFulfilledAction => ({
  type: ItemActionTypeKeys.ITEM_FULFILLED,
  payload: data,
})

export const itemError = (error: string[]): IItemRejectedAction => ({
  type: ItemActionTypeKeys.ITEM_REJECTED,
  payload: error,
})