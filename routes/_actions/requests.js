import { store } from '../_store/store'
import { approveFollowRequest, rejectFollowRequest } from '../_api/requests'
import { emit } from '../_utils/eventBus'
import { toast } from '../_utils/toast'

export async function setFollowRequestApprovedOrRejected (accountId, approved, toastOnSuccess) {
  let {
    currentInstance,
    accessToken
  } = store.get()
  try {
    if (approved) {
      await approveFollowRequest(currentInstance, accessToken, accountId)
    } else {
      await rejectFollowRequest(currentInstance, accessToken, accountId)
    }
    if (toastOnSuccess) {
      if (approved) {
        toast.say('Zaakceptowano prośbę o śledzenie')
      } else {
        toast.say('Odrzucono prośbę o śledzenie')
      }
    }
    emit('refreshAccountsList')
  } catch (e) {
    console.error(e)
    toast.say(`Nie udało się ${approved ? 'przyjąć' : 'odrzucić'} konta: ` + (e.message || ''))
  }
}
