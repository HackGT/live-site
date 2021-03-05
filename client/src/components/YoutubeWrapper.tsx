import YouTube from "react-youtube";

type Props = {
  videoID: string;
};

const YoutubeWrapper: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <YouTube
        videoId={props.videoID}
        opts={{ height: "650", width: "900", playerVars: { autoplay: 1 } }}
      />
    </div>
  );
};

export default YoutubeWrapper;
