import axios from "axios";
import React, { useEffect } from "react";

import VideoCard from "../components/VideoCard";
import { BASE_URL } from "../utils";
import { Video } from "../types";
import NoResults from "../components/NoResults";
import { useRouter } from "next/router";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  // const router = useRouter();

  // useEffect(() => {
  //   videos
  // }, [router]);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};
