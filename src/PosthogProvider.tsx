import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// export function PostHogPageview() {

// //   useEffect(() => {
// //     if (pathname) {
// //       let url = window.origin + pathname;
// //       if (searchParams.toString()) {
// //         url = url + `?${searchParams.toString()}`;
// //       }
// //       posthog.capture("$pageview", {
// //         $current_url: url,
// //       });
// //     }
// //   }, [pathname, searchParams]);
// //   return null;
// // }

export default function PHProvider(props: Props) {
  const { children } = props;

  const token: string = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";

  if (typeof window !== "undefined") {
    posthog.init(token, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
