import { useState, type ReactNode } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { ExpandMore, ChevronRight, UploadFile, Folder, Description, Image, VideoLibrary, Delete } from "@mui/icons-material";

type TreeNode = { [key: string]: TreeNode | null };

// Icon helper
const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
        case "png": case "jpg": case "jpeg": case "gif": return <Image />;
        case "mp4": case "mkv": case "avi": return <VideoLibrary />;
        case "txt": case "json": case "csv": case "pdf": return <Description />;
        default: return <Description />;
    }
};

export default function FileSelector() {
    // Map: key = absolute path, value = File object
    const [fileMap, setFileMap] = useState<Map<string, File>>(new Map());

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        setFileMap(prev => {
            const newMap = new Map(prev);

            selectedFiles.forEach(file => {
                const path = file.webkitRelativePath || file.name;

                // Skip file if it's already under an existing folder
                let skip = false;
                for (const existingPath of newMap.keys()) {
                    if (path.startsWith(existingPath + "/")) {
                        skip = true;
                        break;
                    }
                }
                if (skip) return;

                // Remove any existing files that are children of this new folder
                for (const existingPath of Array.from(newMap.keys())) {
                    if (existingPath.startsWith(path + "/")) {
                        newMap.delete(existingPath);
                    }
                }

                newMap.set(path, file);
            });

            return newMap;
        });

        event.target.value = ""; // allow re-selecting same folder
    };

    const clearAll = () => setFileMap(new Map());

    const buildTree = (files: Iterable<File>): TreeNode => {
        const tree: TreeNode = {};
        for (const file of files) {
            const parts = file.webkitRelativePath ? file.webkitRelativePath.split("/") : [file.name];
            let current: TreeNode = tree;
            parts.forEach((part, index) => {
                current[part] ??= index === parts.length - 1 ? null : {};
                if (current[part] !== null) current = current[part];
            });
        }
        return tree;
    };

    const renderTree = (nodes: TreeNode, parentId = "root"): ReactNode =>
        Object.entries(nodes).map(([key, value], index) => {
            const itemId = `${parentId}-${index}`;
            const isFolder = value !== null;
            const icon = isFolder ? <Folder /> : getFileIcon(key);
            return (
                <TreeItem
                    key={itemId}
                    itemId={itemId}
                    label={<Box display="flex" alignItems="center" gap={1}>{icon} {key}</Box>}
                >
                    {value && renderTree(value, itemId)}
                </TreeItem>
            );
        });

    const fileTree = buildTree(fileMap.values());

    return (
        <Box display="flex" flexDirection="column" gap={2}>
            {/* File Picker */}
            <Paper sx={{ p: 2, borderRadius: 2, border: "1px dashed", borderColor: "grey.400", textAlign: "center", bgcolor: "grey.50" }}>
                <Typography variant="h6" gutterBottom>Select Files or Folder</Typography>
                <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
                    <Button variant="contained" component="label" startIcon={<UploadFile />}>
                        Choose Files
                        <input type="file" multiple hidden onChange={handleFileChange} />
                    </Button>
                    <Button variant="contained" component="label" startIcon={<Folder />}>
                        Choose Folder
                        <input type="file" hidden {...({ webkitdirectory: "" } as any)} directory="" onChange={handleFileChange} />
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<Delete />} onClick={clearAll}>
                        Clear All
                    </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    You can select multiple files and folders. Previous selections are preserved.
                </Typography>
            </Paper>

            {/* Selected Files Tree */}
            {fileMap.size > 0 && (
                <Paper sx={{ p: 2, borderRadius: 2, maxHeight: 400, overflow: "auto" }}>
                    <Typography variant="subtitle1" gutterBottom>Selected Files</Typography>
                    <SimpleTreeView slots={{ collapseIcon: ExpandMore, expandIcon: ChevronRight }}>
                        {renderTree(fileTree)}
                    </SimpleTreeView>
                </Paper>
            )}
        </Box>
    );
}
