import { AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { FiLink } from 'react-icons/fi';

import DeleteModal from '@/src/ui/modal/delete-modal';
import Modal from '@/src/ui/modal/modal';
import Menus from '@/src/ui/menus';
import toast from 'react-hot-toast';

function CommentOptions({
   id,
   userID,
   replyID,
   articleID,
   session,
   onDelete,
   repliesInThisArticle,
}) {
   const [openDelete, setOpenDelete] = useState();
   const t = useTranslations('Comment');

   return (
      <>
         <Menus>
            <Menus.Toggle id={String(id)} />

            <Menus.List id={String(id)}>
               <Menus.Button
                  icon={<FiLink className="stroke-[1.7px]" />}
                  handler={() => {
                     const baseUrl =
                        window.location.origin + window.location.pathname;
                     const fullUrl = `${baseUrl}#comment-${id}`;

                     navigator.clipboard.writeText(fullUrl);
                     toast.success(t('link'));
                  }}
               >
                  {t('copy-link-btn')}
               </Menus.Button>

               {session?.user?.userID === userID && (
                  <>
                     {/* <Menus.Button
                     icon={<LuPencilLine className="stroke-[1.7px]" />}
                     // handler={() => navigate(`/edit/:${id}`)}
                     >
                        Edit
                     </Menus.Button> */}

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
                     onClose={() => setOpenDelete(false)}
                     commentID={id}
                     replyID={replyID}
                     articleID={articleID}
                     onDelete={onDelete}
                     repliesInThisArticle={repliesInThisArticle}
                  />
               </Modal>
            )}
         </AnimatePresence>
      </>
   );
}

export default CommentOptions;
