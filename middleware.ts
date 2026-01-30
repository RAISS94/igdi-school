import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/qiyada/login",
  },
});

export const config = {
  matcher: ["/qiyada/:path*"],
};
