import { Box, Typography } from "@mui/material";

const Headers = ({
    text,
    noBorder,
    fontColor,
    fontVariant
}: any) => {
    return (
        <Box sx={{
            p: 2, bgcolor: "white",
            ...(!noBorder && { borderTop: '1px solid #f2e7e7', borderRight: '1px solid #f2e7e7', borderBottom: '1px solid #f2e7e7' })
        }}>
            <Typography variant={fontVariant || 'h6'} ml={1} color={fontColor || 'black'} fontWeight='bold'>
                {text}
            </Typography>
        </Box>
    )
}

export default Headers;