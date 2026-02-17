import RemoteImage from '@/src/ui/image/remote-image';
import defaultPfp from '@/public/default-pfp.png';

function ProfileInfo({ oldUser, newUser }) {
   const { email, image } = oldUser;
   const { name, image: newImage } = newUser;

   const profileImage = newImage ? newImage : image ? image : defaultPfp;

   return (
      <div className="self-start w-fit md:w-full flex flex-col items-center gap-6 bg-white dark:bg-primary-300/10 border border-quaternary dark:border-primary-300/15 rounded-3xl px-28 2xl:px-20 md:px-10 py-20 2xl:py-16 text-3xl box-shadow transition-bg_border">
         <div className="relative size-30 lg:size-26 md:size-30">
            <RemoteImage
               imageUrl={profileImage}
               alt="User profile image"
               styles={`block aspect-square object-cover object-center rounded-full border border-quaternary dark:opacity-90 ${profileImage === defaultPfp ? 'dark:opacity-40!' : ''}`}
               priority
            />
         </div>

         <div className="flex flex-col gap-3 self-center text-center">
            <div className="flex flex-col">
               <h2 className="text-accent-400 dark:text-accent text-5xl lg:text-[2.7rem] md:text-5xl w-fit self-center font-logo">
                  {name}
               </h2>
            </div>

            <p className="text-lg xs:text-xl">{email}</p>
         </div>
      </div>
   );
}

export default ProfileInfo;
