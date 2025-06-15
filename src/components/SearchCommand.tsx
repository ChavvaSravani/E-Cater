import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";

// Define the categories and their subcategories
const searchCategories = [
  {
    group: "Events",
    items: [
      { name: "Wedding", href: "/vendors?event=wedding" },
      { name: "Corporate", href: "/vendors?event=corporate" },
      { name: "Birthday", href: "/vendors?event=birthday" },
      { name: "Anniversary", href: "/vendors?event=anniversary" },
    ],
  },
  {
    group: "Cuisines",
    items: [
      { name: "Indian", href: "/vendors?cuisine=indian" },
      { name: "Chinese", href: "/vendors?cuisine=chinese" },
      { name: "Italian", href: "/vendors?cuisine=italian" },
      { name: "Mexican", href: "/vendors?cuisine=mexican" },
      { name: "Continental", href: "/vendors?cuisine=continental" },
    ],
  },
  {
    group: "Dietary",
    items: [
      { name: "Vegetarian", href: "/vendors?dietary=vegetarian" },
      { name: "Vegan", href: "/vendors?dietary=vegan" },
      { name: "Gluten Free", href: "/vendors?dietary=gluten-free" },
      { name: "Halal", href: "/vendors?dietary=halal" },
    ],
  },
];

export function SearchCommand() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Handle the selection of an item
  const handleSelect = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full flex items-center text-sm font-medium text-muted-foreground rounded-md border border-input px-3 py-2 hover:bg-accent hover:text-accent-foreground"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search categories...</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Type to search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {searchCategories.map((category) => (
              <CommandGroup key={category.group} heading={category.group}>
                {category.items.map((item) => (
                  <CommandItem
                    key={item.name}
                    onSelect={() => handleSelect(item.href)}
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
} 