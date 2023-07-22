import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const OnPlay = (id: string) => {
    console.log("onPlay called with id:", id);
    if (!user) {
      console.log("User is not logged in");
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };
  return OnPlay;
};

export default useOnPlay;
