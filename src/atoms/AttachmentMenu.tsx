import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';

const AttachmentMenu = ({
    open,
    anchorEl,
    handleMenuClose
}: any) => {

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
                vertical: "top",    // where the menu is "attached" relative to the button
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "bottom", // where the menu grows from
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    sx: { mt: -4 }
                }
            }}>
            <MenuItem component="label">
                <ListItemIcon>
                    <InsertDriveFileIcon color="primary" />
                </ListItemIcon>
                Files
                <input multiple type="file" hidden />
            </MenuItem>
            <MenuItem component="label">
                <ListItemIcon>
                    <FolderIcon color="primary" />
                </ListItemIcon>
                Folders
                <input
                    multiple
                    type="file"
                    // @ts-ignore
                    webkitdirectory=""
                    hidden />
            </MenuItem>
        </Menu>
    )
}

export default AttachmentMenu;