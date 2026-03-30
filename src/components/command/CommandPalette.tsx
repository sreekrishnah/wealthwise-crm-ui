import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useAppStore } from "@/store/app-store";
import { mockClients } from "@/data/mock-data";
import { LayoutDashboard, Users, BarChart3, Settings, User } from "lucide-react";

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useAppStore();
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    setCommandOpen(false);
  };

  return (
    <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
      <CommandInput placeholder="Search clients, navigate…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => go("/")}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/clients")}>
            <Users className="mr-2 h-4 w-4" /> Clients
          </CommandItem>
          <CommandItem onSelect={() => go("/analytics")}>
            <BarChart3 className="mr-2 h-4 w-4" /> Analytics
          </CommandItem>
          <CommandItem onSelect={() => go("/settings")}>
            <Settings className="mr-2 h-4 w-4" /> Settings
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Clients">
          {mockClients.slice(0, 5).map((c) => (
            <CommandItem key={c.id} onSelect={() => go(`/clients/${c.id}`)}>
              <User className="mr-2 h-4 w-4" /> {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
