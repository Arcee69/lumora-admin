import { useState } from "react";
import type { ReactNode } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { IconButton } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { StatusBadge } from "../ui/Badge";
import { Overlay } from "./Overlay";

export interface SearchResult {
  id: string;
  title: string;
  subtitle?: ReactNode;
  status?: string;
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
  /** Called on every keystroke; return matching results (filter locally or from cached API data). */
  search: (query: string) => SearchResult[];
  onSelect: (result: SearchResult) => void;
  placeholder?: string;
}

/** Global command palette ("Search anything…"). Pair with useHotkey('k') to open on Ctrl/⌘ K. */
export const SearchDialog = ({ open, ...props }: SearchDialogProps) =>
  // Mounting the body only while open resets the query each time the palette opens.
  open ? <SearchDialogBody {...props} /> : null;

const SearchDialogBody = ({
  onClose,
  search,
  onSelect,
  placeholder = "Search members, providers, claims...",
}: Omit<SearchDialogProps, "open">) => {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const results = trimmed ? search(trimmed) : [];

  return (
    <Overlay onClose={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        className="w-[630px] max-w-[95vw] overflow-hidden rounded-[10px] bg-white shadow-[0_15px_70px_#12332244]"
      >
        <div className="flex items-center gap-[13px] border-b border-line p-4 text-[#698a60] md:p-[21px]">
          <LuSearch size={20} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label="Global search query"
            className="min-w-0 flex-1 text-sm text-ink outline-none md:text-base"
          />
          <IconButton aria-label="Close search" onClick={onClose}>
            <LuX size={19} />
          </IconButton>
        </div>
        <div className="max-h-[60vh] overflow-auto p-2.5">
          {trimmed && !!results.length && (
            <p className="px-3 py-2 text-xs text-[#839378]">{results.length} matching records shown</p>
          )}
          {results.map((result) => (
            <button
              key={result.id}
              type="button"
              onClick={() => {
                onSelect(result);
                onClose();
              }}
              className="flex min-h-16 w-full items-center gap-[13px] rounded-[5px] p-3 text-left hover:bg-brand-50"
            >
              <Avatar name={result.title} shape="square" />
              <div className="min-w-0 flex-1">
                <strong className="text-sm font-medium">{result.title}</strong>
                {result.subtitle && <small className="mt-1 block text-xs text-[#90a17f]">{result.subtitle}</small>}
              </div>
              {result.status && <StatusBadge value={result.status} />}
            </button>
          ))}
          {(!trimmed || !results.length) && (
            <p className="p-[25px] text-[13px] text-[#839378]">
              {trimmed
                ? "No results found. Try another name or reference."
                : "Search by name, reference or organisation across every module."}
            </p>
          )}
        </div>
      </section>
    </Overlay>
  );
};
