import { Toaster as SonnerToaster } from "sonner";
import { LuCircleCheck } from "react-icons/lu";

/**
 * Lumora-styled toast host. Mount once (e.g. in App) and call `toast("Saved")` from "sonner" anywhere.
 */
export const Toaster = () => (
  <SonnerToaster
    position="bottom-center"
    icons={{ success: <LuCircleCheck size={19} /> }}
    toastOptions={{
      unstyled: true,
      classNames: {
        toast:
          "flex max-w-[90vw] items-center gap-[11px] rounded-lg bg-brand-950 px-[21px] py-3.5 text-[13px] text-white shadow-[0_8px_35px_#12332640]",
        error: "bg-[#7a3a2f]",
      },
    }}
  />
);
