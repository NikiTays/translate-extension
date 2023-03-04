import React, { FC } from "react";
import {
  Container,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { menuData } from "./const/menuData";

interface IOwnProps {
  children: JSX.Element;
}

export const Menu: FC<IOwnProps> = (props) => {
  const { children } = props;

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Grid container spacing={3} sx={{ maxHeight: "700px", height: "100%" }}>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ margin: "10px 16px 0px 16px", display: "inline-block" }}
            >
              Settings
            </Typography>
            <MenuList>
              {menuData.map((item, itemIndex) => {
                return (
                  <React.Fragment key={item.name}>
                    <Divider />
                    <Link to={item.link} style={{ all: "unset" }}>
                      <MenuItem>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.name}</ListItemText>
                      </MenuItem>
                    </Link>
                    {menuData.length === itemIndex + 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3} sx={{ height: "100%", padding: "16px" }}>
            {children}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
