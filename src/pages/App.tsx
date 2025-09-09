import { Box } from "@mui/material";
import ActiveDevices from "../elements/ActiveDevices ";
import FileChooser from "../elements/FileChooser";
import IncomingRequests from "../elements/IncomingRequests";
import OutgoingRequests from "../elements/OutgoingRequests";

export default function App() {


  return (
    <Box display='flex' gap={1}>
      <IncomingRequests />
      <Box display='flex' flexDirection='column'>
        <ActiveDevices />
        <FileChooser />
      </Box>
      <OutgoingRequests />
    </Box>
  )
}