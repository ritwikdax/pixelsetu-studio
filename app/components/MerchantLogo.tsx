import { Box, StudioIcon, usePixelTheme } from "@ritwikdax/uicc";
import { useAuthContextQuery } from "../queries/useAuthContext";

export default function MerchantLogo() {
  const { data } = useAuthContextQuery();
  const { resolvedTheme } = usePixelTheme();

  return (
    <div className="ml-4">
      <div className="flex flex-row gap-3 items-center">
        <Box
          style={{
            width: "var(--space-7)",
            height: "var(--space-7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <StudioIcon />
        </Box>

        <img
          loading="lazy"
          src={
            data
              ? resolvedTheme === "dark"
                ? data.org?.lightLogoUrl
                : data.org?.darkLogoUrl
              : "https://pixelsetu.com/favicon.ico"
          }
          alt="PixelSetu Logo"
          style={{ width: "auto", height: "32px", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
