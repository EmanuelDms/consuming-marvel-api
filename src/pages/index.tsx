import { Container, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { marvel } from "@common/services/api";
import { Comic } from "@comics/types";
import MediaCard from "@common/utils/components/MediaCard";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await marvel.findAllComics();

  return {
    props: {
      comics: data.data.results,
    },
  };
};

interface Props {
  comics: Comic[];
}

const getFavoriteComicsIds = () => {
  if (typeof window !== "undefined") {
    const unparsedFavoriteComicsIds = String(
      localStorage.getItem("favoriteComicsIds")
    );
    const favoriteComicsIds: number[] =
      unparsedFavoriteComicsIds === "null"
        ? []
        : JSON.parse(unparsedFavoriteComicsIds);
    return favoriteComicsIds;
  }
};

const Home: NextPage<Props> = ({ comics }: Props) => {
  const [favoriteComicsIds, setFavoriteComicsIds] = useState<
    number[] | undefined
  >(getFavoriteComicsIds());

  return (
    <Stack>
      <Head>
        <title>Marvel Comic Store - Sua loja de quadrinhos da marvel!</title>
        <meta name="description" content="marvel comics store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack alignItems="center" gap={4} width="100vw">
        {comics.map(({ id, title, description, thumbnail }) => (
          <MediaCard
            id={id}
            title={title}
            description={description}
            image={`${thumbnail.path}.${thumbnail.extension}`}
            favoriteComicsIds={favoriteComicsIds}
            onFavorite={() => {
              setFavoriteComicsIds(getFavoriteComicsIds());
            }}
            key={id}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
