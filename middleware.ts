import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/qiyada/login",
  },
  // CRITICAL: Explicitly tell the middleware what your secret is
  secret: process.env.NEXTAUTH_SECRET,
});

export const config = {
  // Matches the exact root /qiyada AND all sub-pages
  matcher: ["/qiyada", "/qiyada/:path*"],
};
