import { Box, CircularProgress, Typography } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FilePreview = ({
    name,
    size
}: any) => {
    return (
        <Box display="flex" sx={{cursor: 'pointer'}}>
            <Box sx={{mr: 2}}>
                <InsertDriveFileIcon color="primary" style={{width: 32, height: 32, marginTop: 2}}/>
            </Box>
            <Box sx={{flexGrow: 1}}>
                <Typography variant="body2">{name}</Typography>
                <Typography variant="caption" sx={{ color: '#534949' }}>File • </Typography>
                <Typography variant="caption" sx={{ color: '#534949' }}>{size}</Typography>
            </Box>
            <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <CircularProgress sx={{ml: 2}} size="24px" variant="determinate" value={50} />
            </Box>
        </Box>
    )
}

export default FilePreview;