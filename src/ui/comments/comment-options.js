import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuPencilLine } from 'react-icons/lu';
import { useState } from 'react';
import { useAuth } from '@/src/context/auth-context';
import { CgClose } from 'react-icons/cg';
import { FiLink } from 'react-icons/fi';

import DeleteModal from '@/src/ui/modal/delete-modal';
import EditModal from '@/src/ui/modal/edit-modal';
import Modal from '@/src/ui/modal/modal';
import Menus from '@/src/ui/menus';
import toast from 'react-hot-toast';

function CommentOptions({
   comment,
   commentLength,
   userID,
   replyID,
   slug,
   articleID,
   onDelete,
}) {
   const [openDelete, setOpenDelete] = useState();
   const [openEdit, setOpenEdit] = useState();
   const { session } = useAuth();

   const t = useTranslations('Comment');
   const commentID = comment.id;

   return (
      <>
         <Menus>
            <Menus.Toggle id={String(commentID)} />

            <Menus.List id={String(commentID)}>
               <Menus.Button
                  icon={<FiLink className="stroke-[1.7px]" />}
                  handler={() => {
                     const baseUrl =
                        window.location.origin + window.location.pathname;
                     const fullUrl = `${baseUrl}#comment-${commentID}`;

                     navigator.clipboard.writeText(fullUrl);
                     toast.success(t('link'));
                  }}
               >
                  {t('copy-link-btn')}
               </Menus.Button>

               {session?.user?.userID === userID && (
                  <>
                     <Menus.Button
                        icon={<LuPencilLine className="stroke-[1.7px]" />}
                        handler={() => setOpenEdit(true)}
                     >
                        Edit
                     </Menus.Button>

                     <Menus.Button
                        icon={
                           <CgClose className="text-red-600/70 dark:text-red-300" />
                        }
                        handler={() => setOpenDelete(true)}
                     >
                        <span>{t('delete-btn')}</span>
                     </Menus.Button>
                  </>
               )}
            </Menus.List>
         </Menus>

         <AnimatePresence>
            {openDelete && (
               <Modal closeModal={() => setOpenDelete(false)}>
                  <DeleteModal
                     slug={slug}
                     onClose={() => setOpenDelete(false)}
                     commentID={commentID}
                     replyID={replyID}
                     articleID={articleID}
                     onDelete={onDelete}
                  />
               </Modal>
            )}
         </AnimatePresence>

         <AnimatePresence>
            {openEdit && (
               <Modal closeModal={() => setOpenEdit(false)}>
                  <EditModal
                     comment={comment}
                     commentLength={commentLength}
                     slug={slug}
                     onClose={() => setOpenEdit(false)}
                     replyID={replyID}
                  />
               </Modal>
            )}
         </AnimatePresence>
      </>
   );
}

export default CommentOptions;
