import VideoDialog from '../components/VideoDialog.html'
import { createDialogElement } from '../helpers/createDialogElement'
import { createDialogId } from '../helpers/createDialogId'

export default function showVideoDialog (poster, src, width, height, description) {
  let videoDialog = new VideoDialog({
    target: createDialogElement(),
    data: {
      id: createDialogId(),
      label: 'Dialog filmu',
      poster,
      src,
      width,
      height,
      description
    }
  })
  videoDialog.show()
}
