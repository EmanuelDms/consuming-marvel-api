import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardHeader, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useMemo, useState } from "react";

interface IProps {
  id: number;
  title: string;
  description: string | null;
  image: string;
  favoriteComicsIds: number[] | undefined;
  onFavorite: () => void;
}

export default function MediaCard({
  id,
  image,
  title,
  description,
  favoriteComicsIds,
  onFavorite,
}: IProps) {
  const [currentColor, setCurrentColor] = useState<"inherit" | "error">(
    "inherit"
  );

  const currentCardFavorited = useMemo(
    () => favoriteComicsIds?.some((favoriteComicId) => favoriteComicId === id),
    [favoriteComicsIds, id]
  );

  useEffect(() => {
    if (currentCardFavorited) {
      setCurrentColor("error");
    } else {
      setCurrentColor("inherit");
    }
  }, [currentCardFavorited]);

  return (
    <Card sx={{ maxWidth: 345 }} elevation={8}>
      <CardHeader
        action={
          <IconButton
            aria-label="add to favorites"
            onClick={() => {
              onFavorite();

              let newFavoriteComicsIds: number[] | undefined = [];

              if (currentCardFavorited) {
                newFavoriteComicsIds = favoriteComicsIds?.filter(
                  (favoriteComicId) => favoriteComicId !== id
                );
              } else {
                newFavoriteComicsIds = favoriteComicsIds
                  ? [...favoriteComicsIds, id]
                  : [];
              }

              localStorage.setItem(
                "favoriteComicsIds",
                JSON.stringify(newFavoriteComicsIds)
              );
              onFavorite();
            }}
          >
            <FavoriteIcon color={currentColor} />
          </IconButton>
        }
        title={title}
      />
      <CardMedia component="img" image={image} alt={title} />
      {description && (
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}
