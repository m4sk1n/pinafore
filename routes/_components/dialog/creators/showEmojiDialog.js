import EmojiDialog from '../components/EmojiDialog.html'
import { createDialogElement } from '../helpers/createDialogElement'
import { createDialogId } from '../helpers/createDialogId'

export default function showEmojiDialog (realm) {
  let emojiDialog = new EmojiDialog({
    target: createDialogElement(),
    data: {
      id: createDialogId(),
      label: 'Dialog emoji',
      title: 'Niestandardowe emoji',
      realm
    }
  })
  emojiDialog.show()
}
