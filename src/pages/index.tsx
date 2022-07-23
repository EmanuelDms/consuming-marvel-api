import { Container, Stack, Typography } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { marvel } from "@common/services/api";
import { Comic } from "@comics/types";
import MediaCard from "@common/utils/components/MediaCard";

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

const Home: NextPage<Props> = ({ comics }: Props) => {
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
            title={title}
            description={description}
            image={`${thumbnail.path}.${thumbnail.extension}`}
            key={id}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
