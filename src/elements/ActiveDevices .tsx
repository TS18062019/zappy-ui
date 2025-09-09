import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Checkbox,
  Avatar,
} from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";

interface Device {
  id: string;
  name: string;
  ip: string;
  icon?: React.ReactNode;
}

interface DeviceCardProps {
  device: Device;
  selected: boolean;
  onSelect: (id: string) => void;
}

const DeviceCard = ({ device, selected, onSelect }: DeviceCardProps) => (
  <Card
    onClick={() => onSelect(device.id)}
    sx={{
      position: "relative",
      width: 180,
      minWidth: 180,
      cursor: "pointer",
      border: selected ? "2px solid #4caf50" : "1px solid #ccc",
      transition: "0.2s",
      "&:hover": { boxShadow: 3 },
    }}
  >
    {/* Checkbox overlay */}
    {selected && (
      <Checkbox
        checked
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: "#4caf50",
          pointerEvents: "none",
        }}
      />
    )}

    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
        {device.icon || <DevicesIcon />}
      </Avatar>
      <Typography variant="subtitle1" textAlign="center">
        {device.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {device.ip}
      </Typography>
    </CardContent>
  </Card>
);

export default function ActiveDevices() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const devices: Device[] = [
    { id: "1", name: "Device 1", ip: "192.168.0.1" },
    { id: "2", name: "Device 2", ip: "192.168.0.2" },
    { id: "3", name: "Device 3", ip: "192.168.0.3" },
    { id: "4", name: "Device 4", ip: "192.168.0.4" },
    { id: "5", name: "Device 5", ip: "192.168.0.5" },
    { id: "6", name: "Device 6", ip: "192.168.0.6" },
    // Add more for testing
  ];

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        overflowX: "auto",
        p: 1,
      }}
    >
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          device={device}
          selected={selectedIds.includes(device.id)}
          onSelect={handleSelect}
        />
      ))}
    </Box>
  );
}
