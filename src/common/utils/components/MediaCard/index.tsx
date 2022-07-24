import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface IProps {
  title: string;
  description: string | null;
  image: string;
}

export default function MediaCard({ image, title, description }: IProps) {
  return (
    <Card sx={{ maxWidth: 345 }} elevation={8}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
