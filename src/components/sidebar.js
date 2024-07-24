"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import BoyIcon from "@mui/icons-material/Boy";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarIcon from "@mui/icons-material/Star";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ContactPhoneOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import Link from "next/link";
import Image from "next/image";
import logo from ".././../public/faviconLiveload.png";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
  {
    text: "Individual Users",
    icon: <PersonOutlineOutlinedIcon />,
    link: "/individualUser",
  },
  { text: "Business Users", icon: <GroupOutlinedIcon />, link: "#" },
  { text: "Vendors", icon: <BoyIcon />, link: "#" },
  { text: "Drivers", icon: <AirlineSeatReclineNormalIcon />, link: "#" },
  { text: "Orders", icon: <FormatListBulletedIcon />, link: "#" },
  { text: "Reviews", icon: <StarIcon />, link: "#" },
  { text: "Transactions", icon: <ReceiptLongOutlinedIcon />, link: "#" },
  { text: "Withdrawals", icon: <CreditCardOutlinedIcon />, link: "#" },
  { text: "Item Categories", icon: <EventNoteIcon />, link: "#" },
  { text: "Vehicle Categories", icon: <LocalShippingIcon />, link: "#" },
  { text: "Notifications", icon: <NotificationsNoneOutlinedIcon />, link: "#" },
  { text: "Contacts Us", icon: <ContactPhoneOutlinedIcon />, link: "#" },
  { text: "FAQ's", icon: <LiveHelpOutlinedIcon />, link: "#" },
  { text: "CMS Pages", icon: <AutoStoriesOutlinedIcon />, link: "#" },
  {
    text: "Settings",
    icon: <SettingsSuggestOutlinedIcon />,
    link: "/settings",
  },
];

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const initialSelectedItem =
    menuItems.find((item) => router.pathname === item.link) || menuItems[0];
  const [selectedItem, setSelectedItem] = React.useState(initialSelectedItem);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "white" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}{" "}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Liveload's | Welcome Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Image src={logo} alt="Logo" width={220} height={80} />
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
              selected={selectedItem === item}
              onClick={() => handleMenuItemClick(item)}
              button
            >
              <Link href={item.link} passHref>
                <ListItemButton selected={selectedItem === item}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}></Main>
    </Box>
  );
}
