import { useState } from 'react';
import { SettingsFlyout } from './SettingsFlyout';

export default function SettingsPage() {
  const [open, setOpen] = useState(true);
  return <SettingsFlyout open={open} onClose={() => setOpen(false)} />;
}
